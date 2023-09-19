import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useContext } from 'react';
import { ClientsRegisteredContex } from "../../context/ClientRegisteredContext";
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { updateWallet } from "../../helpers/client";

const ClientBalance = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { clientRegistered, setClientRegistered } = useContext(ClientsRegisteredContex);

  const onSubmit = async (data) => {
    const wallet = {
      balance: parseInt(data.saldo)
    }
    updateWallet(wallet, clientRegistered.id).then((body) => {
      if(body.message){
        return Swal.fire('Error', body.message, 'error')
      }
      Swal.fire(
        'Saldo Cargado',
        `Se cargo $${data.saldo} a  ${clientRegistered.user.fullname}!`,
        'success'
      );
      clientRegistered.balance = parseFloat(data.saldo) + parseFloat(clientRegistered.balance)
      setClientRegistered(clientRegistered)
      reset()
    }).catch((error) => {console.error('Error:', error)});
  }
  return (
    <section className="p-8 md:h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="h-auto p-6 bg-white md:h-full rounded-xl">
        <div className="block md:flex">
          <div className="h-auto bg-white md:w-7/12 md:h-full mx-auto">
            <div className="flex justify-start pb-4 border-b-2 border-solid border-zinc-500">
              <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={() => (navigate('/clientes'))} />
              <p className="w-7/12 ml-2 text-3xl font-bold text-zinc-500">
                Saldo ({clientRegistered.user.fullname})
              </p>
            </div>
            <div className="mt-4 mb-4">
              <h4 className="col-span-1 row-span-1 p-5 pb-0 text-2xl font-bold text-center text-gray-500 sm:pb-5" >Total</h4>
              <h1 className="col-span-1 row-span-2 p-5 pb-0 font-bold text-center text-gray-300 text-7xl sm:pb-5" >${clientRegistered.balance ? clientRegistered.balance.toLocaleString('de-DE') : '000'}</h1>
            </div>
            <div className="mb-4">
              <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Saldo</label>
              <input
                type="number"
                className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                placeholder="Ingresar Saldo"
                {...register('saldo', { required: true, min: 1 })}
              />
              {errors.saldo && <span className="text-red-600"> *Este campo es requerido *Ingresar numeros mayor a 0</span>}
            </div>
            <div className="flex justify-end md:mt-9">
              <button type="submit" className="bg-[#00be2f] hover:bg-[#00be09] font-medium text-white mt-8 py-3 px-9 rounded-full">Actualizar
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
export default ClientBalance