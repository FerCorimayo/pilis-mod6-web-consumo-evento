import { useEffect, useState } from "react";

const SalesList = () => {

  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="p-4 bg-white md:w-11/12 h-screen rounded-2xl md:mt-5 md:mx-auto">
        <div className="md:pr-10 md:pt-5">
          <p className="text-3xl text-right md:text-4xl font-semibold text-zinc-500">Ventas Realizadas</p>
        </div>
        {
          salesList.length === 0 ?
            (
              <div>
                <div className="table w-full p-2 mt-12">
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">Orden</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Cliente</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">DNI</div>
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
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Cliente</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">DNI</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Fecha</div>
                  <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Monto</div>
                </div>
                <div className="table-row-group">
                  {
                    salesList.map((sales) => (
                      <div className="table-row">
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales }</div>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales }</div>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales }</div>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales }</div>
                        <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{ sales }</div>
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