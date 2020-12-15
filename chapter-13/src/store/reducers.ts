/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import calendarReducer from 'features/calendar/calendarSlice';
import authReducer from 'features/auth/authSlice';
import profileReducer from 'features/profile/profileSlice';

const injectedReducers = {
  calendar: calendarReducer,
  auth: authReducer,
  profile: profileReducer,
};

const rootReducer = combineReducers({
  ...injectedReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createReducer = () => rootReducer;
