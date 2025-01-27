import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong,faHospitalUser,faCashRegister,faChild,faSackDollar} from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
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

  const protectedNavigate = (e) => {
    e.preventDefault();

    const clave = prompt("Por favor, introduce la clave");

    clave === "Arenales1658"
      ? navigate("/dashboard/caja")
      : alert("Clave incorrecta. No puede acceder");
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

  return isAuthenticated() ? (
    <div className={styles.containerDashboard}>


<div className={styles.main}>

      <p>Bienvenido al panel administrativo</p>
        <button onClick={closeSesion}>Cerrar Sesion</button>

</div>







<div className={styles.containerGENERAL}>



<nav className={styles.container_nav}>
        <ul>
            <p>Dashboard</p>

          <li>
            <Link to="/dashboard/pacientes"> <FontAwesomeIcon icon={faHospitalUser} />  Pacientes  <FontAwesomeIcon icon={faArrowRightLong} /> </Link>
          </li>
          <li>
            <Link to="/dashboard/facturacion"> <FontAwesomeIcon icon={faCashRegister} /> Facturación  <FontAwesomeIcon icon={faArrowRightLong} /></Link>
          </li>
          <li>
            <Link to="/dashboard/proveedores"> <FontAwesomeIcon icon={faChild} /> Proveedores  <FontAwesomeIcon icon={faArrowRightLong} /></Link>
          </li>
<li>


          <Link onClick={protectedNavigate}> <FontAwesomeIcon icon={faSackDollar} /> CAJA  <FontAwesomeIcon icon={faArrowRightLong} /></Link>

</li>
        </ul>
      </nav>



        <div className={styles.containerDetallesPacientesProveedores}>
          <h2>Pacientes al día de hoy: {obtenerFechaHoy()}</h2>
{console.log( pacientes && pacientes.length)}
          {pacientes && pacientes.length > 0 ?
            pacientes.map((p, i) => (
              <div key={i} className={styles.containerPacientesHoy}>
                <p>{p.nombre} </p>
                <p>{p.apellido} </p>
                <p>{p.fecha} </p>
                <p>{p.hora} </p>
                <p>{p.tipo_estudio} </p>
                <p>{p.valor_estudio} </p>
                <p>{p.estado_pago} </p>
                <p>{p.forma_pago} </p>
                <p>{p.fecha_pago} </p>
                <p>{p.estado_fc} </p>
              </div>
            )) : (<p>No hay pacientes HOY</p>
            )}


<h3>
    FACTURAS PROVEEDORES VENCIMIENTO HOY
</h3>
      {getProveedores &&
        getProveedores.map((p, i) => {
          const fechaVencimiento = new Date(
            p.fecha_vencimiento
          ).toLocaleDateString("es-AR");
          const fechaActual = new Date(dateActual).toLocaleDateString("es-AR");

          return fechaVencimiento === fechaActual && p.estado !== 'ABONADO' ? (
            <div className={styles.containerProveedores} key={i}>
              {" "}
              <p>{p.fecha_vencimiento.toLocaleDateString("es-AR")}</p>{" "}
            {/* Formatea la fecha */}
            <p>{p.proveedor}</p>
            <p>{p.fc_cliente}</p>

            <p>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(p.total)}
            </p>{" "}
            </div>
          ) : null;
        })}





</div>








</div>









    </div>
  ) : (
    (window.location.href = "/")
  );
}

export default Dashboard;
