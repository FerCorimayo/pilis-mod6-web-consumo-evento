import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ClientsRegisteredContex = createContext({
  clientRegistered: {},
  setClientRegistered: () => {}
})

export const ClientRegisteredProvider = ({ children }) => {
  const [clientRegistered, setClientRegistered] = useState({});
  const value = { clientRegistered, setClientRegistered };
  return <ClientsRegisteredContex.Provider value={value}>{children}</ClientsRegisteredContex.Provider>;
}

ClientRegisteredProvider.propTypes = {
  children: PropTypes.node.isRequired,
};