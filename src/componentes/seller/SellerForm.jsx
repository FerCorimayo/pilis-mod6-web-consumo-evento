import { useForm } from "react-hook-form";
import { createSeller, createBusiness, updateSeller, updateBusiness } from '../../helpers/seller'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa'

const SellerForm = () => {

	const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
	const [ user, setUser] = useState(null);
	const navigate = useNavigate();

	const location = useLocation();
	const stateSeller = location.state?.stateSeller;

	useEffect(() => {
		updateForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSeller]);

	const updateForm = () => {
		setValue('fullname',stateSeller?.user?.fullname)
		setValue('dni',stateSeller?.user?.dni)
		setValue('email',stateSeller?.user?.email)
		setValue('name',stateSeller?.name)
		setValue('puesto',stateSeller?.location)
		setValue('category',stateSeller?.type)
	}

	const onSubmit = (data) => {
			const seller = {
					fullname: data.fullname,
					dni: parseInt(data.dni),
					email: data.email,            
					password: data.password,
					role: 'seller'
			}
			const business = {
				name: data.name,
				location: parseInt(data.puesto),
				type: data.category,
				idUser: null
			}
			if(stateSeller && business.location == stateSeller.location){
				business.location = ''
			}
			if (stateSeller) {
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
					createSeller(seller).then((body) => {
						if(body.message){
							return Swal.fire('Error', body.message, 'error')
						}
						setUser(body)					
						business.idUser= parseInt(body.id)
						fetchBusinessCreate(business)
					}).catch((error) => {console.error('Error:', error)});
				}
				if(user){
					business.idUser= parseInt(user.id)
					fetchBusinessCreate(business)
				}
			}
	}
	const fetchBusinessCreate = (business)=>{
		createBusiness(business).then((body) => {
			if(body.message){
				return Swal.fire('Error', body.message, 'error')
			}
			Swal.fire('Guardado!','Un registro nuevo fue creado!','success')
			reset()
		}
		).catch((error) => {console.error('Error:', error)});
	}

	return (
		<section className="p-4 bg-white md:w-11/12 rounded-2xl md:my-5 md:mx-auto">
			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="block md:flex">
					<div className="h-aut md:w-7/12 md:h-full ">
						<div className="pb-4 border-b-2 border-solid border-zinc-500 flex justify-start">
							<FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(navigate('/vendedores'))} />
							<p className="ml-2 text-3xl font-bold text-zinc-500">
								{stateSeller ? 'Actualizar Vendedor':'Nuevo Vendedor'}
							</p>
						</div>
						<div className="mt-4 mb-4">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Nombre Completo</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Nombre Completo"
								{...register('fullname', stateSeller ? {required:false}:{ required: true })}
							/>
							{errors.fullname && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">DNI</label>
							<input
								type="number"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="DNI"
								{...register('dni', stateSeller ? {required:false}:{ required: true })}
							/>
							{errors.dni && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Email</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Email"
								{...register('email', stateSeller ? {required:false}:{ required: true })}
							/>
							{errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Contraseña</label>
							<input
								type="password"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Contraseña"
								{...register('password', stateSeller ? {required:false}:{ required: true })}
							/>
							{errors.password && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
					</div>
					<div className="h-auto md:w-5/12">
						<div className="pb-4 mt-2 border-b-2 border-solid border-zinc-500 md:pl-3">
							<p className="text-xl font-bold text-zinc-500 ">Información del Negocio</p>
						</div>
						<div className="mt-4 mb-4 md:ml-3">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Nombre del Negocio</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Nombre del Negocio"
								{...register('name', stateSeller ? {required:false}:{ required: true })}
							/>
							{errors.name && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4 md:ml-3">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Puesto</label>
							<input
								type="number"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Numero del Puesto"
								{...register('puesto', stateSeller ? {required:false}:{ required: true })}
							/>
							{errors.puesto && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4 md:ml-3">
							<label className="block pb-1 mb-1 text-lg font-medium text-zinc-500">Categoria</label>
							<select {...register('category', stateSeller ? {required:false}:{ required: true })} className="w-full text-zinc-500 border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2">
								<option value="">Seleccione</option>
								<option value="Accesorios" >Accesorios</option>
								<option value="Comida" >Comida</option>
								<option value="Bebidas" >Bebidas</option>
								<option value="Golosinas" >Golosinas</option>
							</select>
							{errors.category && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
					</div>
				</div>
				<div className="flex justify-end mt-6">
					{stateSeller ?
					<button type="submit" className="bg-[#00be2f] hover:bg-[#00be09] font-medium text-white mt-8 py-3 px-9 rounded-full">Actualizar</button>
					:
					<button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full">Guardar</button>
					}
				</div>
			</form >
		</section >
	)
};

export default SellerForm;
