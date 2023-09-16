/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa'

const Navbar = ({navegation}) => {

  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const [ nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    window.localStorage.clear('token','refreshToken');
    navigate('/login')
  }
    
  return (

    <nav className="bg-[#005b8e]">
    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button" className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={()=>(nav?setNav(false):setNav(true))}>
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>              
            <svg className="hidden w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start max-sm:hidden">
          <div className="flex items-center flex-shrink-0">
            <img className="w-auto h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <div className="hidden sm:ml-6 sm:block">
             <div className="flex space-x-4 divide-x-2 divide-white-300"> 
              {navegation.map((nav_link, index) => (
                <NavLink to={nav_link} key={index}>
                  <label className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">{nav_link}</label>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <label className="relative p-1 text-gray-400">
            <p>{currentUser.fullname} - {currentUser.role=='admin'? 'Administrador':'Vendedor'}</p>
          </label>
          <div className="relative ml-3">
            <div>
              <button type="button" className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src="/src/assets/user_log.png" alt="user-default"/>
              </button>
            </div>
          </div>
          <button type="txt" className="relative ml-3 rounded-full bg-[#005b8e]-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={() => handleLogout()}>
              <p className='flex'>
                <FaSignOutAlt className='w-5 h-auto mx-1'/> Salir 
              </p>
            </button>
        </div>
      </div>
    </div>
    {nav?
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navegation.map((nav_link, index) => (
                  <NavLink to={nav_link} key={index}>
                    <label className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer">{nav_link}</label>
                  </NavLink>
          ))}
        </div>
      </div>
    :
      null
    }
  </nav>  
    
  )
}

export default Navbar



