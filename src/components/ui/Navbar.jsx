import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="min-h-full">
        <nav className="bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    
                </div>
                <div className="hidden md:block">
                    <div className="flex items-baseline ml-10 space-x-4">
                    <NavLink to="/vendedores" >
                        <a href="#" className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md" aria-current="page">Vendedores</a>
                    </NavLink>
                    <NavLink to="/clientes" >
                        <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Clientes</a>
                    </NavLink>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
        </nav>
</div>
  )
}

export default Navbar


