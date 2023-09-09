import { fetchWithToken } from '../api/enpoints';

export const listClient = async () =>{
    const resp = await fetchWithToken('wallets');
    const body = await resp.json();
    return body;
}