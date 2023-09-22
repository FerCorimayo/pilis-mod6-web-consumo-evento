import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";
import { useForm } from "react-hook-form";
import { validateCode } from "../../helpers/wallet";
import Swal from 'sweetalert2'
import { listBusinessSeller } from "../../helpers/seller";
import { AuthContext } from "../../context/AuthContext";
import { FaChevronLeft } from 'react-icons/fa'

const ValidatePayment = () => {
  
  const {currentUser} = useContext(AuthContext);
  const { currentPayment, setCurrentPayment } = useContext(PaymentContext);
  const {register, handleSubmit}=useForm();

  const onSubmit = (data) => {

    validateCode(data.token).then((body_code) => {
      if(body_code.message){
        return Swal.fire('Error', body_code.message, 'error')
      }
      listBusinessSeller(currentUser.id).then((body_business) => {
        if (body_business.message) {
          return Swal.fire('Error', body_business.message, 'error');
        }
        if(body_business[0]){
          setCurrentPayment({
            ...currentPayment, 
            step:3,
            id_business: body_business[0].id,
            id_wallet: body_code.wallet.id,
            user_client: {
              fullname: body_code.wallet.user.fullname,
              dni: body_code.wallet.user.dni,
              email: body_code.wallet.user.email
            },
            business: {
              name: body_business[0].name,
              type: body_business[0].type
            }
          })
        }
      }).catch((error) => {console.error('Error:', error)});

    }).catch((error) => {console.error('Error:', error)});
  }

  return (
      <section className="md:w-6/12 p-6 mx-auto md:my-5 md:h-full bg-white rounded-2xl">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b-2 border-solid border-zinc-500 flex justify-start">
          <FaChevronLeft className="w-5 h-auto mx-1 cursor-pointer text-zinc-500 hover:text-zinc-400" onClick={()=>(setCurrentPayment({...currentPayment, step:1}))} />
          <div className="w-full pt-3 pb-3 text-3xl font-bold  text-zinc-500">Validar Pago </div>
        </div>
          <input 
            type='number'
            className='w-full p-2 mt-20 mb-20 font-medium border-2 border-solid rounded-xl text-zinc-500 border-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400'
            placeholder='Código de Pago'
            {...register('token', { required: true, min: 1 })}  
          >
          </input>
          <div className="w-full">
            <button className="w-full hover:bg-[#00C294] bg-[#00C280] font-medium text-white px-8 py-2 rounded-lg"  type="submit">Verificar Codigo</button>
          </div>
        </form>
      </section>
  );
};

export default ValidatePayment;