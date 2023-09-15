import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";
import { useForm } from "react-hook-form";
import { validateCode } from "../../helpers/wallet";
import Swal from 'sweetalert2'
import { listBusinessSeller } from "../../helpers/seller";
import { AuthContext } from "../../context/AuthContext";

const ValidatePayment = () => {
  
  const {currentUser} = useContext(AuthContext);
  const { currentPayment, setCurrentPayment } = useContext(PaymentContext);
  const {register, handleSubmit, formState: {errors}, reset, setValue}=useForm();

  const onSubmit = (data) => {

    validateCode(data.token).then((body_code) => {
      if(body_code.message){
        return Swal.fire('Error', body_code.message, 'error')
      }
      
      listBusinessSeller(currentUser.id).then((body_business) => {
        if (body_business.message) {
          return Swal.fire('Error', body_business.message, 'error');
        }
          setCurrentPayment({
              ...currentPayment, 
              step:3,
              id_business: body_business[0].id,
              id_wallet: body_code.wallet.id,
              user_client: {
                fullname: body_code.wallet.user.fullname,
                dni: body_code.wallet.user.dni
              }
            })
        }).catch((error) => {console.error('Error:', error)});

    }).catch((error) => {console.error('Error:', error)});
  }  
  // const handleToken = () => {
  //   setCurrentPayment({...currentPayment, step:3})
  // }

  return (
    <div className="md:w-6/12 h-[37rem] mx-auto mt-20 p-7 bg-white rounded-2xl">
      <form className="w-full p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full pt-3 pb-3 text-3xl font-semibold border-b-2 border-solid border-zinc-400 text-zinc-500">Validar Pago </div>
        <input 
          type='number'
          className='w-full p-4 mt-40 mb-20 text-2xl font-medium border-2 border-solid rounded-2xl text-zinc-500 border-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400'
          placeholder='Código de Pago'
          {...register('token', { required: true })}  
        >
        </input>
        <div className="w-full mt-24">
          <button className="w-full bg-[#00C294] hover:bg-[#00C280] font-normal text-xl text-white px-8 py-2 rounded-lg"  onClick={() => handleToken()}>Verificar Codigo</button>
        </div>
      </form>
    </div>
  );
};

export default ValidatePayment;