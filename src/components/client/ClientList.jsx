import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
const exampleData = [
  { id: 2, name: 'susan', dni: 20399451, email: 'lindsaywalton@example.com',saldo:300000},
  { id: 1, name: 'robin', dni: 50391345, email: 'courtneyhenry@example.com',saldo:400000},

]
const ClientList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(data);
  //borrador de usuarios
  /*const handleDelete = id => {
    axios.delete(`${id}`).then(response => {
      setData(response.data);
    });
  };*/
  //buscador
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  //obtencion de datos
  /*useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);*/
  //buscador
  useEffect(() => {
    const results = exampleData.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
  <div className="h-screen w-screen bg-gray-300">
    <div className='max-w-full mx-7 my-7 bg-white'>
      <section className="flex justify-between">
      <input type="text" placeholder="Buscar" value={searchTerm} onChange={handleChange}
      className="text-lg self-start flex-shrink-0 my-6 mx-7 px-4 py-1 bg-white border rounded-3xl shadow-sm border-slate-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
      
      <Link to="/clientes">
      <button className="px-5 py-3 m-5 bg-blue-600 rounded-3xl text-white">Nuevo Cliente</button>
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
          <td className="px-4 py-2 text-center">{item.id}</td>
          <td className="px-4 py-2 text-center">{item.dni}</td>
          <td className="px-4 py-2 text-center">{item.name}</td>
          <td className="px-4 py-2 text-center">{item.email}</td>
          <td className="px-4 py-2 text-center">{item.saldo}</td>
          <td className="px-4 py-2 flex justify-end"><button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <FaEdit />
        </button>
        <button className="mx-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <FaEye />
        </button>
        <button onClick={() => handleDelete(item.id)} className="mx-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <FaTrash />
        </button></td>
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