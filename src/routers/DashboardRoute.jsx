import { Routes, Route } from 'react-router-dom';
import Navbar from '../componentes/ui/Navbar';
import SellerList from '../componentes/seller/SellerList';
import SellerForm from '../componentes/seller/SellerForm';
import SalesList from '../componentes/seller/SalesList';
import ClientList from '../componentes/client/ClientList';
import ClientForm from '../componentes/client/ClientForm';
import ClientBalance from '../componentes/client/ClientBalance';
import PurchaseList from '../componentes/client/PurchaseList';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import PaymentScreen from '../componentes/seller/PaymentScreen';

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
                <Route path="clientes/compras" element={<PurchaseList />} />
              </Routes>
          </>
          : <>
            <Navbar navegation={["ventas","cobros"]}/>
            <Routes>
                <Route path="ventas" element={<SalesList />} />
                <Route path="cobros" element={<PaymentScreen />} />
            </Routes>
          </>
    }
    </>
  )
}
