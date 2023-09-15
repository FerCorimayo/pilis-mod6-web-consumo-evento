import { useContext, useState } from "react";
import moment from 'moment';
import { PaymentContext } from "../../context/PaymentContext";

const RegisterPayment = () => {

  const [today, setToday] = useState(moment().format('DD/MM/YYYY'));
  const { currentPayment } = useContext(PaymentContext);

  return (
    <div className="md:w-6/12 mx-auto my-16 h-[38rem] p-6 pt-10 pb-10 bg-white rounded-2xl">
      <form className="w-full p-3">
        <div className="pb-3 border-b-2 border-zinc-400">
          <div className="flex justify-between">
            <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">Número de Orden</p>
            <span className="pr-3 text-3xl font-medium text-zinc-500">23</span>
          </div>
          <span className="flex justify-end pr-3 text-lg font-medium text-zinc-500">{today}</span>
        </div>

        <div className="flex justify-between mt-16">
          <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">Cliente</p>
          <span className="pr-3 text-3xl font-medium text-zinc-500">{currentPayment.user_client.fullname}</span>
        </div>
        <div className="flex justify-between mt-7">
          <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">DNI</p>
          <span className="pr-3 text-3xl font-medium text-zinc-500">{currentPayment.user_client.dni}</span>
        </div>
        <div className="mt-20">
          <div className="flex justify-between pt-3 border-t-2 border-zinc-400">
            <p className="pt-3 text-3xl font-semibold text-zinc-400">Total</p>
            <span className="pt-4 pr-3 text-3xl font-semibold text-zinc-500">${currentPayment.amount},00</span>
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