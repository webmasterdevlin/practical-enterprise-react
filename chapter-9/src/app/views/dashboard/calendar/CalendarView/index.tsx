import React, { useEffect } from 'react';
import { Container, Dialog, makeStyles } from '@material-ui/core';
import Page from 'app/components/page';
import { EventType } from 'models/calendar-type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import Header from './Header';
import {
  closeModal,
  getEvents,
  openModal,
} from 'features/calendar/calendarSlice';
import AddEditEventForm from './AddEditEventForm';

const CalendarView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { events, loading, error, isModalOpen, selectedRange } = useSelector(
    (state: RootState) => state.calendar,
  );
  const selectedEvent = useSelector(selectedEventSelector);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const handleAddClick = (): void => {
    dispatch(openModal());
  };

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Page className={classes.root} title="Calendar">
      <Container maxWidth={false}>
        <Header onAddClick={handleAddClick} />

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
}));
