import { fetchWithToken } from '../api/enpoints';

export const createTransaction = async (transaction) =>{
  const resp = await fetchWithToken('transactions', transaction, 'POST');
  const body = await resp.json();
  return body;
}