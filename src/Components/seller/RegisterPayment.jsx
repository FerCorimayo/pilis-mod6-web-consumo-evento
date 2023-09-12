const RegisterPayment = () => {

  return (
    <div className="md:w-6/12 mx-auto my-16 h-[38rem] p-6 pt-10 pb-10 bg-white rounded-2xl">
      <form className="w-full p-3">
        <div className="border-b-2 border-zinc-400 pb-3">
          <div className="flex justify-between">
            <p className="text-3xl font-medium mb-1 pb-1 text-zinc-400">Número de Orden</p>
            <span className="text-3xl font-medium pr-3 text-zinc-500">23</span>
          </div>
          <span className="flex justify-end text-lg font-medium pr-3 text-zinc-500">11/09/2023</span>
        </div>

        <div className="flex justify-between mt-16">
          <p className="text-3xl font-medium mb-1 pb-1 text-zinc-400">Cliente</p>
          <span className="text-3xl font-medium pr-3 text-zinc-500">Fabian Choque</span>
        </div>
        <div className="flex justify-between mt-7">
          <p className="text-3xl font-medium mb-1 pb-1 text-zinc-400">DNI</p>
          <span className="text-3xl font-medium pr-3 text-zinc-500">12345678</span>
        </div>
        <div className="mt-20">
          <div className="flex justify-between border-t-2 border-zinc-400 pt-3">
            <p className="text-3xl font-semibold pt-3 text-zinc-400">Total</p>
            <span className="text-3xl font-semibold pr-3 pt-4 text-zinc-500">$15000,00</span>
          </div>
          <div className="flex justify-end md:mt-8">
            <button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full">Registrar Cobro</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default RegisterPayment;