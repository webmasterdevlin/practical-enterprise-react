import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'models/user-type';

import { profileNamespace, ProfileStateType } from './profileActionTypes';
import { getProfileAction, putProfileAction } from './profileAsyncActions';

/* profile state */
// initial state or default state or initial values, it's up to you.
export const initialState: ProfileStateType = {
  profile: {} as UserType,
  loading: false,
  error: '',
};

/* profile store */
export const profileSlice = createSlice({
  /*
   name: is your feature or also called module, or namespace,
   or context, etc. The terminologies here can be interchangeable.
   This is required.
  */
  name: profileNamespace,

  /*initialState is the default value of this namespace/module and it is required.*/
  initialState, // same as initialState: initialState,

  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {},

  /*Asynchronous actions. Actions that require Axios.*/
  extraReducers: builder => {
    builder.addCase(
      getProfileAction.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.profile = action.payload;
      },
    );

    builder.addCase(
      putProfileAction.pending,
      (state, action: PayloadAction) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addCase(
      putProfileAction.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.profile = action.payload;
      },
    );
    builder.addCase(
      putProfileAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = 'Something wrong happened';
        console.log(action?.payload);
      },
    );
  },
});

export default profileSlice.reducer;
