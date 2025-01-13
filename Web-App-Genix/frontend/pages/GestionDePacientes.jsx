import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';




function GestionDePacientes() {


const [obtenerPacientesDb, setObtenerPacientesDb] = useState([]); // traer de la db los pacientes





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




const agregarPaciente = async (e) =>{

try{
  const response = await axios.post('http://localhost:5001/crearPaciente',paciente);
  console.log("Datos enviados correctamente: ", response.data)

} catch(error){
  console.error("Hubo un error al enviar los datos: " , error)
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
  
    axios.get('http://localhost:5001/pacientes').then(response=>{

      setObtenerPacientesDb(response.data)


    })
    .catch(error => {
      console.error("Error fetching pacientes: ", error)
    })
  

  }, [])
  


  return (

<>
<div>GestionDePacientes</div>


<div>
<input type="text" value={paciente.nombre} placeholder='Nombre' onChange={(e) => { setPaciente({...paciente, nombre: e.target.value}) }} required />
<input type="text" value={paciente.apellido} placeholder='Apellido' onChange={(e) => { setPaciente({...paciente, apellido: e.target.value}) }} required />
<input type="text" value={paciente.fecha} placeholder='Fecha' onChange={(e) => { setPaciente({...paciente, fecha: e.target.value}) }} required />
<input type="email" value={paciente.hora} placeholder='Hora' onChange={(e) => { setPaciente({...paciente, hora: e.target.value}) }} required />
<input type="text" value={paciente.tipo_estudio} placeholder='Tipo De Estudi' onChange={(e) => { setPaciente({...paciente, tipo_estudio: e.target.value}) }} required />
<input type="text" value={paciente.valor_estudio} placeholder='Valor Estudio' onChange={(e) => { setPaciente({...paciente, valor_estudio: e.target.value}) }} required />
<input type="text" value={paciente.estado_pago} placeholder='Estado De Pago' onChange={(e) => { setPaciente({...paciente, estado_pago: e.target.value}) }} required />
<input type="text" value={paciente.forma_pago} placeholder='Forma de Pago' onChange={(e) => { setPaciente({...paciente, forma_pago: e.target.value}) }} required />
<input type="text" value={paciente.fecha_pago} placeholder='Fecha de Pago' onChange={(e) => { setPaciente({...paciente, fecha_pago: e.target.value}) }} required />
<input type="text" value={paciente.estado_fc} placeholder='Estado Factura' onChange={(e) => { setPaciente({...paciente, estado_fc: e.target.value}) }} required />

<button onClick={agregarPaciente}>Agregar Paciente</button>





</div>



{obtenerPacientesDb.map((p, i) =>(

  <div style={{display:"flex", justifyContent:"space-between"}}>
    <p key={i}>{p.nombre} </p> 
    <p key={i}>{p.apellido} </p>
    <p key={i}>{p.fecha} </p>
    <p key={i}>{p.hora} </p>
    <p key={i}>{p.tipo_estudio} </p>
    <p key={i}>{p.valor_estudio} </p>
    <p key={i}>{p.estado_pago} </p>
    <p key={i}>{p.forma_pago} </p>
    <p key={i}>{p.fecha_pago} </p>
    <p key={i}>{p.estado_fc} </p>
                    <button>
                        <Link to={`/actualizarPaciente/${p.id}`}>Actualizar</Link>
                    </button>

  </div>
 
))}



</>


















  )
}

export default GestionDePacientes