const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/guardarFcPdf', (req, res) => {
  // Obtener el objeto completo del body
  const factura = req.body;

  // Verificar si el objeto está vacío
  if (!factura) {
    return res.status(400).send("No se recibieron datos para guardar.");
  }

  // Convertir el objeto a una cadena JSON (si deseas almacenarlo tal cual)
  const facturaJson = JSON.stringify(factura);

  // Consulta SQL para insertar el objeto como JSON en la base de datos
  const query = `INSERT INTO guardarFcPdf (factura_data) VALUES (?)`;

  db.query(query, [facturaJson], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).send("Hubo un error al guardar los datos.");
    }
    res.status(200).send("Datos guardados correctamente.");
  });

});

module.exports = router;
