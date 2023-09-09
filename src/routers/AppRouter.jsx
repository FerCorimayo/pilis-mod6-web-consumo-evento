import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Login from "../components/auth/Login";
import DashboardRouter from "./DashboardRouter";

export const AppRouter = () => {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path="/login" element={
                    <Login />
                }/>
                <Route path="/*" element={
                    <DashboardRouter />
                }/>
            </Routes>
        
        </BrowserRouter>
    );
};