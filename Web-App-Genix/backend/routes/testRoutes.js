const express = require('express');
const router = express.Router();

// RUTA DE PRUEBA
router.get('/test', (req, res) => {
    res.json({ message: '¡Esta es una ruta de prueba'});
});

module.exports = router;