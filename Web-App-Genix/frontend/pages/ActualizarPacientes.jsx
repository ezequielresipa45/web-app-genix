import React from 'react'
import { useParams } from 'react-router-dom';

function ActualizarPacientes() {

    const { id } = useParams();


  return (
    <div>

<p>Estás actualizando al paciente con ID: {id}</p>

    </div>
  )
}

export default ActualizarPacientes