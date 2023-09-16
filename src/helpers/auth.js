import { fetchWithoutToken } from '../api/enpoints';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

export const startLogin = async (email, password) =>{
    const resp = await fetchWithoutToken( 'signin', {email, password}, 'POST' );
    const body = await resp.json();

    if (resp.status == 400) {
        Swal.fire('Error', body.message, 'error');
    }
    if (resp.status == 201) {
        try {
            localStorage.setItem('token', body.credentials.token);
            localStorage.setItem('refreshToken', body.credentials.refreshToken);
            const {id, fullname, role} = jwt_decode(body.credentials.token);
            return {
                id,
                fullname,
                role
            }
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    }
}