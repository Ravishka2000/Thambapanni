import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if ( process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </React.StrictMode>
    </BrowserRouter>
)
