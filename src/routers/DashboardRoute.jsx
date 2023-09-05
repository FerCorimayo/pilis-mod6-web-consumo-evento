import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import ClientList from '../components/client/ClientList';
import SellerList from '../components/seller/SellerList';
import ClientForm from '../components/client/ClientForm';
import SellerForm from '../components/seller/SellerForm';

export const DashboardRoute = () => {
  return (
    <>
        <Navbar />
        <div>
            <Routes>
                <Route path="vendedores" element={<SellerList />} />
                <Route path="vendedores/nuevo" element={<SellerForm />} />
                <Route path="clientes" element={<ClientList />} />
                <Route path="clientes/nuevo" element={<ClientForm />} />
            </Routes>
        </div>
    </>
  )
}
