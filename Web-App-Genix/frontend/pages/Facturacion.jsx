
import styles from './facturacion.module.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faCircleArrowLeft   } from '@fortawesome/free-solid-svg-icons';



function Facturacion() {

  const [facturacionGenixTotal, setFacturacionGenixTotal] = useState(0)
  const [facturacionMMCTotal, setFacturacionMMCTotal] = useState(0)



  const [facturacionGenixPesos, setFacturacionGenixPesos] = useState(0)
  const [facturacionMMCPesos, setFacturacionMMCPesos] = useState(0)

  const [facturacionGenixDolares, setFacturacionGenixDolares] = useState(0)
  const [facturacionMMCDolares, setFacturacionMMCDolares] = useState(0)


  const [facturas, setFacturas] = useState(null)

  const [sortedFacturas, setSortedFacturas] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // asc o desc para manejar el orden
  const [sortField, setSortField] = useState(null);  // Campo actual de orden


  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'; // Alterna el orden si el campo es el mismo
    const sorted = [...sortedFacturas].sort((a, b) => {

      if (field === 'fecha_emision') {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      else {


        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;



      }




    });

    setSortedFacturas(sorted);
    setSortOrder(order);
    setSortField(field); // Actualiza el campo actual
  };









  useEffect(() => {

    axios.get('http://localhost:5001/facturas').then(response => {

      const facturasConNumeros = response.data.map(factura => ({
        ...factura,
        importe_facturado: Number(factura.importe_facturado), // Usa Number o parseFloat
        fecha_emision: new Date(factura.fecha_emision), // Convierte a Date si no está ya
      }));


      setFacturas(facturasConNumeros)
      setSortedFacturas(facturasConNumeros); // Sincroniza con el estado ordenado


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

  }, [])



  const currentDate = new Date();
const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate).toUpperCase();


const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']


const [caja, setCaja] = useState(0)


const [retirosDolares, setRetirosDolares] = useState([]);


useEffect(() => {
  axios
    .get('http://localhost:5001/cajas')
    .then(response => {
      const cajas = response.data.map(caja => ({
        ...caja,
        importe: Number(caja.importe) // Asegurarse de que el importe es numérico
      }));

      // Filtrar y calcular los totales
      const cajasFiltradas = cajas.filter(caja => caja.detalle !== 'RETIRO DE DOLARES');
      const totalCaja = cajasFiltradas.reduce((total, caja) => total + caja.importe, 0);

      const totalRetiros = cajas
        .filter(caja => caja.detalle === 'RETIRO DE DOLARES')
        .reduce((total, caja) => total + caja.importe, 0);

      // Actualizar estados
      setCaja(totalCaja); // Total de los que no son "RETIRO DE DOLARES"
      setRetirosDolares(totalRetiros); // Array de importes de "RETIRO DE DOLARES"

      console.log('Total Caja:', totalCaja);
      console.log('Retiros de Dólares:', totalRetiros);
    })
    .catch(error => {
      console.error('Error fetching cajas:', error);
    });
}, []);













  return (
    <div className={styles.containerFacturacion}>


<div className={styles.containerTitulo}>
    <a href="/dashboard"><FontAwesomeIcon icon={faCircleArrowLeft} /> Atras</a>


      <h2><FontAwesomeIcon icon={faFileInvoiceDollar} /> Tabla de Facturacion</h2>


</div>

<div className={styles.containerFacturacionMeses}>


{meses.map((a,i)=>(

  <Link key={i} className={styles.link} to={`/dashboard/facturacion/${a}`}>{a}</Link>


))}




</div>




<div className={styles.footerFact}>




{/* <div>
  <p>Total Facturado</p>
  <p>Genix</p>
  <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionGenixTotal)}</p>
  <p>Total Efectivo: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionGenixPesos)}</p>
  <p>Total Dolares: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(facturacionGenixDolares)}</p>
</div> */}




  <div className={styles.containerFacturacionTotal}>

    <h3>EFECTIVO TOTAL: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionGenixPesos + facturacionMMCPesos - caja)}</h3>

      <h3>USD TOTAL: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(facturacionGenixDolares)} </h3>
      <h3>EGRESOS: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(caja)}</h3>
      <h3>RETIRO DOLARES DE GENIX: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(retirosDolares)}</h3>




  </div>





{/* <div>
  <p>Total Facturado</p>
  <p>MMC</p>
  <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionMMCTotal)} </p>
  <p>Total Efectivo: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionMMCPesos)}</p>
  <p>Total Dolares: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(facturacionMMCDolares)}</p>


</div> */}






</div>


      <div className={styles.containerModuleFacturacion}>

        <div className={styles.containerDetallesFacturacion}>

          <p
            onClick={() => handleSort('fecha_emision')}
            style={{ cursor: 'pointer' }}
          >
            Fecha Emisión {sortField === 'fecha_emision' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </p>
          <p>N° De Factura</p>
          <p
            onClick={() => handleSort('paciente')}
            style={{ cursor: 'pointer' }}
          >
            Paciente {sortField === 'paciente' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </p>
          <p>Tipo De Estudio</p>
          <p>Importe </p>
          <p>Forma De Pago</p>
          <p
            onClick={() => handleSort('centro')}
            style={{ cursor: 'pointer' }}
          >
            Centro {sortField === 'centro' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </p>

        </div>



        {sortedFacturas && sortedFacturas.map((item, index) => (



          <div key={index} className={styles.containerGetFact}>

            <p>{item.fecha_emision.toLocaleDateString('es-AR')}</p> {/* Formatea la fecha */}
            <p>{item.numero_fc}</p>
            <p>{item.paciente}</p>
            <p>{item.tipo_estudio}</p>
            <p>{item.forma_pago === "DOLARES" ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.importe_facturado)
                 :new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.importe_facturado)}</p>
            <p>{item.forma_pago}</p>
            <p>{item.centro}</p>


          </div>




        ))}





      </div>
































    </div>
  )
}

export default Facturacion