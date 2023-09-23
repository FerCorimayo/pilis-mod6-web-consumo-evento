import { fetchWithToken } from '../api/enpoints';

export const listClient = async () =>{
    const resp = await fetchWithToken('wallets');
    const body = await resp.json();
    return body;
}
export const listTransactionsClient = async (id) =>{
    const resp = await fetchWithToken(`transactions?wallet=${id}`);
    const body = await resp.json();
    return body;
}
export const createClient = async (client) =>{
    const resp = await fetchWithToken('users', client, 'POST');
    const body = await resp.json();
    return body;
}
export const createWallet = async (wallet) =>{
    const resp = await fetchWithToken('wallets', wallet, 'POST');
    const body = await resp.json();
    return body;
}
export const updateClient = async (client,id) =>{
    const resp = await fetchWithToken(`users/${id}`, client, 'PUT');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}
export const updateWallet = async (wallet, id) =>{
    const resp = await fetchWithToken(`wallets/${id}`, wallet, 'PUT');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}
export const deleteClient = async (id) =>{
    const resp = await fetchWithToken(`users/${id}`, {},'DELETE');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}
export const deleteWallet = async (id) =>{
    const resp = await fetchWithToken(`wallets/${id}`, {}, 'DELETE');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}