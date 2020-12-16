import axios, { EndPoints } from 'api/axios';
import { UserType } from 'models/user-type';

export async function getUserByIdFromDbAxios(id: string) {
  return await axios.get<UserType>(`${EndPoints.usersDb}/${id}`);
}

export async function putUserFromDbAxios(user: UserType) {
  return await axios.put<UserType>(`${EndPoints.usersDb}/${user.id}`, user);
}
