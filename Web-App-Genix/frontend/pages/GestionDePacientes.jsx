import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './pacientes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPen,faFileInvoiceDollar,faUserPlus   } from '@fortawesome/free-solid-svg-icons';



function GestionDePacientes() {




  const [obtenerPacientesDb, setObtenerPacientesDb] = useState([]); // traer de la db los pacientes





  const [sortedStateFactura, setSortedStateFactura] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // asc o desc para manejar el orden




  const handleSort = ()=>{

    const order = sortOrder === 'asc' ? 'desc' : 'asc'; // Alterna el orden si el campo es el mismo
    const sorted = [...sortedStateFactura].sort((a, b) => {




        if (a.estado_fc  < b.estado_fc ) return order === 'asc' ? -1 : 1;
        if (a.estado_fc  > b.estado_fc ) return order === 'asc' ? 1 : -1;
        return 0;



      })


      setSortedStateFactura(sorted);
      setSortOrder(order);



  }



  const [paciente, setPaciente] = useState({
    nombre: '',
    apellido: '',
    fecha: '',
    hora: '',
    tipo_estudio: '',
    valor_estudio: '',
    estado_pago: '',
    forma_pago: '',
    fecha_pago: '',
    estado_fc: '',
  })




  const agregarPaciente = async (e) => {

    try {
      const response = await axios.post('http://localhost:5001/crearPaciente', paciente);
      console.log("Datos enviados correctamente: ", response.data)

    } catch (error) {
      console.error("Hubo un error al enviar los datos: ", error)
    }

    setPaciente({
      nombre: '',
      apellido: '',
      fecha: '',
      hora: '',
      tipo_estudio: '',
      valor_estudio: '',
      estado_pago: '',
      forma_pago: '',
      fecha_pago: '',
      estado_fc: '',
    });


    window.location.reload()



  }


  useEffect(() => {

    axios.get('http://localhost:5001/pacientes').then(response => {

      const data = response.data.map(paciente => ({ ...paciente }));
      setObtenerPacientesDb(data);
      setSortedStateFactura(data); // Sincroniza con el estado inicial

    })
      .catch(error => {
        console.error("Error fetching pacientes: ", error)
      })


  }, [])




  const on = {

    display: "inline-block"

  }

  const off = {
    display: "none"
  }


  const [encender, setEncender] = useState(false)


  const mostrarModalPacientes = () => { encender ? setEncender(false) : setEncender(true) }





  const handleEliminar = async (id) => {

    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este paciente?');

    if (confirmar) {
      try {
        const response = await axios.delete(`http://localhost:5001/eliminarPacientes/${id}`);
        alert(response.data);
        window.location.reload()

      } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        alert('Hubo un problema al intentar eliminar el paciente.');
      }
    }


  }







  return (

    <>

      <div className={styles.containerPadre}>


        <div className={styles.containerButtonyH1}>
        <h1>Tabla de Pacientes</h1>
        <button onClick={mostrarModalPacientes} >  <FontAwesomeIcon icon={faUserPlus} /> Agregar Paciente</button>

        </div>




  


          <div style={encender ? on : off}>


            <input type="text" value={paciente.nombre} placeholder='Nombre' onChange={(e) => { setPaciente({ ...paciente, nombre: e.target.value }) }} required />
            <input type="text" value={paciente.apellido} placeholder='Apellido' onChange={(e) => { setPaciente({ ...paciente, apellido: e.target.value }) }} required />
            <input type="text" value={paciente.fecha} placeholder='Fecha' onChange={(e) => { setPaciente({ ...paciente, fecha: e.target.value }) }} required />
            <input type="email" value={paciente.hora} placeholder='Hora' onChange={(e) => { setPaciente({ ...paciente, hora: e.target.value }) }} required />
            <input type="text" value={paciente.tipo_estudio} placeholder='Tipo De Estudi' onChange={(e) => { setPaciente({ ...paciente, tipo_estudio: e.target.value }) }} required />
            <input type="text" value={paciente.valor_estudio} placeholder='Valor Estudio' onChange={(e) => { setPaciente({ ...paciente, valor_estudio: e.target.value }) }} required />
            <input type="text" value={paciente.estado_pago} placeholder='Estado De Pago' onChange={(e) => { setPaciente({ ...paciente, estado_pago: e.target.value }) }} required />
            <input type="text" value={paciente.forma_pago} placeholder='Forma de Pago' onChange={(e) => { setPaciente({ ...paciente, forma_pago: e.target.value }) }} required />
            <input type="text" value={paciente.fecha_pago} placeholder='Fecha de Pago' onChange={(e) => { setPaciente({ ...paciente, fecha_pago: e.target.value }) }} required />
            <input type="text" value={paciente.estado_fc} placeholder='Estado Factura' onChange={(e) => { setPaciente({ ...paciente, estado_fc: e.target.value }) }} required />

            <button onClick={agregarPaciente}>Agregar</button>


          </div>







       










        <div className={styles.containerPacientesPadre}>
        <div className={styles.container_tabla}>

        <p >Nombre </p>
          <p >Apellido </p>
          <p >Fecha </p>
          <p >Hora </p>
          <p >Estudio</p>
          <p >Valor</p>
          <p >Estado Pago</p>
          <p >Forma Pago</p>
          <p >Fecha Pago</p>
          <p
            onClick={() => handleSort()}
            style={{ cursor: 'pointer' }}
          >
            Estado Factura {sortOrder === 'asc' ? '↑' : '↓'}
          </p>
          <p >Acciones </p>
          

          </div>









          {sortedStateFactura && sortedStateFactura.map((p, i) => (


p.estado_fc !== "EMITIDA" &&


            <div key={i} className={styles.container_pacientes}>

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



<div className={styles.containerButtons}>
<button  title="Actualizar" >
                <Link to={`/actualizarPaciente/${p.id}`}><FontAwesomeIcon icon={faPen} /></Link>
              </button>
              <button  title="Eliminar" onClick={() => handleEliminar(p.id)}>
              <FontAwesomeIcon icon={faTrash} />
              </button>


              {p.estado_pago === 'ABONADO' &&
                <button  title="Facturación" >
                  <Link to={`/facturarPaciente/${p.id}`}><FontAwesomeIcon icon={faFileInvoiceDollar} /></Link>
                </button>}
                


</div>







            </div>

          ))}



        </div>





      </div>
    </>


















  )
}

export default GestionDePacientes