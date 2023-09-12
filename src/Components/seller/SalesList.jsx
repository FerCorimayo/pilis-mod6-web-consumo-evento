import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'

const SalesList = () => {

  const [salesList, setSalesList] = useState([]);
	const navigate = useNavigate();

  const location = useLocation();
	const stateSeller = location.state?.stateSeller;

  useEffect(() => {
    setSalesList(stateSeller.transaction)
  }, [stateSeller]);

  return (
    <>
      <div className="p-4 bg-white md:w-11/12 h-screen rounded-2xl md:mt-5 md:mx-auto">
        <div className="md:px-5 md:pt-5 flex justify-between">
          <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(navigate('/vendedores'))} />
          <p className="text-3xl md:text-4xl font-semibold text-zinc-500">Ventas Realizadas</p>
        </div>
        {
          salesList.length === 0 ?
            (
              <div>
                <div className="table w-full p-2 mt-12">
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
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
              <div className="table w-full p-2 mt-10">
                <div className="table-row">
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
                </div>
                <div className="table-row-group">
                  {
                    salesList.map((sales, index) => (
                      <div className="table-row" key={index}>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.id }</div>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.date }</div>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales.amount }</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    </>
  )
}

export default SalesList;