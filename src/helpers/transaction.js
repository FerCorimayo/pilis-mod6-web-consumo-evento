import { fetchWithToken } from '../api/enpoints';

export const createTransaction = async (transaction) =>{
  const resp = await fetchWithToken('transactions', transaction, 'POST');
  const body = await resp.json();
  return body;
}
export const updateTransaction = async (transaction, id) =>{
  const resp = await fetchWithToken(`transactions/${id}`, transaction, 'PUT');
  if(resp.status == 204){
      return await resp
  }
  const body = await resp.json();
  return body;
}