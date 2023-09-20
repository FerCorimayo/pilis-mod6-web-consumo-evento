import { fetchWithToken } from '../api/enpoints';

export const createSurrender = async (surrender) =>{
  const resp = await fetchWithToken('surrender', surrender, 'POST');
  const body = await resp.json();
  return body;
}