import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLoginSubmit = () => {
  
  }

  return (
    <div className="mx-auto lg:flex">
      <div className="h-screen mx-auto px-auto sm:w-full md:w-10/12 lg:w-7/12 xl:w-7/12">
        <div className="mx-auto pt-32 w-11/12 md:pt-40 md:w-full xl:w-9/12">
          <h2 className="text-4xl font-bold text-zinc-500 mb-9 text-center sm:text-left">Iniciar Sesión</h2>
          <div className="flex-col sm:flex sm:flex-row">
            <div className="w-full sm:w-1/3 md:w-3/12 xl:w-4-12">
              <FaUser className="mx-auto w-24 h-auto mb-8 sm:block sm:w-40 sm:h-auto text-zinc-400" />
            </div>
            <div className="mx-auto w-full sm:w-full md:w-9/12 xl:w-8/12 pl-2">
              <form
                onSubmit={handleSubmit(handleLoginSubmit)}
                className="sm:w-full w-full">
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">Usuario</label>
                  <input
                    type="text"
                    className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                    placeholder="Nombre de usuario"
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">Contraseña</label>
                  <input
                    type="password"
                    className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                    placeholder="Contraseña"
                    {...register('password', { required: true })}
                  />
                  {errors.password && <span className="text-red-600"> *Este campo es requerido</span>}
                </div>
                <button
                  type="submit"
                  className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full mx-auto block"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/12 bg-[rgb(0,91,142)]">
        <div className="hidden lg:flex items-center justify-center h-full">
          {/* agregar un logo */}
        </div>
      </div>
    </div>
  );
};

export default Login;