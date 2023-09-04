import { fetchWithoutToken, fetchWithToken } from '../api/enpoints';

export const listSeller = async () =>{
    const resp = await fetchWithToken( 'business');
    const body = await resp.json();
    console.log(body)
    // if ( body.ok ){
    //     return body
    // } else {
    //     Swal.fire('Error', body.msg, 'error');
    // }
}