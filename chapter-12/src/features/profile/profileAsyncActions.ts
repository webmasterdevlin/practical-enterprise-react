import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'models/user-type';

import { ProfileActionTypes } from './profileActionTypes';
import {
  getUserByIdFromDbAxios,
  putUserFromDbAxios,
} from 'services/userDbService';

export const getProfileAction = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id: string) => {
    return (await getUserByIdFromDbAxios(id)).data;
  },
);

export const putProfileAction = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async (user: UserType) => {
    return (await putUserFromDbAxios(user)).data;
  },
);
