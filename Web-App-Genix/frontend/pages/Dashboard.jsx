import React, {useEffect} from 'react'

import { Link, useNavigate } from 'react-router-dom';




function Dashboard() {


    const navigate = useNavigate();
    

    const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';    

const closeSesion = ()=> {

if (!isAuthenticated()) {
    
    navigate('/')
    
}else{localStorage.removeItem('isAuthenticated');  navigate('/')}



}



    return (
        isAuthenticated() ?
        <>
            <h1>Dashboard</h1>
            <p>Bienvenido al panel administrativo</p>


                <nav style={{ width: '200px', padding: '20px', background: '#f4f4f4' }}>
                    <ul>
                        <li><Link to="/dashboard/pacientes">Pacientes</Link></li>
                        <li><Link to="/dashboard/facturacion">Facturación</Link></li>
                        <li><Link to="/dashboard/caja">Caja</Link></li>
                    </ul>
                </nav>
            <div>


            <button onClick={closeSesion}>Cerrar Sesion</button>


            </div>


        </>

        : window.location.href ='/'
    )
} 

export default Dashboard