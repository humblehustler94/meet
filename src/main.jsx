import * as atatus from 'atatus-spa'; // <-- ADDED THIS NEW CODE LINE
atatus.config('6ffbfaa9e8ed48f5bf7ada68b4f90c6a').install(); // <-- ADDED THIS NEW CODE LINE

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
