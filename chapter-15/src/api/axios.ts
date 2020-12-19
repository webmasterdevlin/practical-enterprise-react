import axios from 'axios';

/*create an instance of axios with a default base URI when sending HTTP requests*/
/*JSON Server has CORS Policy by default*/
const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

export default api;

export const EndPoints = {
  sales: 'sales',
  products: 'products',
  events: 'events',
  login: 'login',
  register: 'register',
  users: 'users',
  usersDb: 'users-db',
};
