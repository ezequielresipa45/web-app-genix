const express = require('express')
const router = express.Router()
const db = require('../db')



router.post('/crearFactura', (req,res) => {


    const {
            fecha_emision,
            numero_fc,
            tipo_estudio,
            importe_facturado,
            forma_pago,
            centro,
            paciente
     
    
    } = req.body;
    
    
    const query = `INSERT INTO facturacion (fecha_emision,numero_fc,tipo_estudio,importe_facturado,forma_pago,centro,paciente)
    VALUES (?, ?, ?, ?, ?, ?,?)`;
    
    db.query(query, [fecha_emision,numero_fc,tipo_estudio,importe_facturado,forma_pago,centro,paciente], (err, result) => {
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).send("Hubo un error al guardar los datos.");
        }
        res.status(200).send("Datos guardados correctamente.");
      });
    })

    module.exports = router;