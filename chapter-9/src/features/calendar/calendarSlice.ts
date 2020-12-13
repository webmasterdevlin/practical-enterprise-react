import { createSlice, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store/reducers';
import { EventType } from 'models/calendar-type';
import axios, { EndPoints } from 'api/axios';

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

interface CalendarState {
  events: EventType[];
  isModalOpen: boolean;
  selectedEventId: string | null;
  selectedRange: {
    start: number;
    end: number;
  } | null;
}

const initialState: CalendarState = {
  events: [],
  isModalOpen: false,
  selectedEventId: null,
  selectedRange: null,
};

const calendarNamespace = 'calendar';

/*Single-File implementation of Redux-Toolkit*/
const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: calendarNamespace,

  /*initialState is the default value of this namespace/module and it is required.*/
  initialState, // same as initialState: initialState

  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {
    getEvents(state: CalendarState, action: PayloadAction<EventType[]>) {
      state.events = action.payload;
    },
  },
});

/*Asynchronous actions. Actions that require Axios.*/

export const getEvents = (): AppThunk => async dispatch => {
  const response = await axios.get<EventType[]>(EndPoints.events);

  dispatch(slice.actions.getEvents(response.data));
};

export default slice.reducer;
