const express = require('express')
const router = express.Router()
const db = require('../db')



router.post('/crearProveedor', (req,res) => {


    const {
        fecha_vencimiento,
        proveedor,
        fc_cliente,
        total,
        estado
    } = req.body;
    
    
    const query = `INSERT INTO proveedores (fecha_vencimiento,proveedor,fc_cliente,total,estado)
    VALUES (?, ?, ?, ?, ?)`;
    
    db.query(query, [fecha_vencimiento,proveedor,fc_cliente,total,estado], (err, result) => {
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).send("Hubo un error al guardar los datos.");
        }
        res.status(200).send("Datos guardados correctamente.");
      });
    })

    module.exports = router;