import { Routes, Route } from 'react-router-dom';
import Navbar from '../Components/ui/Navbar';
import ClientBalance from '../Components/client/ClientBalance';
import ClientList from "../Components/client/ClientList";
import SellerList from '../components/seller/SellerList';
import ClientForm from '../Components/client/ClientForm';

const DashboardRouter = () => {
  return (
    <>
        <Navbar />
        <div>
            <Routes>
                <Route path="clientes" element={<ClientList />} />
                <Route path="clienteForm" element={<ClientForm />} />
                <Route path="clienteBalan" element={<ClientBalance />} />
                <Route path="vendedores" element={<SellerList />} />
            </Routes>
        </div>
    </>
  )
}

export default DashboardRouter