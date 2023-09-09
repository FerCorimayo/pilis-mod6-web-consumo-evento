import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2'

import { useContext } from 'react';


import { ClientsRegisteredContex } from '../../context/ClientRegisteredContext'

const ClientForm = () => {
  const { clientRegistered, setClientRegistered } = useContext(ClientsRegisteredContex);
  let preName = "";
  let preEmail = "";
  let preDni = 0;
  let preSaldo = 0;
  let preUser ="";
  let prePass = "";

if (clientRegistered) {
if(clientRegistered.modo==1 || clientRegistered.modo==2){
  preName = clientRegistered.name;
  preEmail = clientRegistered.email;
  preDni = clientRegistered.dni;
  preSaldo = clientRegistered.saldo;
  preUser = clientRegistered.user;
  prePass = clientRegistered.password;
}
}
    const {register, handleSubmit, formState: {errors}}=useForm({
      defaultValues: {
        text: preName,
        text1:preEmail,
        text2:preDni,
        text3:preUser,
        text4:prePass
      }
  
});

    
    // const saldo= watch("text5")


    const onSubmit = async(data) => {
    
    if (clientRegistered.modo==0){
    const da = {
    name: data.text,
    email: data.text1,
    dni: data.text2,
    saldo:0,
    user:data.text3,
    password:data.text4
    
    }
      try { 
    const respuesta = await axios.post('https://64f32c36edfa0459f6c65f8a.mockapi.io/api/clients/user', da);
      
      Swal.fire(
        'Formulario enviado',
        `Hola ${data.text}, tu formulario ha sido enviado exitosamente!`,
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
    if (clientRegistered.modo==1){
      const userId = clientRegistered.id
      const da = {
        name: data.text,
        email: data.text1,
        dni: data.text2,
        saldo:0,
        user:data.text3,
        password:data.text4
        }
          try { 
            const respuesta = await axios.put(
              `https://64f32c36edfa0459f6c65f8a.mockapi.io/api/clients/user/${userId}`,
              da
            );
          
          Swal.fire(
            'Formulario enviado',
            `Hola ${data.text}, tu formulario ha sido enviado exitosamente!`,
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
    return (
        <>
    {/* <div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 grid-rows-2 gap-4 p-2 bg-gray-200 md:grid-cols-2 md:grid-rows-1 sm:p-3 md:p-5">
      
      <div className="grid grid-cols-2 grid-rows-5 gap-1 p-4 pb-5 m-2 bg-white rounded-md sm:w-auto sm:gap-3 md:gap-4 sm:m-3 md:m-5 sm:p-8 md:p-8 lg:p-16">
      <h4 className="col-span-2 p-5 pb-0 text-2xl font-bold text-gray-500 border-b border-gray-500 sm:pb-5" >Nuevo Usuario</h4> */}
        <div className="flex justify-center p-2 bg-gray-400 sm:p-3 md:p-5">
        
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-full grid-cols-2 grid-rows-5 gap-1 p-4 pb-5 m-2 bg-white rounded-md sm:w-auto sm:gap-3 md:gap-4 sm:m-3 md:m-5 sm:p-8 md:p-16">
      {clientRegistered.modo==0 && <h4 className="col-span-2 p-5 pb-0 text-2xl font-bold text-gray-500 border-b border-gray-500 sm:pb-5" >Nuevo Usuario {clientRegistered.name}</h4>}
      {clientRegistered.modo==1 && <h4 className="col-span-2 p-5 pb-0 text-2xl font-bold text-gray-500 border-b border-gray-500 sm:pb-5" >Editar Usuario de {clientRegistered.name}</h4>}
      {clientRegistered.modo==2 && <h4 className="col-span-2 p-5 pb-0 text-2xl font-bold text-gray-500 border-b border-gray-500 sm:pb-5" >Ver Informacion de {clientRegistered.name}</h4>}
        <div className='col-span-2 row-span-1'>
          <label className="flex flex-row justify-start pt-4 text-sm font-medium leading-6 text-gray-500"> Nombre</label>
          <input
            type='text'
            disabled={clientRegistered.modo==2} 
            placeholder="Nombre" className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            
            {...register(
              'text', {
                required: "Este campo esta vacio",
                validate: value => typeof value === "string" || "Este campo debe ser de texto"
              }
            )}
          />
          <p className="text-red-500">{errors.text?.message}</p>
          </div>
          
          <div className='col-span-2 row-span-1'>
          <label className="flex flex-row justify-start pt-4 text-sm font-medium leading-6 text-gray-500"> Email</label>
          <input
            type='text'
            disabled={clientRegistered.modo==2}
            placeholder="Email"
            
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            {...register(
              'text1',{
                required: "Este campo esta vacio"
              }
            )}
          />
          <p className="text-red-500">{errors.text1?.message}</p>
            </div>
          <div className='col-span-2 row-span-1'>
          <label className="flex flex-row justify-start pt-4 text-sm font-medium leading-6 text-gray-500"> Dni</label>
          <input
            type='text'
            disabled={clientRegistered.modo==2}
            placeholder="Dni"
            
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            {...register(
              'text2',{
                required: "Este campo esta vacio",
                validate: value => !isNaN(value) || "Este campo debe ser numérico"
              }
            )}
          />
          <p className="text-red-500">{errors.text2?.message}</p>
            </div>
       <div className='col-span-2 row-span-1 md:col-span-1'>
          <label className="flex flex-row justify-start pt-4 text-sm font-medium leading-6 text-gray-500"> Usuario</label>
          <input
            type='text' 
            disabled={clientRegistered.modo==2}
            placeholder="Usuario"
            
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            {...register(
              'text3',{required: "Este campo esta vacio",}
            )}
          />
          <p className="text-red-500">{errors.text3?.message}</p>
          </div>
        <div className='col-span-2 row-span-1 md:col-span-1'>
          <label className="flex flex-row justify-start pt-4 text-sm font-medium leading-6 text-gray-500"> Contraseña</label>
          <input
            type='text'
            disabled={clientRegistered.modo==2}
            placeholder="Contraseña"
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            {...register(
              'text4',{required: "Este campo esta vacio",}
            )}
          />
          <p className="text-red-500">{errors.text4?.message}</p>
          </div>
          
          {clientRegistered.modo==0 && <div className="flex flex-row justify-end col-span-2">
          <button className="px-5 py-3 m-4 bg-blue-600 rounded-3xl active:bg-blue-900" type='submit'>Enviar</button>
          </div>}
          {clientRegistered.modo==1 && <div className="flex flex-row justify-end col-span-2">
          <button className="px-5 py-3 m-4 bg-blue-600 rounded-3xl active:bg-blue-900" type='submit'>Actualizar</button>
          </div>}
          {/* </div> */}
          
          {/* <div className="grid w-full grid-cols-1 grid-rows-6 gap-1 p-4 pb-5 m-2 bg-white rounded-md sm:w-auto sm:gap-3 md:gap-4 sm:m-3 md:m-5 sm:p-8 md:p-7 lg:p-16">
          <h4 className="col-span-1 row-span-1 p-5 pb-0 text-2xl font-bold text-gray-500 border-b border-gray-500 sm:pb-5" >Saldo</h4>
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
          </div> */}
          
      </form>
      
    </div>
        </>
    )
}

export default ClientForm