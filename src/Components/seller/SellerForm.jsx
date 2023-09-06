import { useForm } from "react-hook-form";

const SellerForm = () => {

	const { register, handleSubmit, formState: { errors } } = useForm();

	return (
		<div className="md:h-screen p-8">
			<form className="bg-white h-auto md:h-full rounded-xl p-6" onSubmit={handleSubmit}>
				<div className="block md:flex">
					<div className="bg-white h-auto md:w-7/12 md:h-full ">
						<div className="pb-4 border-b-2 border-solid border-zinc-500">
							<p className="text-3xl ml-2 font-bold text-zinc-500 w-7/12">Nuevo Vendedor</p>
						</div>
						<div className="mt-4 mb-4">
							<label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">Nombre Completo</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Nombre Completo"
								{...register('fullname', { required: true })}
							/>
							{errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4">
							<label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">DNI</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="DNI"
								{...register('dni', { required: true })}
							/>
							{errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="mb-4">
							<label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">Email</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Email"
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
					</div>
					<div className="bg-white md:w-5/12 h-auto">
						<div className="pb-4 border-b-2 border-solid border-zinc-500 mt-2 md:pl-3">
							<p className="text-xl font-bold text-zinc-500 ">Información del Negocio</p>
						</div>
						<div className="md:ml-3 mt-4 mb-4">
							<label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">Nombre del Negocio</label>
							<input
								type="text"
								className="w-full border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2"
								placeholder="Nombre del Negocio"
								{...register('name', { required: true })}
							/>
							{errors.email && <span className="text-red-600"> *Este campo es requerido</span>}
						</div>
						<div className="md:ml-3 mb-4">
							<label className="block text-lg font-medium mb-1 pb-1 text-zinc-500">Categoria</label>
							<select {...register('category')} className="w-6/12 text-zinc-500 border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-[#007abe] focus:ring-1 focus:ring-[#007abe] p-2">
								<option value="accesorios" className="">Accesorios</option>
								<option value="accesorios" className="">Comida</option>
							</select>
						</div>
					</div>
				</div>
				<div className="flex justify-end md:mt-9 md:mr-6">
          <button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full"> Guardar</button>
        </div>
			</form >
		</div >
	)
};

export default SellerForm;