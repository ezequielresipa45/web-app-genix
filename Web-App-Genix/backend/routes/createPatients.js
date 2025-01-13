const express = require('express')
const router = express.Router()
const db = require('../db')



router.post('/crearPaciente', (req,res) => {


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
    
    
    const query = `INSERT INTO pacientes (nombre, apellido, fecha, hora, tipo_estudio, valor_estudio, estado_pago, forma_pago, fecha_pago, estado_fc)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [nombre, apellido, fecha, hora, tipo_estudio, valor_estudio, estado_pago, forma_pago, fecha_pago, estado_fc], (err, res) => {
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).send("Hubo un error al guardar los datos.");
        }
        res.status(200).send("Datos guardados correctamente.");
      });
    })

    module.exports = router;