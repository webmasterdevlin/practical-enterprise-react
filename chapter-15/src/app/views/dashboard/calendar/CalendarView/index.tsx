import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';

import {
  Container,
  Dialog,
  makeStyles,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import Page from 'app/components/page';
import { EventType, ViewType } from 'models/calendar-type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

import Header from './Header';
import AddEditEventForm from './AddEditEventForm';
import Toolbar from './Toolbar';
import {
  closeModal,
  getEvents,
  openModal,
  selectEvent,
  selectRange,
  updateEvent,
} from 'features/calendar/calendarSlice';

const CalendarView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );
  const selectedEvent = useSelector(selectedEventSelector);

  const mobileDevice = useMediaQuery('(max-width:600px)');
  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<ViewType>(
    mobileDevice ? 'listWeek' : 'dayGridMonth',
  );

  /* useRef is used to access DOM elements and
  to persist state or values in successive or next renders */
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const handleAddClick = (): void => {
    dispatch(openModal());
  };

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateToday = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: ViewType): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleEventSelect = (arg: any): void => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleEventDrop = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEvent({
          allDay: event.allDay,
          start: event.start,
          end: event.end,
          id: event.id,
        } as any),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventResize = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEvent({
          allDay: event.allDay,
          start: event.start,
          end: event.end,
          id: event.id,
        } as any),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRangeSelect = (arg: any): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }

    dispatch(selectRange(arg.start, arg.end));
  };

  return (
    <Page className={classes.root} title="Calendar">
      <Container maxWidth={false}>
        <Header onAddClick={handleAddClick} />
        <Toolbar
          date={date}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
        />
        <Paper className={classes.calendar}>
          <FullCalendar
            allDayMaintainDuration
            droppable
            editable
            selectable
            weekends
            dayMaxEventRows
            eventResizableFromStart
            headerToolbar={false}
            select={handleRangeSelect}
            eventClick={handleEventSelect}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            initialDate={date}
            initialView={view}
            events={events}
            height={800}
            ref={calendarRef}
            rerenderDelay={10}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              timelinePlugin,
            ]}
          />
        </Paper>
        <Dialog
          maxWidth="sm"
          fullWidth
          onClose={handleModalClose}
          open={isModalOpen}
        >
          {/* Dialog renders its body even if not open */}
          {isModalOpen && (
            <AddEditEventForm
              event={selectedEvent}
              range={selectedRange}
              onAddComplete={handleModalClose}
              onCancel={handleModalClose}
              onDeleteComplete={handleModalClose}
              onEditComplete={handleModalClose}
            />
          )}
        </Dialog>
      </Container>
    </Page>
  );
};

export default CalendarView;

const selectedEventSelector = (state: RootState): EventType | null => {
  const { events, selectedEventId } = state.calendar;

  if (selectedEventId) {
    return events?.find(_event => _event.id === selectedEventId);
  } else {
    return null;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  calendar: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    '& .fc-unthemed .fc-head': {},
    '& .fc-unthemed .fc-body': {
      backgroundColor: theme.palette.background.default,
    },
    '& .fc-unthemed .fc-row': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-axis': {
      ...theme.typography.body2,
    },
    '& .fc-unthemed .fc-divider': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed td.fc-today': {},
    '& .fc-unthemed .fc-highlight': {},
    '& .fc-unthemed .fc-event': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit',
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit',
      },
    },
    '& .fc-unthemed .fc-day-top': {
      ...theme.typography.body2,
    },
    '& .fc-unthemed .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    },
    '& .fc-unthemed .fc-list-view': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-list-empty': {
      ...theme.typography.subtitle1,
    },
    '& .fc-unthemed .fc-list-heading td': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-list-heading-main': {
      ...theme.typography.h6,
    },
    '& .fc-unthemed .fc-list-heading-alt': {
      ...theme.typography.h6,
    },
    '& .fc-unthemed .fc-list-item:hover td': {},
    '& .fc-unthemed .fc-list-item-title': {
      ...theme.typography.body1,
    },
    '& .fc-unthemed .fc-list-item-time': {
      ...theme.typography.body2,
    },
  },
}));
