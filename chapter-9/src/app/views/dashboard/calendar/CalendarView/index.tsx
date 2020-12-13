import { getEvents } from 'features/calendar/calendarSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const CalendarView = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>
      <h1>CalendarView Works!</h1>
      <ul>
        {events?.map(e => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
