import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useContext } from 'react';
import { ClientsRegisteredContex } from "../../context/ClientRegisteredContext";

const ClientBalance = () => {
    const {register, handleSubmit,watch, formState: {errors}}=useForm();

    const { clientRegistered, setClientRegistered } = useContext(ClientsRegisteredContex);

    const saldo= watch("text5")
    const onSubmit = async(data) => {
      {
        const userId = clientRegistered.id
        const da = {
          saldo: parseFloat(data.text5) + parseFloat(clientRegistered.saldo),
          }
            try { 
              const respuesta = await axios.put(
                `https://64f32c36edfa0459f6c65f8a.mockapi.io/api/clients/user/${userId}`,
                da
              );
            
            Swal.fire(
              'Saldo Agregado',
              `Hola , se agrego${data.text5+clientRegistered.saldo } de saldo a  ${clientRegistered.name}!`,
              'success'
            );
            console.log(respuesta)
            }catch (error) {
              Swal.fire(
          'Error',
          'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
          'error'
        );
              console.error(error);
            }
      }
    }
    return(
        <div className="flex justify-center p-2 bg-gray-400 sm:p-3 md:p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full grid-cols-1 grid-rows-6 gap-1 p-4 pb-5 m-2 bg-white rounded-md sm:w-auto sm:gap-3 md:gap-4 sm:m-3 md:m-5 sm:p-8 md:p-7 lg:p-16">
          <h4 className="col-span-1 row-span-1 p-5 pb-0 text-2xl font-bold text-gray-500 border-b border-gray-500 sm:pb-5" >Saldo {clientRegistered.name}</h4>
          <h4 className="col-span-1 row-span-1 p-5 pb-0 text-2xl font-bold text-center text-gray-500 sm:pb-5" >Total</h4>
          <h1 className="col-span-1 row-span-2 p-5 pb-0 font-bold text-center text-gray-300 text-7xl sm:pb-5" >${saldo && !isNaN(saldo) ? parseInt(saldo).toLocaleString('de-DE') : '000'}</h1>
        <div className='col-span-1 row-span-1 p-5 pb-0'>
        
      
          <input
            type='text'
            placeholder="monto"
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            maxLength="6"
            
            {...register(
              'text5',{
                validate: value => !isNaN(value) || "Este campo debe ser numérico"
              }
            )}
          />
          <p className="text-red-500">{errors.text5?.message}</p>
            
          </div>
          <div className="flex flex-row justify-start col-span-1 row-span-1">
          <button className='self-start px-5 py-3 m-4 bg-green-600 rounded-3xl active:bg-green-800' type='submit'>
          Actualizar
          </button>
          </div>
          </form> 
          </div>
    )
}
export default ClientBalance