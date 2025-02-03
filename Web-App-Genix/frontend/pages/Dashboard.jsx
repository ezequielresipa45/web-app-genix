import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHouse,faCashRegister,faChild,faSackDollar,faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import NavBarLateral from "../components/navBarLateral";

function Dashboard() {


    const location = useLocation(); // Obtiene la ruta actual

    // Función para verificar si la ruta actual coincide con el path dado
    const isActive = (path) => location.pathname === path;


  const dateActual = new Date();

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const dia = String(hoy.getDate()).padStart(2, "0"); // Asegura dos dígitos

    return `${año}-${mes}-${dia}`;
  };

  const navigate = useNavigate();

  const isAuthenticated = () =>
    localStorage.getItem("isAuthenticated") === "true";

  const closeSesion = () => {
    if (!isAuthenticated()) {
      navigate("/");
    } else {
      localStorage.removeItem("isAuthenticated");
      navigate("/");
    }
  };



  const [pacientes, setPacientes] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/pacientes")
      .then((response) => {
        setPacientes(
          response.data.filter((p) => p.fecha === obtenerFechaHoy())
        );
      })
      .catch((error) => {
        console.error("Error fetching pacientes: ", error);
      });
  }, []);

  const [getProveedores, setGetProveedores] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/getProveedores")
      .then((response) => {
        const proveedoresConNumeros = response.data.map((proveedores) => ({
          ...proveedores,
          fecha_vencimiento: new Date(proveedores.fecha_vencimiento), // Convierte a Date si no está ya
          total: Number(proveedores.total), // Usa Number o parseFloat
        }));

        setGetProveedores(proveedoresConNumeros);
      })
      .catch((error) => {
        console.error("Error fetching: ", error);
      });
  }, []);



  let arrayImagenes = ['../assets/avatar_1.png','../assets/avatar_2.png','../assets/avatar_3.png','../assets/avatar_4.png','../assets/avatar_5.png','../assets/avatar_6.png','../assets/avatar_7.png','../assets/avatar_8.png','../assets/avatar_9.png',]




/**************************************************************************************************** */






  return isAuthenticated() ? (



    <div className={styles.containerDashboard}>










<div className={styles.containerGENERAL}>






<NavBarLateral/>




        <div className={styles.containerDetallesPacientesProveedores}>



        <div className={styles.main}>

  <button onClick={closeSesion}> Cerrar Sesion <FontAwesomeIcon icon={faCircleXmark} style={{color: "#a7372f",}} /> </button>

  </div>












          <h2>Pacientes</h2>
          <h4>Total de pacientes: {pacientes && pacientes.length}</h4>



{pacientes &&

<div className={styles.titleVar}>



<p>Datos paciente</p>
<p>Visita</p>
<p>Estudio</p>
<p>Estado de pago</p>

</div>




}




            {console.log( pacientes && pacientes.length)}
          {pacientes && pacientes.length > 0 ?
            pacientes.map((p, i) => (
              <div key={i} className={styles.containerPacientesHoy}>



<div>

                <img src={arrayImagenes[i]} alt="persona" width={'50px'} />
                <p>{p.nombre} {p.apellido} </p>

</div>
                <p>{p.fecha} || {p.hora}hs </p>
                <p>{p.tipo_estudio} </p>
                <p className={p.estado_pago === 'ABONADO' ? styles.abonado : styles.pendiente}>{p.estado_pago} </p>
              </div>
            )) : ('')}







</div>








</div>









    </div>
  ) : (
    (window.location.href = "/")
  );
}

export default Dashboard;
