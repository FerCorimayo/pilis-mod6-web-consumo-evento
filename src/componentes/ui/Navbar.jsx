/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa'

const Navbar = ({navegation}) => {

  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [ nav, setNav] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsActive(false);
        setNav(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    window.localStorage.clear('token','refreshToken');
    navigate('/login')
  }
    
  return (
    <header>
      <nav className="bg-[#005b8e]">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {!nav && (
                <button type="button" className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md dark:hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={()=> setNav(!nav)}>
                  <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              )}
              {nav && (
                <button type="button" className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md dark:hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={()=> setNav(!nav)}>
                  <svg className=" w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start max-sm:hidden">
              <div className="flex items-center flex-shrink-0">
                <img className="w-auto h-8" src="/src/assets/log.png" alt="log-event" />
              </div>
              <div className="pt-1 sm:ml-6 sm:block">
                <div className="divide-x-2 divide-white-300"> 
                  {navegation.map((nav_link, index) => (
                    <NavLink to={nav_link} key={index}>
                      <label className="px-3 py-2 mx-2 text-sm font-medium text-gray-300 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">{nav_link}</label>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:ml-6 ">
              <label className="relative flex text-gray-400 items-center">
                <p>{currentUser.role=='admin'? 'Administrador':'Vendedor'}</p>
                <button type="button" className="ml-4 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setIsActive(!isActive)}>
                  <img className="w-8 h-8 rounded-full" src="/src/assets/user_log.png" alt="user-default"/>
                </button>
              </label>
            </div>
            {isActive && (
              <div ref={divRef} className="absolute right-0 mt-48 w-40 divide-y rounded-lg dark:bg-slate-600 dark:divide-gray-700" id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{currentUser.fullname}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{currentUser.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li className='cursor-pointer'>
                    <a className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-950 dark:text-gray-200 dark:hover:text-white" onClick={() => handleLogout()}><FaSignOutAlt className='w-5 h-auto mx-1'/>Salir</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {nav && (
          <div ref={divRef} className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navegation.map((nav_link, index) => (
                <NavLink to={nav_link} key={index}>
                  <label className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">{nav_link}</label>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar



