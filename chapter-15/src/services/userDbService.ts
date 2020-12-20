import api, { EndPoints } from 'api/axios';
import { UserType } from 'models/user-type';

export async function getUserByIdFromDbAxios(id: string) {
  return await api.get<UserType>(`${EndPoints.usersDb}/${id}`);
}

export async function putUserFromDbAxios(user: UserType) {
  return await api.put<UserType>(`${EndPoints.usersDb}/${user.id}`, user);
}
