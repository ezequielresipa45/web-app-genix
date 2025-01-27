import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './caja.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft   } from '@fortawesome/free-solid-svg-icons';


function Caja() {




  const [caja, setCaja] = useState({
    fecha: '',
    detalle: '',
    importe: ''
  })


  const [getCaja, setGetCaja] = useState(null)






  const agregarCaja = async () => {

    try {
      const response = await axios.post('http://localhost:5001/crearCaja', caja);
      console.log("Datos enviados correctamente: ", response.data)

    } catch (error) {
      console.error("Hubo un error al enviar los datos: ", error)
    }


    console.log(caja)

    setCaja({
      fecha: '',
      detalle: '',
      importe: ''
    });



    window.location.reload()


  }





  useEffect(() => {



    axios.get('http://localhost:5001/cajas').then(response => {

      const cajaConNumeros = response.data.map(caja => ({
        ...caja,
        fecha: new Date(caja.fecha), // Convierte a Date si no está ya
        importe: Number(caja.importe), // Usa Number o parseFloat


      }));

      setGetCaja(cajaConNumeros)

    }).catch(error => {
      console.error("Error fetching pacientes: ", error)
    })


  }, [])



  const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';

  return (


    isAuthenticated() ?

    <div className={styles.containerCaja}>











      <h2 className={styles.containerH2}><a href="/dashboard"><FontAwesomeIcon icon={faCircleArrowLeft} /> Atras</a> Egresos Caja Grande</h2>

<div className={styles.containerForm}>


        <input type="date" value={caja.fecha} placeholder='Fecha' onChange={(e) => { setCaja({ ...caja, fecha: e.target.value }) }} required />
        <input type="text" value={caja.detalle} placeholder='Detalle' onChange={(e) => { setCaja({ ...caja, detalle: e.target.value }) }} required />



        <input type="text" value={`$${caja.importe.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}  placeholder='Importe' onChange={(e) => {  const inputValue = e.target.value.replace(/\D/g, "");  setCaja({ ...caja, importe: inputValue }) }} required />

        <button onClick={agregarCaja}>Agregar</button>
</div>





        <div className={styles.barraDetalles}>
          <p>FECHA</p>

          <p>DETALLE</p>
          <p>VALOR</p>
        </div>

        {getCaja && getCaja.map((c, i) => (



          <div className={styles.containerDetallesCajas} key={i}>


            <p>{c.fecha.toLocaleDateString('es-AR')}</p> {/* Formatea la fecha */}

            <p>{c.detalle}</p>
            <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(c.importe)}</p>


          </div>





        ))}


          <h4>Total: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(getCaja && getCaja.reduce((total, item) => total + item.importe, 0))}</h4>






















    </div>

    : window.location.href = '/'

  )
}

export default Caja