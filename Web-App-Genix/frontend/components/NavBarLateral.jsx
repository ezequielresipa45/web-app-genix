import React from 'react'
import styles from '../components/navBarLateral.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHouse,faCashRegister,faChild,faSackDollar} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation  } from "react-router-dom";


function NavBarLateral() {

    const location = useLocation(); // Obtiene la ruta actual

    // Función para verificar si la ruta actual coincide con el path dado
    const isActive = (path) => location.pathname === path;


    const protectedNavigate = (e) => {
        e.preventDefault();

        const clave = prompt("Por favor, introduce la clave");

        clave === "Arenales1658"
          ? navigate("/dashboard/caja")
          : alert("Clave incorrecta. No puede acceder");
      };


  return (
    <nav className={styles.container_nav}>
        <ul>
            <img src="../assets/pngwing.com.png" alt="logo" width={150} />

            <li className={isActive("/dashboard/") ? styles.pintadoVerde : ""}>
            <Link to="/dashboard/"> <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} /> Inicio   </Link>
          </li>

          <li>
            <Link to="/dashboard/pacientes"> <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} />  Pacientes   </Link>
          </li>
          <li className={isActive("/dashboard/facturacion") ? styles.pintadoVerde : ""}>
            <Link to="/dashboard/facturacion"> <FontAwesomeIcon icon={faCashRegister} /> Facturación  </Link>
          </li>
          <li>
            <Link to="/dashboard/proveedores"> <FontAwesomeIcon icon={faChild} /> Proveedores  </Link>
          </li>
            <li>


          <Link onClick={protectedNavigate}> <FontAwesomeIcon icon={faSackDollar} /> CAJA </Link>

        </li>
        </ul>
</nav>
  )
}

export default NavBarLateral