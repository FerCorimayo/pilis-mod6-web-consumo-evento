import { useContext, useState } from "react";
import moment from 'moment';
import { PaymentContext } from "../../context/PaymentContext";
import Swal from 'sweetalert2';
import { createTransaction } from "../../helpers/transaction";
import { FaChevronLeft } from 'react-icons/fa'

const RegisterPayment = () => {

  const [today] = useState(moment().format('DD/MM/YYYY'));
  const { currentPayment, setCurrentPayment } = useContext(PaymentContext);

  const handleTransaction = () => {
    console.log('register')
    setCurrentPayment({
      step: 1,
      amount: 0,
      id_business: null,
      id_wallet: null,
      user_client: null,
      business: null
  })
    const transaction = {
      amount: currentPayment.amount,
      idBusiness: currentPayment.id_business,
      idWallet: currentPayment.id_wallet
    }
    createTransaction(transaction).then((body) => {
      if(body.message){
        return Swal.fire('Error', body.message, 'error')
      }
      Swal.fire('Exito!','Cobro Realizado!','success')
    }).catch((error) => {console.error('Error:', error)});
  }

  return (
    <div className="md:w-6/12 mx-auto md:my-5 h-[38rem] p-6 pb-10 bg-white rounded-2xl">
      <div className="w-full p-3">
        <div className="border-b-2 border-solid border-zinc-400 flex justify-start">
          <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(setCurrentPayment({step:2}))} />
          <div className="w-full pt-3 pb-3 text-3xl font-semibold  text-zinc-500">Registrar Orden </div>
        </div>
        <div className="pb-3 border-b-2 pt-5 border-zinc-400">
          <div className="flex justify-center">
            <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">{currentPayment ? currentPayment.business.name:''}</p>
          </div>
          <span className="flex justify-center pr-3 text-lg font-medium text-zinc-500">{today}</span>
        </div>
        <div className="flex justify-between mt-16">
          <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">Cliente</p>
          <span className="pr-3 text-3xl font-medium text-zinc-500">{currentPayment?currentPayment.user_client.fullname:''}</span>
        </div>
        <div className="flex justify-between mt-7">
          <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">DNI</p>
          <span className="pr-3 text-3xl font-medium text-zinc-500">{currentPayment?currentPayment.user_client.dni:''}</span>
        </div>
        <div className="flex justify-between mt-7">
          <p className="pb-1 mb-1 text-3xl font-medium text-zinc-400">Compra de</p>
          <span className="pr-3 text-3xl font-medium text-zinc-500">{currentPayment?currentPayment.business.type:''}</span>
        </div>
        <div className="mt-20">
          <div className="flex justify-between pt-3 border-t-2 border-zinc-400">
            <p className="pt-3 text-3xl font-semibold text-zinc-400">Total</p>
            <span className="pt-4 pr-3 text-3xl font-semibold text-zinc-500">${currentPayment?.amount},00</span>
          </div>
          <div className="flex justify-end md:mt-8">
            <button className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full" onClick={() => handleTransaction()}>Registrar Cobro</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterPayment;