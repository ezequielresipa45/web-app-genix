const express = require('express');

const router = express.Router();

// Ruta para manejar el login

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validacion de credenciales

    if (username === 'admin' && password === '39001585') {

        res.json({ succes: true, message: 'Login exitoso'})
    } else {

        res.status(401).json({ succes: false,  message: 'Credenciales incorrectas' })
    }

})

module.exports = router;