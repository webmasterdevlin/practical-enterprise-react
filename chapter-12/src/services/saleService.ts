import api, { EndPoints } from 'api/axios';
import { SaleType } from 'models/sale-type';

export async function getSalesAxios() {
  return await api.get<SaleType[]>(EndPoints.sales);
}
