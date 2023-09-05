import { fetchWithToken } from '../api/enpoints';

export const listSeller = async () =>{
    const resp = await fetchWithToken('business');
    const body = await resp.json();
    if (resp.status == 400) {
        Swal.fire('Error', body.msg, 'error');
    }
    if (resp.status == 200) {
        return body;
    }
}