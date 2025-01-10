import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import './App.css'



function App() {



  return (
    <Router>
 
      <Routes>


        {/*Ruta de Login*/}
        <Route path="/" element={<LoginPage />} />

        {/*Ruta de Dashboard*/}
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  )
}

export default App
