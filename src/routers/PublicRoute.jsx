/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PublicRoute = ({children}) => {

    const {currentUser} = useContext(AuthContext);
    
        return (
            <>
                {
                ( !currentUser)
                    ? children
                    : (currentUser.role === 'admin')
                    ? <Navigate to="/vendedores" /> 
                    : <Navigate to="/ventas" /> 
                }
            </>
          )
}