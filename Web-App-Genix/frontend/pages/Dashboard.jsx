import React, { useState, useEffect} from 'react'
import styles from './dashboard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';





function Dashboard() {



    const obtenerFechaHoy = () => {
      const hoy = new Date();
      const año = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const dia = String(hoy.getDate()).padStart(2, '0'); // Asegura dos dígitos
    
      return `${año}-${mes}-${dia}`;
    };
    
    
    


    const navigate = useNavigate();


    const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';

    const closeSesion = () => {

        if (!isAuthenticated()) {

            navigate('/')

        } else { localStorage.removeItem('isAuthenticated'); navigate('/') }



    }



    const [pacientes, setPacientes] = useState(null)



    useEffect(() => {
  
        axios.get('http://localhost:5001/pacientes').then(response=>{
    
            setPacientes(response.data.filter(p => p.fecha === obtenerFechaHoy()))
    
    
        })
        .catch(error => {
          console.error("Error fetching pacientes: ", error)
        })
      
    
      }, [])



      useEffect(() => {
          console.log(pacientes)

      }, [pacientes])
      





    return (
        isAuthenticated() ?
            <>
                <h1>Dashboard</h1>
                <p>Bienvenido al panel administrativo</p>


                <nav className={styles.container_nav}>
                    <ul>
                        <li><Link to="/dashboard/pacientes" >Pacientes</Link></li>
                        <li><Link to="/dashboard/facturacion">Facturación</Link></li>
                        <li><Link to="/dashboard/caja">Caja</Link></li>
                    </ul>
                </nav>
                <div>


                    <button onClick={closeSesion}>Cerrar Sesion</button>




                    <div>


<h2>Pacientes al día de hoy: {obtenerFechaHoy()}</h2>
                    
                    {pacientes && pacientes.map((p, i) =>(
                    
                    
                    
                    
                    
                    <div  key={i} className= {styles.containerPacientesHoy}>
                    
                    <p >{p.nombre} </p> 
  <p >{p.apellido} </p>
  <p >{p.fecha} </p>
  <p >{p.hora} </p>
  <p >{p.tipo_estudio} </p>
  <p >{p.valor_estudio} </p>
  <p >{p.estado_pago} </p>
  <p >{p.forma_pago} </p>
  <p >{p.fecha_pago} </p>
  <p >{p.estado_fc} </p>
                  
                    
                    </div>
                    
                    ))}


                    </div>


               


                </div>


            </>

            : window.location.href = '/'
    )
}

export default Dashboard