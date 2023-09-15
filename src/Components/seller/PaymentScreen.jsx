import React, { useContext, useEffect, useState } from 'react'
import GeneratePayment from './GeneratePayment';
import { PaymentContext } from '../../context/PaymentContext';
import ValidatePayment from './ValidatePayment';
import RegisterPayment from './RegisterPayment';

const PaymentScreen = () => {

    const { currentPayment, setCurrentPayment } = useContext(PaymentContext)

    useEffect(() => {
        setCurrentPayment({
            step: 1,
            amount: 0,
            id_business: null,
            id_wallet: null,
            user_client: null
        })
    }, [])
      
  return (
    <>
        {
            (currentPayment?.step==1)
            ? <GeneratePayment />
            : (currentPayment?.step==2)
            ? <ValidatePayment />
            : <RegisterPayment />
        }
    </>
  )
}

export default PaymentScreen