const express = require('express')
const router = express.Router()
const db = require('../db')


// Ruta para obtener todos los pacientes
router.get('/pacientes', (req, res) => {
    const query = 'SELECT * FROM pacientes';
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