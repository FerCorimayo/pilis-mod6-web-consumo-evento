import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentContext } from "../../context/PaymentContext";
import moment from 'moment';

const GeneratePayment = () => {

  const [amount, setAmount] = useState('');
  const [today] = useState(moment().format('DD/MM/YYYY'))
  const {register, handleSubmit, setValue}=useForm();
  const { currentPayment, setCurrentPayment } = useContext(PaymentContext)

  useEffect(() => {
		updateForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	const updateForm = () => {
		setValue('amount',0)
	}

  const onSubmit = (data) => {
    setCurrentPayment({...currentPayment, amount: parseInt(data.amount), step:2})
  }  

  const handleChange = event => {
    setAmount(event.target.value);
  };
  
  return (
    <div className="md:w-8/12 mx-auto md:my-5 h-[40rem] p-6 pb-10 bg-white rounded-2xl">
      <form className="w-full p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center pb-3 border-b-2 border-zinc-400">
          <p className="pb-1 mb-1 text-3xl md:text-4xl font-semibold text-zinc-500">Generar Orden</p>
        </div>
        <div className="flex justify-between mt-20">
          <p className="pb-1 mb-1 text-xl font-medium text-zinc-500">Fecha</p>
          <span className="pr-3 text-xl font-medium text-zinc-500">{today}</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="pb-1 mb-1 text-xl font-medium text-zinc-500">Monto Total</p>
          <input 
            type="number"
            className="p-2 text-xl text-right border-2 border-solid border-zinc-300 rounded-xl focus:outline-none focus:border-zinc-300 text-zinc-500"
						{...register('amount', { required: true, min: 1 })}	
            value={amount} onChange={handleChange}
          />
        </div>
        <div className="mt-20">
          <div className="flex justify-between pt-3 border-t-2 border-zinc-400">
            <p className="pt-3 text-3xl font-semibold text-zinc-500">Total</p>
            <span className="pt-4 pr-3 text-3xl font-semibold text-zinc-500">${amount},00</span>
          </div>
          <div className="flex justify-end md:mt-9">
            <button type="submit" className="bg-[#007abe] hover:bg-[#005b8e] font-medium text-white mt-8 py-3 px-9 rounded-full">Validar Pago</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default GeneratePayment;