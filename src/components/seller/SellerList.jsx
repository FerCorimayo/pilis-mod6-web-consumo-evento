import { useEffect, useState } from 'react';
import { HiOutlineSearch, HiEye, HiPencil } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa'

const SellerList = () => {

  const [sellers, setSellers] = useState([]);

  useEffect(() => {

  }, []);

  console.log(sellers);

  return (
    <div className="p-4 bg-white h-screen rounded-2xl">
      <div className="w-full flex justify-between">
        <form className="w-3/12 p-2 bg-white border-solid border-2 border-zinc-300 rounded-full">
          <div className="inline-block w-full">
            <button className="w-1/12 pl-1">
              <HiOutlineSearch className="text-zinc-500 w-6" />
            </button>
            <input
              type="text"
              className="w-11/12 pl-2 text-lg focus:outline-none"
              placeholder="Buscar vendedor"
            />
          </div>
        </form>
        <button className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white px-8 py-2 rounded-full block">Nuevo Vendedor</button>
      </div>
      <div className="table w-full p-2 mt-10">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400 pb-2">ID</div>
            <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Puesto</div>
            <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Nombre del negocio</div>
            <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Tipo</div>
            <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400">Encargado</div>
            <div className="table-cell text-center font-bold text-xl text-zinc-500 border-solid border-b-2 border-gray-400"></div>
          </div>
        </div>
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">1</div>
            <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">2</div>
            <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">NOA Accesorios</div>
            <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">Accesorios</div>
            <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">Fabian Choque</div>
            <div className="flex justify-end pr-3 border-solid border-b-2 border-gray-500 pt-3 pb-5 place-items-center">
              <HiEye className="mx-1 w-6 h-auto" />
              <HiPencil className="mx-1 w-6 h-auto" />
              <FaTrash className="ml-1 w-6 h-auto" />
            </div>
          </div>
        </div>
        <div className="table-row-group">
          {sellers.map((seller) => (
            <div className="table-row">
              <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{seller.id}</div>
              <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{seller.email}</div>
              <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{seller.first_name}</div>
              <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{seller.last_name}</div>
              <div className="table-cell text-center font-semibold text-md text-zinc-400 border-solid border-b-2 border-gray-500 pt-3 pb-3">{seller.avatar}</div>
              <div className="flex justify-end mr-3 border-solid border-b-2 border-gray-500 pt-3 pb-5">
                <HiEye className="mx-1 w-5 h-auto text-emerald-500" />
                <HiPencil className="mx-1 w-5 h-auto text-sky-500" />
                <FaTrash className="ml-1 w-5 h-auto text-rose-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SellerList;