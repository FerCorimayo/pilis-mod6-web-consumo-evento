const ValidatePayment = () => {
  
  return (
    <div className="md:w-6/12 h-[37rem] mx-auto mt-20 p-7 bg-white rounded-2xl">
      <div className="w-full pt-3 pb-3 font-semibold border-b-2 border-zinc-400 border-solid text-3xl text-zinc-500">Validar Pago </div>
      <input className='w-full p-4 border-2 border-solid rounded-2xl text-2xl font-medium text-zinc-500 border-zinc-400 mb-20 mt-40 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400'
        type='text'
        placeholder='Código de Pago'>
      </input>
      <div className="w-full mt-24">
        <button className="w-full bg-[#00C294] hover:bg-[#00C280] font-normal text-xl text-white px-8 py-2 rounded-lg">Verificar Codigo</button>
      </div>
    </div>
  );
};

export default ValidatePayment;