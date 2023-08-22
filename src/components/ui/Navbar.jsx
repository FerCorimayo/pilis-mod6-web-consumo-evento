import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div class="min-h-full">
        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                    <NavLink to="/vendedores" >
                        <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Vendedores</a>
                    </NavLink>
                    <NavLink to="/clientes" >
                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Clientes</a>
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


