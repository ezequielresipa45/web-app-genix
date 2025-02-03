import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import Caja from '../pages/Caja';
import GestionDePacientes from '../pages/GestionDePacientes';
import Facturacion from '../pages/Facturacion';
import './App.css'
import ActualizarPacientes from '../pages/ActualizarPacientes';
import FacturarPaciente from '../pages/FacturarPaciente';
import FacturacionMeses from '../pages/FacturacionMeses';
import Proveedores from '../pages/Proveedores';
import FacturasPdf from '../pages/facturasPdf';


function App() {

const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']


  return (
    <Router>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/pacientes" element={<GestionDePacientes />} />
        <Route path="/dashboard/facturacion" element={<Facturacion />} />
        <Route path="/dashboard/proveedores" element={<Proveedores />} />
        <Route path="/dashboard/caja" element={<Caja />} />
        <Route path={`/dashboard/facturacion/${meses}`} element={<FacturasPdf />} />


        {meses.map((meses, index)=>(


          <Route key={index} path={`/dashboard/facturacion/${meses}`} element={<FacturacionMeses mes = {meses}  />} />





        ))}


        <Route path="/actualizarPaciente/:id" element={<ActualizarPacientes />} />
        <Route path="/facturarPaciente/:id" element={<FacturarPaciente />} />







      </Routes>
    </Router>
  )
}

export default App
