/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

export const PrivateRoute = ({children}) => {

    const {currentUser, setCurrentUser} = useContext(AuthContext);

    useEffect(() => {
        try {//veficar si hay una sesion
            const token = localStorage.getItem('token')
            if(token && checkDataToken(token)){
                const {id, fullname, role, email} = jwt_decode(token);
                setCurrentUser({id,fullname,role,email})
            }
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const checkDataToken = (token) => {
        const timestampActual = Math.floor((new Date()).getTime() / 1000)
        const decodedToken = jwt_decode(token)
        if (timestampActual < decodedToken.exp)
            return true
        return false
    }

    return currentUser
        ? children
        : <Navigate to="/login" />
}
