const express = require('express');

const router = express.Router();

// Ruta para manejar el login

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validacion de credenciales

    if (username === 'admin' && password === '39001585') {

        res.json({ message: 'Login exitoso', token: 'face-jwt-token' })
    } else {

        res.status(401).json({ message: 'Credenciales incorrectas' })
    }

})

module.exports = router;