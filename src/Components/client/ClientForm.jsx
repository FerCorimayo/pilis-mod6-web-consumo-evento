import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate  } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';


import { ClientsRegisteredContex } from '../../context/ClientRegisteredContext'
import { createClient, createWallet } from "../../helpers/client";

const ClientForm = () => {
  const navigate = useNavigate();
  const [ user, setUser] = useState(null);
  const { clientRegistered, setClientRegistered } = useContext(ClientsRegisteredContex);
  const preName = "";
  const preEmail = "";
  const preDni = 0;
  const preSaldo = 0;

  const {register, handleSubmit, formState: {errors}, reset, setValue}=useForm({
    defaultValues: {
      fullname: preName,
      email:preEmail,
      dni:preDni,
    }
  });

  useEffect(() => {
    updateForm()
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
      balance: 0.0,
      idUser: null
    }
    if (clientRegistered.modo==1) {
      updateSeller(seller, stateSeller.user.id).then((body) => {
        if(body.message){
          return Swal.fire('Error', body.message, 'error')
        }
        updateBusiness(business, stateSeller.id).then((body) => {
          if(body.message){
            return Swal.fire('Error', body.message, 'error')
          }
          Swal.fire('Actualizado!','Un registro fue actualizado!','success')
          navigate('/vendedores')
        }).catch((error) => {console.error('Error:', error)});	
      }).catch((error) => {console.error('Error:', error)});
    } else {
      if (user == null) {
        createClient(client).then((body) => {
          if(body.message){
            return Swal.fire('Error', body.message, 'error')
          }
          setUser(body)					
          wallet.idUser= parseInt(body.id)
          fetchWalletCreate(wallet)
        }).catch((error) => {console.error('Error:', error)});
      }
      if(user){
        wallet.idUser= parseInt(user.id)
        fetchWalletCreate(wallet)
      }
    }
}

const fetchWalletCreate = (wallet)=>{
  createWallet(wallet).then((body) => {
    if(body.message){
      return Swal.fire('Error', body.message, 'error')
    }
    Swal.fire('Guardado!','Un registro nuevo fue creado!','success')
    reset()
    navigate('/clientes')
  }
  ).catch((error) => {console.error('Error:', error)});
}
  //   const onSubmit = async(data) => {   
  //     if (clientRegistered.modo==0){
  //       const da = {
  //       name: data.text,
  //       email: data.text1,
  //       dni: data.text2,
  //       saldo:0,
  //       user:data.text3,
  //       password:data.text4
        
  //       }
  //     try { 
  //   const respuesta = await axios.post('https://64f32c36edfa0459f6c65f8a.mockapi.io/api/clients/user', da);
      
  //     Swal.fire(
  //       'Formulario enviado',
  //       `Hola ${data.text}, tu formulario ha sido enviado exitosamente!`,
  //       'success'
  //     );
  //     console.log(respuesta)
  //     }catch (error) {
  //       Swal.fire(
  //   'Error',
  //   'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
  //   'error'
  // );
  //       console.error(error);
  //     }
  //   }
  //   if (clientRegistered.modo==1){
  //     const userId = clientRegistered.id
  //     const da = {
  //       name: data.text,
  //       email: data.text1,
  //       dni: data.text2,
  //       saldo:0,
  //       user:data.text3,
  //       password:data.text4
  //       }
  //         try { 
  //           const respuesta = await axios.put(
  //             `https://64f32c36edfa0459f6c65f8a.mockapi.io/api/clients/user/${userId}`,
  //             da
  //           );
          
  //         Swal.fire(
  //           'Formulario enviado',
  //           `Hola ${data.text}, tu formulario ha sido enviado exitosamente!`,
  //           'success'
  //         );
  //         console.log(respuesta)
  //         }catch (error) {
  //           Swal.fire(
  //       'Error',
  //       'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
  //       'error'
  //     );
  //           console.error(error);
  //         }
  //   }
  // }
    return (
    <div className="p-8 md:h-screen">
    <form className="h-auto p-6 bg-white md:h-full rounded-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="block md:flex">
        <div className="h-auto bg-white md:w-7/12 md:h-full ">
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
        </div>
      </div>
      <div className="flex justify-end md:mt-9 md:mr-6">
        {clientRegistered.modo==1 ?
        <button type="submit" className="bg-[#00be2f] hover:bg-[#00be09] font-medium text-white mt-8 py-3 px-9 rounded-full">Actualizar</button>
        :
        <button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full">Guardar</button>
        }
      </div>
    </form >
  </div >
    )
}

export default ClientForm