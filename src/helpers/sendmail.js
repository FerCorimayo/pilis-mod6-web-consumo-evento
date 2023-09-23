import { fetchWithToken } from '../api/enpoints';

export const createPushMail = async (mail) =>{
    const resp = await fetchWithToken('sendmail', mail, 'POST');
    const body = await resp.json();
    return body;
}