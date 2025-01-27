
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft   } from '@fortawesome/free-solid-svg-icons';


function FacturarPaciente() {





const { id } = useParams();
    const [paciente, setPaciente] = useState(null);


    const [pacienteFacturar, setPacienteFacturar] = useState(

      {   fecha_emision:'',
          numero_fc:'',
          tipo_estudio:'',
          importe_facturado:'',
          forma_pago:'',
          centro:'',
          paciente:''}
      )






    useEffect(() => {

      const fetchPaciente = async () => {
        try{
          const response = await fetch(`http://localhost:5001/pacientes/${id}`);
          if(!response.ok) throw new Error('Error al obtener el paciente');
          const data = await response.json();
          setPaciente(data);


          setPacienteFacturar((prev) => ({
            ...prev,
            paciente: `${data.nombre} ${data.apellido}`,
            forma_pago: data.forma_pago || '',
            importe_facturado: data.valor_estudio || '',
            tipo_estudio: data.tipo_estudio || '',
          }));



        } catch (error){
          console.error(error);
          setLoading(false);
        }
      }

      fetchPaciente()


      }, [id])



    const facturar = async (e) => {

        try {
          const response = await axios.post('http://localhost:5001/crearFactura', pacienteFacturar);
          console.log("Datos enviados correctamente: ", response.data)

        } catch (error) {
          console.error("Hubo un error al enviar los datos: ", error)
        }

        setPacienteFacturar({
            fecha_emision:'',
            numero_fc:'',
            tipo_estudio: '',
            importe_facturado:'',
            forma_pago:'',
            centro:'',
            paciente:'',
        });

    console.log(pacienteFacturar)
        window.location.reload()
        window.location.href = '/dashboard/pacientes'


      }






  return (
    <div>
<a href="/dashboard"><FontAwesomeIcon icon={faCircleArrowLeft} /> Atras</a>
            <h2>Datos del Paciente</h2>




            { paciente &&




            <div >









<input type="date" value={pacienteFacturar.fecha_emision} placeholder='Fecha Emision' onChange={(e) => { setPacienteFacturar({ ...pacienteFacturar, fecha_emision: e.target.value }) }} required />

<input type="text" value={pacienteFacturar.numero_fc} placeholder='Numero de Factura' onChange={(e) => { setPacienteFacturar({ ...pacienteFacturar, numero_fc: e.target.value }) }} required />

<input type="text" value={`${paciente.nombre} ${paciente.apellido}`}  placeholder='Paciente'  required readOnly />


<input type="email"   value={paciente.tipo_estudio}  placeholder='Tipo De Estudio' readOnly required />

<input type="text"   value={paciente.valor_estudio} placeholder='Importe Facturado' readOnly required />

<input type="text"value={ paciente.forma_pago}  placeholder='Forma De Pago' readOnly required />



{/* <input type="text" value={pacienteFacturar.centro} placeholder='Centro' onChange={(e) => { setPacienteFacturar({ ...pacienteFacturar, centro: e.target.value }) }} required /> */}



<select
  value={pacienteFacturar.centro}
  onChange={(e) => { setPacienteFacturar({ ...pacienteFacturar, centro: e.target.value }) }}
  required
>
  <option value="" disabled>Seleccionar Centro</option>
  <option value="GENIX">GENIX</option>
  <option value="MMC">MMC</option>
  <option value="CDTP">CDTP</option>
  <option value="TEC">TEC</option>
</select>


<button onClick={facturar}>Facturar </button>


</div>




}


















        </div>
  )
}

export default FacturarPaciente