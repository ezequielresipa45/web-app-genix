
import styles from './facturacion.module.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';



function Facturacion() {


  const [facturacionGenixTotal, setFacturacionGenixTotal] = useState(0)
  const [facturacionMMCTotal, setFacturacionMMCTotal] = useState(0)



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

      const totalGenix = facturasConNumeros.reduce((sum, factura) => factura.centro === "GENIX" ? sum + factura.importe_facturado : sum, 0);
      setFacturacionGenixTotal(totalGenix);


      const totalMMC = facturasConNumeros.reduce((sum, factura) => factura.centro === "MMC" ? sum + factura.importe_facturado : sum, 0);
      setFacturacionMMCTotal(totalMMC);







    })
      .catch(error => {
        console.error("Error fetching pacientes: ", error)
      })

  }, [])

  console.log(facturas)

  return (
    <div className={styles.containerFacturacion}>

      <h2>Tabla de Facturacion</h2>

      <div className={styles.containerModuleFacturacion}>

        <div className={styles.containerDetallesFacturacion}>

          <p
            onClick={() => handleSort('fecha_emision')}
            style={{ cursor: 'pointer' }}
          >
            FECHA EMISIÓN {sortField === 'fecha_emision' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </p>
          <p>N° DE FACTURA</p>
          <p
            onClick={() => handleSort('paciente')}
            style={{ cursor: 'pointer' }}
          >
            PACIENTE {sortField === 'paciente' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </p>
          <p>TIPO DE ESTUDIO</p>
          <p>IMPORTE </p>
          <p>FORMA DE PAGO</p>
          <p
            onClick={() => handleSort('centro')}
            style={{ cursor: 'pointer' }}
          >
            CENTRO {sortField === 'centro' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </p>

        </div>



        {sortedFacturas && sortedFacturas.map((item, index) => (



          <div className={styles.containerGetFact}>

<p>{item.fecha_emision.toLocaleDateString('es-AR')}</p> {/* Formatea la fecha */}
            <p>{item.numero_fc}</p>
            <p>{item.paciente}</p>
            <p>{item.tipo_estudio}</p>
            <p>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.importe_facturado)}</p>
            <p>{item.forma_pago}</p>
            <p>{item.centro}</p>


          </div>




        ))}





      </div>























      <div className={styles.footerFact}>



        <p>Total Facturado Genix: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionGenixTotal)} </p>
        <p>Total Facturado MMC: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(facturacionMMCTotal)} </p>





      </div>








    </div>
  )
}

export default Facturacion