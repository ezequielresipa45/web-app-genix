const cors = require('cors'); // Permite la comunicación entre el front y el back.
const express = require('express'); // Framework para manejar rutas y solicitudes.
const dotenv = require('dotenv'); // Para manejar configuraciones sencibles (como claves de apis, credenciales) a través de variables.
const app = express() // Crear la app de Express
const authRoutes = require('./routes/authRoutes')


dotenv.config(); // Configurar variables de entorno

app.use(express.json()); // Middleware para parsear JSON
app.use(cors());  // Middleware que sirve para habilitar que cualquier cliente front pueda hacer peticiones a nuestro back, sin importar el dominio de origen.


// PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})



// USAR LA RUTA DESDE CARPETA ROUTES

app.use('/api', authRoutes);







