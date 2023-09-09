import { Link } from 'react-router-dom';
import React, {useContext, useState, useEffect } from 'react';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import {BiSolidBadgeDollar} from 'react-icons/bi';
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
  <div className="w-screen h-screen bg-gray-300">
    <div className='max-w-full bg-white mx-7 my-7'>
      <section className="flex justify-between">
      <input type="text" placeholder="Buscar" value={searchTerm} onChange={handleChange}
      className="self-start flex-shrink-0 px-4 py-1 my-6 text-lg bg-white border shadow-sm mx-7 rounded-3xl border-slate-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
      
      <Link to="/clientes/nuevo">
      <button onClick={() => userNull()} className="px-5 py-3 m-5 text-white bg-blue-600 rounded-3xl">Nuevo Cliente</button>
      </Link>
      </section>
  <section className='m-8'>
  <table className="w-full ">
    <thead>
      <tr>
        <th className="px-4 py-2">ID</th>
        <th className="px-4 py-2">DNI</th>
        <th className="px-4 py-2">Nombre</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">Saldo</th>
        <th className="invisible">Columna Invisible</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map((item, index) => (
            <tr key={index} className='border-t border-gray-300'>
          <td className="px-4 py-2 text-center">{item.user.id}</td>
          <td className="px-4 py-2 text-center">{item.user.dni}</td>
          <td className="px-4 py-2 text-center">{item.user.fullname}</td>
          <td className="px-4 py-2 text-center">{item.user.email}</td>
          <td className="px-4 py-2 text-center">{item.balance}</td>
          <td className="flex justify-end px-4 py-2">
        <Link to="/clientes/balance">
        <button onClick={() => userSelectedTopUp(item)} className="px-4 py-2 mx-1 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700">
          <BiSolidBadgeDollar />
        </button></Link>
        <Link to="/clientes/nuevo">
        <button onClick={() => userSelectedEdit(item)} className="px-4 py-2 mx-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          <FaEdit />
        </button>
        </Link>
        <Link to="/clientes/nuevo">
        <button onClick={() => userSelectedView(item)}className="px-4 py-2 mx-1 font-bold text-white bg-green-500 rounded hover:bg-green-700">
          <FaEye />
        </button>
        </Link>
        <button onClick={() => handleDelete(item.id)} className="px-4 py-2 mx-1 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          <FaTrash />
        </button>
        </td>
        </tr>
      ))}
    </tbody>
  </table>
  </section>
</div>
</div>
  )
}

export default ClientList