import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

function ActualizarPacientes() {

    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

      const fetchPaciente = async () => {
        try{
          const response = await fetch(`http://localhost:5001/pacientes/${id}`);
          if(!response.ok) throw new Error('Error al obtener el paciente');
          const data = await response.json();
          setPaciente(data);
          setLoading(false);
      
        } catch (error){
          console.error(error);
          setLoading(false);
        }
      }
      
      fetchPaciente()
      
  
      
      }, [id])




  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({ ...prev, [name]: value }));
};



// Manejar envío del formulario (PUT)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch(`http://localhost:5001/actualizarPaciente/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paciente),
      });

      if (!response.ok) throw new Error('Error al actualizar el paciente');
      alert('Paciente actualizado correctamente');
      window.location.href = '/dashboard/pacientes'
  } catch (error) {
      console.error(error);
      alert('Hubo un problema al actualizar el paciente');
  }
};

if (loading) return <p>Cargando...</p>;
if (!paciente) return <p>No se encontró el paciente</p>;





  
  return (
    <div>

<p>Estás actualizando al paciente con ID: {id}</p>
<p>Estás actualizando al paciente: {paciente.nombre + " " + paciente.apellido}</p>



<form onSubmit={handleSubmit}>
            <h1>Actualizar Paciente</h1>
            <div>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={paciente.nombre}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="apellido"
                        value={paciente.apellido}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Fecha:
                    <input
                        type="text"
                        name="fecha"
                        value={paciente.fecha}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Hora:
                    <input
                        type="text"
                        name="hora"
                        value={paciente.hora}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tipo de Estudio:
                    <input
                        type="text"
                        name="tipo_estudio"
                        value={paciente.tipo_estudio}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Valor del Estudio:
                    <input
                        type="number"
                        name="valor_estudio"
                        value={paciente.valor_estudio}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Estado de Pago:
                    <input
                        type="text"
                        name="estado_pago"
                        value={paciente.estado_pago}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Forma de Pago:
                    <input
                        type="text"
                        name="forma_pago"
                        value={paciente.forma_pago}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Fecha de Pago:
                    <input
                        type="text"
                        name="fecha_pago"
                        value={paciente.fecha_pago}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Estado de Factura:
                    <input
                        type="text"
                        name="estado_fc"
                        value={paciente.estado_fc}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <button type="submit">Actualizar</button>
        </form>
















    </div>
  )
}

export default ActualizarPacientes