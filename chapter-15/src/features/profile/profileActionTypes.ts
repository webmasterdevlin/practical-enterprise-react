import { UserType } from 'models/user-type';

export type ProfileStateType = {
  readonly profile: UserType;
  readonly loading: boolean;
  readonly error: string;
};

export const profileNamespace = 'profile';

/* action types */

export const ProfileActionTypes = {
  FETCH_AND_SAVE_PROFILE: `${profileNamespace}/FETCH_AND_SAVE_PROFILE`,
  UPDATE_PROFILE: `${profileNamespace}/UPDATE_PROFILE`,
};
