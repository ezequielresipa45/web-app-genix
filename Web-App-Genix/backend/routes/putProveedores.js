const express = require('express')
const router = express.Router()
const db = require('../db')


router.put('/actualizarProveedor/:fc_cliente', (req,res) => {



const {fc_cliente} = req.params;

const {
estado
} = req.body;



const query = `UPDATE proveedores
SET estado = ?
WHERE fc_cliente = ?`;



db.query(
    query,
    [estado, fc_cliente],
    (err, result) => {
        if (err) {
            console.error('Error al actualizar el proveedor:', err);
            return res.status(500).send('Error al actualizar el proveedor.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Proveedor no encontrado.');
        }

        res.status(200).send('Proveedor actualizado correctamente.');
    }
);




})

module.exports = router