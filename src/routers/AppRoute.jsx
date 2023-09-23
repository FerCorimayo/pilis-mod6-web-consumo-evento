import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../componentes/auth/Login";
import { PrivateRoute } from "./PrivateRoute";
import { DashboardRoute } from "./DashboardRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }/>
                <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoute />
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
};