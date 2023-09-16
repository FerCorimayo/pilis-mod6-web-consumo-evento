import { fetchWithToken } from '../api/enpoints';

export const listSeller = async () =>{
    const resp = await fetchWithToken('business');
    const body = await resp.json();
    return body;
}
export const listTransactionsSeller = async (id) =>{
    const resp = await fetchWithToken(`transactions?business=${id}`);
    const body = await resp.json();
    return body;
}
export const listBusinessSeller = async (id) =>{
    const resp = await fetchWithToken(`business?user=${id}`);
    const body = await resp.json();
    return body;
}
export const createSeller = async (seller) =>{
    const resp = await fetchWithToken('users', seller, 'POST');
    const body = await resp.json();
    return body;
}
export const createBusiness = async (business) =>{
    const resp = await fetchWithToken('business', business, 'POST');
    const body = await resp.json();
    return body;
}
export const updateSeller = async (seller,id) =>{
    const resp = await fetchWithToken(`users/${id}`, seller, 'PUT');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}
export const updateBusiness = async (business, id) =>{
    const resp = await fetchWithToken(`business/${id}`, business, 'PUT');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}
export const deleteSeller = async (id) =>{
    const resp = await fetchWithToken(`users/${id}`, {},'DELETE');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}
export const deleteBusiness = async (id) =>{
    const resp = await fetchWithToken(`business/${id}`, {}, 'DELETE');
    if(resp.status == 204){
        return await resp
    }
    const body = await resp.json();
    return body;
}