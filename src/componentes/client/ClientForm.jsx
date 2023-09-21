import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate  } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { ClientsRegisteredContex } from '../../context/ClientRegisteredContext'
import { createClient, updateClient, createWallet } from "../../helpers/client";

const ClientForm = () => {
  const navigate = useNavigate();
  const { clientRegistered } = useContext(ClientsRegisteredContex);

  const {register, handleSubmit, formState: {errors}, reset, setValue}=useForm();

  useEffect(() => {
    updateForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateForm = () => {
    if (clientRegistered) {
      if(clientRegistered.modo==1 || clientRegistered.modo==2){
        setValue('fullname',clientRegistered?.user?.fullname)
        setValue('email',clientRegistered?.user?.email)
        setValue('dni',clientRegistered?.user?.dni)
      }
      return;
    }
	}

  const onSubmit = (data) => {
    const client = {
        fullname: data.fullname,
        dni: parseInt(data.dni),
        email: data.email,            
        password: data.password,
        role: 'client'
    }
    const wallet = {
      idUser: null
    }
    if (clientRegistered.modo==1) {
      updateClient(client, clientRegistered.user.id).then((body) => {
        if(body.message){
          return Swal.fire('Error', body.message, 'error')
        }
        Swal.fire('Actualizado!','Un registro fue actualizado!','success')
        navigate('/clientes')
      }).catch((error) => {console.error('Error:', error)});
    } else {
      createClient(client).then((body) => {
        if(body.message){
          return Swal.fire('Error', body.message, 'error')
        }
        wallet.idUser= parseInt(body.id)
        createWallet(wallet).then((body) => {
          if(body.message){
            return Swal.fire('Error', body.message, 'error')
          }
          Swal.fire('Guardado!','Un registro nuevo fue creado!','success')
          reset()
          navigate('/clientes')
        }).catch((error) => {console.error('Error:', error)});
      }).catch((error) => {console.error('Error:', error)});
    }
  }

  return (
    <section className="md:w-6/12 p-4 mx-auto md:my-5 md:h-full bg-white rounded-2xl">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="block md:flex">
          <div className="h-auto w-full">
            <div className="flex justify-start pb-4 border-b-2 border-solid border-zinc-500">
              <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(navigate('/clientes'))} />
              <p className="w-7/12 ml-2 text-3xl font-bold text-zinc-500">
                {clientRegistered.modo==1 ? 'Actualizar Cliente':'Nuevo Cliente'}
              </p>
            </div>
            <div className="mt-4 mb-4">
              <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Nombre Completo</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                placeholder="Nombre Completo"
                {...register('fullname', clientRegistered.modo==1 ? {required:false}:{ required: true })}
              />
              {errors.fullname && <span className="text-red-600"> *Este campo es requerido</span>}
            </div>
            <div className="mb-4">
              <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">DNI</label>
              <input
                type="number"
                className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                placeholder="DNI"
                {...register('dni', clientRegistered.modo==1 ? {required:false}:{ required: true })}
              />
              {errors.dni && <span className="text-red-600"> *Este campo es requerido</span>}
            </div>
            <div className="mb-4">
              <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Email</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                placeholder="Email"
                {...register('email', clientRegistered.modo==1 ? {required:false}:{ required: true })}
              />
              {errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
            </div>
            <div className="mb-4">
              <label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Contraseña</label>
              <input
                type="password"
                className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
                placeholder="Contraseña"
                {...register('password', clientRegistered.modo==1 ? {required:false}:{ required: true })}
              />
              {errors.password && <span className="text-red-600"> *Este campo es requerido</span>}
            </div>
            <div className="flex justify-end mt-6">
              {clientRegistered.modo==1 ?
              <button type="submit" className="bg-[#00be2f] hover:bg-[#00be09] font-medium text-white mt-8 py-3 px-9 rounded-full">Actualizar</button>
              :
              <button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full">Guardar</button>
              }
            </div>
          </div>
        </div>
      </form >
    </section >
  )
}

export default ClientForm