import { NavLink } from 'react-router-dom';
import React, {useContext, useState, useEffect } from 'react';
import { FaEye, FaTrash, FaEdit, FaDollarSign } from 'react-icons/fa';
import { HiOutlineSearch, HiEye, HiPencil } from 'react-icons/hi';
import axios from 'axios';
import { ClientsRegisteredContex } from '../../context/ClientRegisteredContext'
import { listClient } from '../../helpers/client';

const baseUrl = import.meta.env.VITE_API_URL;

const ClientList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(data);


  const { clientRegistered, setClientRegistered } = useContext(ClientsRegisteredContex);

  //borrador de usuarios
  const handleDelete = id => {
    axios.delete(`https://64f32c36edfa0459f6c65f8a.mockapi.io/api/clients/user/${id}`).then(response => {
      setData(prevData => {
        const newData = prevData.filter(user => user.id !== id);
        setSearchResults(newData);
        return newData;
      });
    });
  };
  
  
  //buscador
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  const userNull = ()=> {
    setClientRegistered({modo:0})
  }
  const userSelectedTopUp = (name) =>{
    setClientRegistered(name)
  }
  const userSelectedEdit = (name) =>{
    setClientRegistered({...name,modo:1})
  }
const userSelectedView = (name) =>{
    setClientRegistered({...name,modo:2})
}

  //obtencion dedatos
  useEffect(() => {
    listClient().then(data => {
      console.log(data)
      setData(data);
      const results = data.filter(person =>
        person.user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    });
  }, [searchTerm]);

  return (
    <div className="h-screen p-4 bg-white rounded-2xl">
    <div className="flex justify-center pb-4">
      <div className="md:pr-10 md:pt-5">
        <p className="text-3xl font-semibold md:text-4xl text-zinc-500">Lista de Clientes</p>
      </div>
    </div>
    <div className="flex justify-between w-full">
      <form className="w-3/12 p-2 bg-white border-2 border-solid rounded-full border-zinc-300">
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
    <div className="table w-full p-2 mt-10">
      <div className="table-header-group">
        <div className="table-row">
          <div className="table-cell pb-2 text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">ID</div>
          <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">DNI</div>
          <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Nombre</div>
          <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Email</div>
          <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500">Saldo</div>
          <div className="table-cell text-xl font-bold text-center border-b-2 border-gray-400 border-solid text-zinc-500"></div>
        </div>
      </div>
      <div className="table-row-group">
        {searchResults.map((item) => (
          <div className="table-row" key={item.id}>
            <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.id}</div>
            <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.dni}</div>
            <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.fullname}</div>
            <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.user.email}</div>
            <div className="table-cell pt-3 pb-3 font-semibold text-center border-b-2 border-gray-500 border-solid text-md text-zinc-400">{item.balance}</div>
            <div className="flex justify-end pt-3 pb-5 mr-3 border-b-2 border-gray-500 border-solid">
              <FaDollarSign className="w-5 h-auto mx-1 text-yellow-500 cursor-pointer hover:text-yellow-400" onClick={() => handleDetailBalance(item)}/>
              <HiEye className="w-5 h-auto mx-1 cursor-pointer text-emerald-500 hover:text-emerald-400" onClick={() => handleDetail(item)}/>
              <NavLink to="/clientes/nuevo">
                <HiPencil className="w-5 h-auto mx-1 cursor-pointer text-sky-500 hover:text-sky-400" onClick={() => userSelectedEdit(item)}/>
              </NavLink>
              <FaTrash className="w-5 h-auto ml-1 cursor-pointer text-rose-500 hover:text-rose-400" onClick={() => handleDelete(item)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default ClientList