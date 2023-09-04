import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import ClientList from '../components/client/ClientList';
import SellerList from '../components/seller/SellerList';
import ClientForm from '../components/client/ClientForm';

export const DashboardRoute = () => {
  return (
    <>
        <Navbar />
        <div>
            <Routes>
                <Route path="vendedores" element={<SellerList />} />
                <Route path="clientes" element={<ClientForm />} />
            </Routes>
        </div>
    </>
  )
}
