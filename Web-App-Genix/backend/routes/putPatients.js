const express = require('express')
const router = express.Router()
const db = require('../db')


router.put('/actualizarPaciente/:id', (req,res) => {



const {id} = req.params;

const {
    nombre,
    apellido,
    fecha,
    hora,
    tipo_estudio,
    valor_estudio,
    estado_pago,
    forma_pago,
    fecha_pago,
    estado_fc
} = req.body;



const query = `UPDATE pacientes 
SET nombre = ?, apellido = ?, fecha = ?, hora = ?, 
    tipo_estudio = ?, valor_estudio = ?, estado_pago = ?, 
    forma_pago = ?, fecha_pago = ?, estado_fc = ?
WHERE id = ?`;



db.query(
    query,
    [nombre, apellido, fecha, hora, tipo_estudio, valor_estudio, estado_pago, forma_pago, fecha_pago, estado_fc, id],
    (err, result) => {
        if (err) {
            console.error('Error al actualizar el paciente:', err);
            return res.status(500).send('Error al actualizar el paciente.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Paciente no encontrado.');
        }

        res.status(200).send('Paciente actualizado correctamente.');
    }
);




})

module.exports = router