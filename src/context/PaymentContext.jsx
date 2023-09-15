import { createContext, useState } from "react";

export const PaymentContext = createContext({
  currentPayment: {},
  setCurrentPayment: () => {},
});

export const PaymentProvider = ({ children }) => {
  const [currentPayment, setCurrentPayment] = useState(null);
  const value = { currentPayment, setCurrentPayment };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};
