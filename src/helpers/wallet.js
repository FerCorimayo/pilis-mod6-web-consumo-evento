import { fetchWithToken } from '../api/enpoints';

export const validateCode = async (token) =>{
    const resp = await fetchWithToken('wallets/validate_code', {code: token}, 'POST');
    const body = await resp.json();
    return body;
}