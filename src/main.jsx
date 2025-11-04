
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/AuthProvider.jsx'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App/>
    <Analytics/>
  </AuthProvider>,
)
