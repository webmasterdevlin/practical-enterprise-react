import { getEvents } from 'features/calendar/calendarSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const CalendarView = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>
      <h1>CalendarView Works!</h1>
      {loading && <h2>Loading..</h2>}
      {error && <h2>Something happened</h2>}
      <ul>
        {events?.map(e => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
