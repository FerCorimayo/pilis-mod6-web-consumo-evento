const GeneratePayment = () => {

  return (
    <div className="md:w-8/12 mx-auto my-16 h-[40rem] p-6 pt-10 pb-10 bg-white rounded-2xl">
      <form className="w-full p-3">
        <div className="flex justify-between border-b-2 border-zinc-400 pb-3">
          <p className="text-xl font-medium mb-1 pb-1 text-zinc-500">Número de Orden</p>
          <span className="text-xl font-medium pr-3 text-zinc-500">23</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-xl font-medium mb-1 pb-1 text-zinc-500">Fecha</p>
          <span className="text-xl font-medium pr-3 text-zinc-500">09/09/2023</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-xl font-medium mb-1 pb-1 text-zinc-500">Monto Total</p>
          <input type="text"
            className="border-solid border-2 border-zinc-300 rounded-xl focus:outline-none focus:border-zinc-300 p-2 text-right text-zinc-500 text-xl"
          />
        </div>
        <div className="mt-52">
          <div className="flex justify-between border-t-2 border-zinc-400 pt-3">
            <p className="text-3xl font-semibold pt-3 text-zinc-500">Total</p>
            <span className="text-3xl font-semibold pr-3 pt-4 text-zinc-500">$15000,00</span>
          </div>
          <div className="flex justify-end md:mt-9 md:mr-6">
            <button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full">Validar Pago</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default GeneratePayment;