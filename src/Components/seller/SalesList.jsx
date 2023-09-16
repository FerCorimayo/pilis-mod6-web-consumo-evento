import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'
import { listBusinessSeller, listTransactionsSeller } from "../../helpers/seller";
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { HiOutlineSearch } from 'react-icons/hi';
import moment from 'moment';

const SalesList = () => {

  const {currentUser} = useContext(AuthContext);
  const [salesList, setSalesList] = useState([]);
	const navigate = useNavigate();

  const location = useLocation();
	const stateSeller = location.state?.stateSeller;

  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }
  const filteredClients = salesList.filter(sales => (
    sales.wallet.user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  ))

  useEffect(() => {
    if (stateSeller) {
      getTransactionsSeller(stateSeller.id)
    }else{
      listBusinessSeller(currentUser.id).then((body) => {
        if (body.message) {
          return Swal.fire('Error', body.message, 'error');
        }
        if(body[0])
          getTransactionsSeller(body[0].id)
      }).catch((error) => {console.error('Error:', error)});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactionsSeller = (id) => {
    listTransactionsSeller(id).then((body) => {
      if (body.message) {
        return Swal.fire('Error', body.message, 'error');
      }
      setSalesList(body)
    }).catch((error) => {console.error('Error:', error)});
  }

  return (
    <>
      <div className="p-4 bg-white md:w-11/12 h-screen rounded-2xl md:mt-5 md:mx-auto">
        {
          stateSeller ?
            (
              <div className="md:px-5 md:pt-5 flex justify-between">
                <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(navigate('/vendedores'))} />
                <p className="text-3xl md:text-4xl font-semibold text-zinc-500">Ventas Realizadas</p>
              </div>
            )
          :
            (
              <>
                <div className="flex justify-center pb-4">
                  <div className="md:pr-10 md:pt-5">
                    <p className="text-3xl font-semibold md:text-4xl text-zinc-500">Ventas Realizadas</p>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <form className="w-3/12 p-2 bg-white border-2 border-solid rounded-full border-zinc-300 max-sm:hidden">
                    <div className="inline-block w-full">
                      <button className="w-1/12 pl-1">
                        <HiOutlineSearch className="w-6 text-zinc-500" />
                      </button>
                      <input type="text" className="w-11/12 pl-2 text-lg focus:outline-none" placeholder="Buscar cliente" onChange={handleSearch} value={searchQuery}/>
                    </div>
                  </form>
                </div>
              </>
            )
        }
        {
          salesList.length === 0 ?
            (
              <div className="overflow-auto rounded-lg shadow">
                <div className="table w-full p-2 mt-12">
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Cliente</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">DNI</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                  <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
                </div>
                <div className="flex justify-center items-center mt-16">
                  <div className="text-center font-semibold text-2xl text-zinc-400 pt-3 pb-3">
                    No existen registros de Ventas
                  </div>
                </div>
              </div>
            )
            :
            (
              <div className="overflow-auto rounded-lg shadow">
                <div className="table w-full p-2 mt-10">
                  <div className="table-row">
                    <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                    <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Cliente</div>
                    <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">DNI</div>
                    <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                    <div className="table-cell whitespace-nowrap px-2 text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
                  </div>
                  <div className="table-row-group">
                    {
                      filteredClients.map((sales, index) => (
                        <div className="table-row" key={index}>
                          <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.id }</div>
                          <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.wallet.user.fullname }</div>
                          <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.wallet.user.dni }</div>
                          <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ moment.utc(sales.date).format('DD/MM/yyyy HH:mm:ss') }</div>
                          <div className="table-cell whitespace-nowrap px-2 text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.amount }</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )
        }
      </div>
    </>
  )
}

export default SalesList;