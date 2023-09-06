import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({children}) => {

    const {currentUser} = useContext(AuthContext);

    return currentUser
        ? children
        : <Navigate to="/login" />
}
