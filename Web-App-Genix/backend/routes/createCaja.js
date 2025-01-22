const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/crearCaja', (req,res) => {


    const {
            fecha,
            detalle,
            importe
    } = req.body;
    
    const query = `INSERT INTO caja (fecha,detalle,importe)
    VALUES (?, ?, ?)`;
    
    db.query(query, [fecha,detalle,importe], (err, result) => {
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).send("Hubo un error al guardar los datos.");
        }
        res.status(200).send("Datos guardados correctamente.");
      });
    })

    module.exports = router;