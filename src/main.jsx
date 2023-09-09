import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { ClientRegisteredProvider } from "./Components/client/ClientRegisteredContext"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClientRegisteredProvider>
    <App />
    </ClientRegisteredProvider>
  </React.StrictMode>,
)
