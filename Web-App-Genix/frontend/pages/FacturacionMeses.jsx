import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from './facturacionMeses.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleArrowLeft   } from '@fortawesome/free-solid-svg-icons';




function FacturacionMeses({ mes }) {



  const [facturas, setFacturas] = useState(null)


    const [facturacionGenixTotal, setFacturacionGenixTotal] = useState(0)
    const [facturacionMMCTotal, setFacturacionMMCTotal] = useState(0)


    const [facturacionGenixPesos, setFacturacionGenixPesos] = useState(0)
    const [facturacionMMCPesos, setFacturacionMMCPesos] = useState(0)
  
    const [facturacionGenixDolares, setFacturacionGenixDolares] = useState(0)
    const [facturacionMMCDolares, setFacturacionMMCDolares] = useState(0)



  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

  let valorMes = ''

  for (let i = 0; i < meses.length; i++) {

    if (meses[i] === mes) {

      valorMes = i + 1

    } else {

    }

  }





  useEffect(() => {

    axios.get(`http://localhost:5001/facturas/${valorMes}`).then(response => {

      const facturasConNumeros = response.data.map(factura => ({
        ...factura,
        importe_facturado: Number(factura.importe_facturado), // Usa Number o parseFloat
        fecha_emision: new Date(factura.fecha_emision), // Convierte a Date si no está ya
      }));


      setFacturas(facturasConNumeros)
      console.log(valorMes)



      const totalGenix = facturasConNumeros.reduce((sum, factura) => factura.centro === "GENIX" && factura.forma_pago !== "DOLARES"  ? sum + factura.importe_facturado : sum, 0);
      setFacturacionGenixTotal(totalGenix);

      const totalMMC = facturasConNumeros.reduce((sum, factura) => factura.centro === "MMC" && factura.forma_pago !== "DOLARES" ? sum + factura.importe_facturado : sum, 0);
      setFacturacionMMCTotal(totalMMC);


      const totalGenixPesos = facturasConNumeros.reduce((sum,factura)=>factura.centro === "GENIX" && factura.forma_pago === "EFECTIVO" ? sum + factura.importe_facturado : sum,0)
      setFacturacionGenixPesos(totalGenixPesos);

      const totalMMCPesos = facturasConNumeros.reduce((sum,factura)=>factura.centro === "MMC" && factura.forma_pago === "EFECTIVO" ? sum + factura.importe_facturado : sum,0)
      setFacturacionMMCPesos(totalMMCPesos);

      const totalGenixDolares = facturasConNumeros.reduce((sum,factura)=>factura.centro === "GENIX" && factura.forma_pago === "DOLARES" ? sum + factura.importe_facturado : sum,0)
      setFacturacionGenixDolares(totalGenixDolares);

      const totalMMCDolares = facturasConNumeros.reduce((sum,factura)=>factura.centro === "MMC" && factura.forma_pago === "DOLARES" ? sum + factura.importe_facturado : sum,0)
      setFacturacionMMCDolares(totalMMCDolares);




    })
      .catch(error => {
        console.error("Error fetching pacientes: ", error)
      })

  }, [mes])


  useEffect(() => {

    console.log(facturas)
  }, [facturas])


  return (


    <>








<div>

<Link to={'/dashboard/facturacion'}> <FontAwesomeIcon icon={faCircleArrowLeft} /> ATRAS</Link>
    <h2>{mes.toUpperCase()}</h2>
</div>





<div className={styles.footerFact}>


<div>
  <p>Total Facturado</p>
  <p>Genix</p>
  <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionGenixTotal)}</p>
  <p>Total Efectivo: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionGenixPesos)}</p>
  <p>Total Dolares: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(facturacionGenixDolares)}</p>
</div>

<div>
  <p>Total Facturado</p>
  <p>MMC</p>
  <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionMMCTotal)} </p>
  <p>Total Efectivo: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionMMCPesos)}</p>
  <p>Total Dolares: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(facturacionMMCDolares)}</p>


</div>






</div>















      <div className={styles.containerModuleFacturacion}>

        <div className={styles.containerDetallesFacturacion}>
          <p>Fecha Emisión</p>
          <p>N° De Factura</p>
          <p>Paciente </p>
          <p>Tipo De Estudio</p>
          <p>Importe </p>
          <p>Forma De Pago</p>
          <p>Centro</p>
        </div>



        { facturas && facturas.map((f, i) => 
          ( f.fecha_emision.getFullYear() === 2025 ? (

            <div key={i} className={styles.containerGetFact}>
              <p>{f.fecha_emision.toLocaleDateString('es-AR')}</p> {/* Formatea la fecha */}
              <p>{f.numero_fc}</p>
              <p>{f.paciente}</p>
              <p>{f.tipo_estudio}</p>
              <p>{f.forma_pago === "DOLARES" ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(f.importe_facturado)
                : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(f.importe_facturado)}</p>
              <p>{f.forma_pago}</p>
              <p>{f.centro}</p>
            </div>

) : null

))}


      </div>






















    </>


  )
}

export default FacturacionMeses