import { NavLink } from 'react-router-dom';
import {useContext, useState, useEffect } from 'react';
import { FaTrash, FaDollarSign } from 'react-icons/fa';
import { HiOutlineSearch, HiEye, HiPencil } from 'react-icons/hi';
import { ClientsRegisteredContex } from '../../context/ClientRegisteredContext'
import { listClient, deleteClient, deleteWallet } from '../../helpers/client';
import Swal from 'sweetalert2'

const ClientList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { setClientRegistered } = useContext(ClientsRegisteredContex);

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Eliminar Registro?',
      text: "No podrá recuperar el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWallet(item.id).then((body) => {
          if (body.message) {
            return Swal.fire('Error', body.message, 'error');
          }
          deleteClient(item.user.id).then((body) => {
            if (body.message) {
              return Swal.fire('Error', body.message, 'error');
            }
            Swal.fire('Eliminado!','Un registro fue eliminado!','success')
            getClients()
          }).catch((error) => {console.error('Error:', error)});
        }).catch((error) => {console.error('Error:', error)});
      }
    })
  };
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  const userNull = ()=> {//create
    setClientRegistered({modo:0})
  }
  const userSelectedTopUp = (name) =>{//dtail-balance
    setClientRegistered(name)
  }
  const userSelectedEdit = (name) =>{//edit
    setClientRegistered({...name,modo:1})
  }
  const userSelectedView = (name) =>{ //detail-payment
      setClientRegistered({...name,modo:2})
  }

  const filteredClients = data.filter(client => (
    client.user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  useEffect(() => {
    getClients()
  }, []);
  
  const getClients = () => {
    listClient().then(data => {
      setData(data);
    });
  }

  return (
    <section className="h-screen p-4 bg-white rounded-2xl">
      <div className="flex justify-center pb-4">
        <div className="md:pr-10 md:pt-5">
          <p className="text-3xl font-semibold md:text-4xl text-zinc-500">Lista de Clientes</p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <form className="w-3/12 p-2 bg-white border-2 border-solid rounded-full border-zinc-300 max-sm:hidden">
          <div className="inline-block w-full">
            <button className="w-1/12 pl-1">
              <HiOutlineSearch className="w-6 text-zinc-500" />
            </button>
            <input type="text" className="w-11/12 pl-2 text-lg focus:outline-none" placeholder="Buscar cliente" value={searchTerm} onChange={handleChange}/>
          </div>
        </form>
        <NavLink to="/clientes/nuevo" >
            <button className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white px-8 py-2 rounded-full block" onClick={() => userNull()}>Nuevo Cliente</button>
        </NavLink>
      </div>
      <div className="overflow-auto rounded-lg shadow">
        <div className="table w-full p-2 mt-10">
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell whitespace-nowrap pb-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">ID</div>
              <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">DNI</div>
              <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Nombre</div>
              <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Email</div>
              <div className="table-cell whitespace-nowrap px-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Saldo</div>
              <div className="table-cell whitespace-nowrap text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500"></div>
            </div>
          </div>
          <div className="table-row-group">
            {filteredClients.map((item) => (
              <div className="table-row" key={item.id}>
                <div className="table-cell whitespace-nowrap pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.id}</div>
                <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.dni}</div>
                <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.fullname}</div>
                <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.email}</div>
                <div className="table-cell whitespace-nowrap px-2 pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.balance}</div>
                <div className="flex whitespace-nowrap justify-end pt-3 pb-5 pr-3 border-b-2 border-gray-500 border-solid">
                  <NavLink to="/clientes/balance">
                    <FaDollarSign className="w-5 h-auto mx-1 text-yellow-500 cursor-pointer hover:text-yellow-400" onClick={() => userSelectedTopUp(item)}/>
                  </NavLink>
                  <NavLink to="/clientes/compras">
                    <HiEye className="w-5 h-auto mx-1 cursor-pointer text-emerald-500 hover:text-emerald-400" onClick={() => userSelectedView(item)}/>
                  </NavLink>
                  <NavLink to={`/clientes/nuevo?${item.id}`}>
                    <HiPencil className="w-5 h-auto mx-1 cursor-pointer text-sky-500 hover:text-sky-400" onClick={() => userSelectedEdit(item)}/>
                  </NavLink>
                  <FaTrash className="w-5 h-auto ml-1 cursor-pointer text-rose-500 hover:text-rose-400" onClick={() => handleDelete(item)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientList