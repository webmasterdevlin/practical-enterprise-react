import { makeStyles } from '@material-ui/core';
import { getEvents } from 'features/calendar/calendarSlice';
import { EventType } from 'models/calendar-type';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const CalendarView = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.calendar,
  );

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>
      <h1>CalendarView Works!</h1>
      {loading && <h2>Loading..</h2>}
      {error && <h3>Something happened. Please try again.</h3>}
      <ul>
        {events?.map(e => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
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
