import { useEffect, useState } from 'react'
import { HiOutlineSearch, HiEye, HiPencil } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa'
import { listSeller, deleteBusiness, deleteSeller } from '../../helpers/seller'
import { NavLink } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';

const SellerList = () => {

  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    obtenerSellers()
  }, []);

  const obtenerSellers = () => {
    listSeller().then((body) => {
      if (body.message) {
        return Swal.fire('Error', body.message, 'error');
      }
      setSellers(body)
    }).catch((error) => {console.error('Error:', error)});
  }

  const handleUpdate = (seller) => {
    navigate(`/vendedores/nuevo?${seller.id}`, { state: { stateSeller: seller } })
  }
  const handleDelete = (seller) => {
    Swal.fire({
      title: 'Eliminar Registro?',
      text: "No podrá recuperar el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBusiness(seller.id).then((body) => {
          if (body.message) {
            return Swal.fire('Error', body.message, 'error');
          }
          deleteSeller(seller.user.id).then((body) => {
            if (body.message) {
              return Swal.fire('Error', body.message, 'error');
            }
            Swal.fire('Eliminado!','Un registro fue eliminado!','success')
            obtenerSellers()
          }).catch((error) => {console.error('Error:', error)});
        }).catch((error) => {console.error('Error:', error)});
      }
    })
  }

  return (
    <div className="h-screen p-4 bg-white rounded-2xl">
      <div className="flex justify-between w-full">
        <form className="w-3/12 p-2 bg-white border-2 border-solid rounded-full border-zinc-300">
          <div className="inline-block w-full">
            <button className="w-1/12 pl-1">
              <HiOutlineSearch className="w-6 text-zinc-500" />
            </button>
            <input
              type="text"
              className="w-11/12 pl-2 text-lg focus:outline-none"
              placeholder="Buscar vendedor"
            />
          </div>
        </form>
        <NavLink to="/vendedores/nuevo" >
            <button className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white px-8 py-2 rounded-full block">Nuevo Vendedor</button>
        </NavLink>
      </div>
      <div className="table w-full p-2 mt-10">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell pb-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">ID</div>
            <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Puesto</div>
            <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Nombre del negocio</div>
            <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Tipo</div>
            <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Encargado</div>
            <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500"></div>
          </div>
        </div>
        <div className="table-row-group">
          {sellers.map((seller) => (
            <div className="table-row" key={seller.id}>
              <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{seller.id}</div>
              <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{seller.location}</div>
              <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{seller.name}</div>
              <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{seller.type}</div>
              <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{seller.user.fullname}</div>
              <div className="flex justify-end pt-3 pb-5 mr-3 border-b-2 border-gray-500 border-solid">
                <HiEye className="w-5 h-auto mx-1 cursor-pointer text-emerald-500 hover:text-emerald-400" />
                <HiPencil className="w-5 h-auto mx-1 cursor-pointer text-sky-500 hover:text-sky-400" onClick={() => handleUpdate(seller)}/>
                <FaTrash className="w-5 h-auto ml-1 cursor-pointer text-rose-500 hover:text-rose-400" onClick={() => handleDelete(seller)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SellerList;