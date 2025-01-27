import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./proveedores.module.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faCircleArrowLeft   } from '@fortawesome/free-solid-svg-icons';

function Proveedores() {
  const isAuthenticated = () =>
    localStorage.getItem("isAuthenticated") === "true";

  const [enviarProveedores, setEnviarProveedores] = useState({
    fecha_vencimiento: "",
    proveedor: "",
    fc_cliente: "",
    total: 0,
    estado: "pendiente",
  });

  const [getProveedores, setGetProveedores] = useState(null);

  const agregarProveedor = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/crearProveedor",
        enviarProveedores
      );
      console.log("Datos enviados correctamente: ", response.data);
    } catch (error) {
      console.error("Hubo un error al enviar los datos: ", error);
    }

    console.log(enviarProveedores);

    setEnviarProveedores({
      fecha_vencimiento: "",
      proveedor: "",
      fc_cliente: "",
      total: 0,
      estado: "pendiente",
    });
  };

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







  const handleSubmit = async (fc_cliente) => {

    try {
        const response = await fetch(`http://localhost:5001/actualizarProveedor/${fc_cliente}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({estado: 'abonado'}),
        });

        if (!response.ok) throw new Error('Error al actualizar el proveedor');
        alert('proveedor actualizado correctamente');


        window.location.reload()
    } catch (error) {
        console.error(error);
        alert('Hubo un problema al actualizar el proveedor');
    }
  };






















  return isAuthenticated() ? (
    <div className={styles.containerProveedores}>

<a href="/dashboard"><FontAwesomeIcon icon={faCircleArrowLeft} /> Atras</a>
      <h2>Proveedores</h2>

      <form action="">
        <input
        required
          type="date"
          value={enviarProveedores.fecha_vencimiento}
          name="fecha_vencimiento"
          id="fecha_vencimiento"
          onChange={(e) => {
            setEnviarProveedores({
              ...enviarProveedores,
              fecha_vencimiento: e.target.value,
            });
          }}
        />
        <input
        required
          type="text"
          value={enviarProveedores.proveedor}
          name="proveedor"
          id="proveedor"
          placeholder="Proveedor"
          onChange={(e) => {
            setEnviarProveedores({
              ...enviarProveedores,
              proveedor: e.target.value,
            });
          }}
        />
        <input
        required
          type="text"
          value={enviarProveedores.fc_cliente}
          name="fc_cliente"
          id="fc_cliente"
          placeholder="Fc - Cliente"
          onChange={(e) => {
            setEnviarProveedores({
              ...enviarProveedores,
              fc_cliente: e.target.value,
            });
          }}
        />
        <input
        required
          type="number"
          value={enviarProveedores.total}
          name="valor_factura"
          id="valor_factura"
          placeholder="Total"
          onChange={(e) => {
            setEnviarProveedores({
              ...enviarProveedores,
              total: e.target.value,
            });
          }}
        />

        <button onClick={agregarProveedor}>Agregar</button>
      </form>

      {getProveedores &&
        getProveedores.map((p, i) => (
          <div className={styles.containerGetProveedores} key={i}>
            <p>{p.fecha_vencimiento.toLocaleDateString("es-AR")}</p>{" "}
            {/* Formatea la fecha */}
            <p>{p.proveedor}</p>
            <p>{p.fc_cliente}</p>

            <p>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(p.total)}
            </p>
            <p>{p.estado}</p>


                {p.estado === "abonado" ? ''



              :
            <button onClick={()=>handleSubmit(p.fc_cliente)}>ABONAR FC</button> }




          </div>
        ))}
    </div>
  ) : (
    (window.location.href = "/")
  );
}

export default Proveedores;
