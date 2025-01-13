import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import Caja from '../pages/Caja';
import GestionDePacientes from '../pages/GestionDePacientes';
import Facturacion from '../pages/Facturacion';
import './App.css'
import ActualizarPacientes from './ActualizarPacientes'


function App() {

  return (
    <Router>
 
      <Routes>

      <Route path="/" element={<LoginPage />} />



     
     
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/dashboard/pacientes" element={<GestionDePacientes />} />
<Route path="/dashboard/facturacion" element={<Facturacion />} />
<Route path="/dashboard/caja" element={<Caja />} />

<Route path="/actualizarPaciente/:id" element={<ActualizarPacientes />} />



   

      

      </Routes>
    </Router>
  )
}

export default App
