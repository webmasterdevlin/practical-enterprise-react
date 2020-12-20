import {
  createSlice,
  ThunkAction,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store/reducers';
import { EventType } from 'models/calendar-type';
import axios, { EndPoints } from 'api/axios';

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

interface CalendarState {
  events: EventType[];
  isModalOpen: boolean;
  selectedEventId?: string;
  selectedRange?: {
    start: number;
    end: number;
  };
  loading: boolean;
  error: string;
}

const initialState: CalendarState = {
  events: [],
  isModalOpen: false,
  selectedEventId: null,
  selectedRange: null,
  loading: false,
  error: '',
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getEvents(state, action: PayloadAction<EventType[]>) {
      state.events = action.payload;
    },

    createEvent(state, action: PayloadAction<EventType>) {
      state.events.push(action.payload);
    },
    selectEvent(state, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.selectedEventId = action.payload;
    },
    updateEvent(state, action: PayloadAction<EventType>) {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      state.events[index] = action.payload;
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    selectRange(state, action: PayloadAction<{ start: number; end: number }>) {
      const { start, end } = action.payload;
      state.isModalOpen = true;
      state.selectedRange = {
        start,
        end,
      };
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },
  },
});

/* Export these actions so components can use them */

/* non-asynchronous actions. HTTP client is not needed. */
export const selectEvent = (id?: string): AppThunk => dispatch => {
  dispatch(slice.actions.selectEvent(id));
};

export const selectRange = (start: Date, end: Date): AppThunk => dispatch => {
  dispatch(
    slice.actions.selectRange({
      start: start.getTime(),
      end: end.getTime(),
    }),
  );
};

export const openModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.openModal());
};

export const closeModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.closeModal());
};

/*Asynchronous actions. Actions that require Axios (HTTP client)
 or any APIs of a library or function that returns a promise.*/

export const getEvents = (): AppThunk => async dispatch => {
  dispatch(slice.actions.setLoading(true));
  dispatch(slice.actions.setError(''));
  try {
    const response = await axios.get<EventType[]>(EndPoints.events);
    dispatch(slice.actions.getEvents(response.data));
  } catch (error) {
    console.log(error.message);
    dispatch(slice.actions.setError(error.message));
  } finally {
    dispatch(slice.actions.setLoading(false));
  }
};

/* Exercise: continue adding try catch here that also uses loading and error states */
export const createEvent = (event: EventType): AppThunk => async dispatch => {
  const { data } = await axios.post<EventType>(EndPoints.events, event);

  dispatch(slice.actions.createEvent(data));
};

export const updateEvent = (update: EventType): AppThunk => async dispatch => {
  const { data } = await axios.put<EventType>(
    `${EndPoints.events}/${update.id}`,
    update,
  );
  dispatch(slice.actions.updateEvent(data));
};

export const deleteEvent = (id: string): AppThunk => async dispatch => {
  await axios.delete(`${EndPoints.events}/${id}`);

  dispatch(slice.actions.deleteEvent(id));
};

export default slice.reducer;
