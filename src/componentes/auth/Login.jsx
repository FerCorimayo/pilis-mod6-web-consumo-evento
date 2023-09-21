import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { startLogin } from "../../helpers/auth";
import Swal from 'sweetalert2';

export const Login = () => {

  const { setCurrentUser } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const handleLoginSubmit = async (data) => {
    const user = await startLogin(data.email, data.password)
    if(user){
      if(user.role=='client'){
        Swal.fire('Error', 'Este usuario no es Vendedor', 'error');
      }else{
        setCurrentUser(user)
      }
    }
  }

  return (
    <section className="mx-auto bg-white lg:flex">
      <div className="h-screen mx-auto px-auto sm:w-full md:w-10/12 lg:w-7/12 xl:w-7/12">
        <div className="w-11/12 pt-32 mx-auto md:pt-40 md:w-full xl:w-9/12">
          <h2 className="text-4xl font-bold text-center text-zinc-500 mb-9 sm:text-left">Iniciar Sesión</h2>
          <div className="flex-col sm:flex sm:flex-row">
            <div className="w-full sm:w-1/3 md:w-3/12 xl:w-4-12">
              <FaUser className="w-24 h-auto mx-auto mb-8 sm:block sm:w-40 sm:h-auto text-zinc-400" />
            </div>
            <div className="w-full pl-2 mx-auto sm:w-full md:w-9/12 xl:w-8/12">
              <form
                onSubmit={handleSubmit(handleLoginSubmit)}
                className="w-full sm:w-full">
                <div className="mb-4">
                  <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Usuario</label>
                  <input
                    type="text"
                    className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                    placeholder="Nombre de usuario"
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
                </div>
                <div className="mb-4">
                  <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Contraseña</label>
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
        <div className="items-center justify-center hidden h-full lg:flex">
          <img className="w-auto h-40" src="/src/assets/log.png" alt="log-event" />
        </div>
      </div>
    </section>
  );
};