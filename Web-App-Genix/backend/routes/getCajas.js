const express = require('express')
const router = express.Router()
const db = require('../db')


// Ruta para obtener todas las facturas
router.get('/cajas', (req, res) => {
    const query = 'SELECT * FROM caja ORDER BY fecha DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener pacientes' });
        } else {
            res.json(results);
        }
    });
});


module.exports = router