import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import SellerList from '../components/seller/SellerList';
import SellerForm from '../components/seller/SellerForm';
import SalesList from '../components/seller/SalesList';
import ClientList from '../components/client/ClientList';
import ClientForm from '../components/client/ClientForm';
import ClientBalance from '../components/client/ClientBalance';
import GeneratePayment from '../components/seller/GeneratePayment';
import ValidatePayment from '../components/seller/ValidatePayment';
import RegisterPayment from '../components/seller/RegisterPayment';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import PurchaseList from '../Components/client/PurchaseList';

export const DashboardRoute = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <>
    {
      ( currentUser.role === 'admin' )
          ? <>
            <Navbar navegation={["vendedores","clientes"]}/>
              <Routes>
                <Route path="vendedores" element={<SellerList />} />
                <Route path="vendedores/nuevo" element={<SellerForm />} />
                <Route path="vendedores/venta" element={<SalesList />} />
                <Route path="clientes" element={<ClientList />} />
                <Route path="clientes/nuevo" element={<ClientForm />} />
                <Route path="clientes/balance" element={<ClientBalance />} />
              </Routes>
          </>
          : <>
            <Navbar navegation={["ventas","cobros"]}/>
            <Routes>
                <Route path="cobros" element={<GeneratePayment />} />
                {/* <Route path="cobros" element={< />} /> */}
            </Routes>
          </>
          
    }
    </>
  )
}
