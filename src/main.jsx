import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ClientRegisteredProvider } from './context/ClientRegisteredContext'
import { PaymentProvider } from './context/PaymentContext'

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <ClientRegisteredProvider>
        <PaymentProvider>
          <App />
        </PaymentProvider>
      </ClientRegisteredProvider>
    </AuthProvider>

)
