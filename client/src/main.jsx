import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchContextProvider } from './context/Searchcontext'
import {  AuthContextProvider } from './context/Authcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <SearchContextProvider>
    <App />
  </SearchContextProvider>
  </AuthContextProvider>
  
)
