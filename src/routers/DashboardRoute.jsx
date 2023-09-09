import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import SellerList from '../components/seller/SellerList';
import SellerForm from '../components/seller/SellerForm';
import ClientList from '../components/client/ClientList';
import ClientForm from '../components/client/ClientForm';
import ClientBalance from '../Components/client/ClientBalance';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const DashboardRoute = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <>
    {
      ( currentUser.role === 'admin' )
          ? <>
            <Navbar navegation={["vendedores","clientes"]}/>
              <div>
                  <Routes>
                      <Route path="vendedores" element={<SellerList />} />
                      <Route path="vendedores/nuevo" element={<SellerForm />} />
                      <Route path="clientes" element={<ClientList />} />
                      <Route path="clientes/nuevo" element={<ClientForm />} />
                      <Route path="clientes/balance" element={<ClientBalance />} />
                  </Routes>
              </div>
          </>
          : <Navbar navegation={["ventas","pago"]}/>
    }
    </>
  )
}
