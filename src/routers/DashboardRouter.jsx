import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import ClientList from '../components/client/ClientList';
import SellerList from '../components/seller/SellerList';

const DashboardRouter = () => {
  return (
    <>
        <Navbar />
        <div>
            <Routes>
                <Route path="clientes" element={<ClientList />} />
                <Route path="vendedores" element={<SellerList />} />
            </Routes>
        </div>
    </>
  )
}

export default DashboardRouter