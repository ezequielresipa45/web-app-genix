const cors = require('cors'); // Permite la comunicación entre el front y el back.
const express = require('express'); // Framework para manejar rutas y solicitudes.
const dotenv = require('dotenv'); // Para manejar configuraciones sencibles (como claves de apis, credenciales) a través de variables.
const app = express() // Crear la app de Express
const authRoutes = require('./routes/authRoutes')
const db = require('./db')


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





// Ruta para obtener todos los pacientes
app.get('/pacientes', (req, res) => {
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


app.post('/crearPaciente', (req,res) => {


const {
        nombre,
        apellido,
        fecha,
        hora,
        tipo_estudio,
        valor_estudio,
        estado_pago,
        forma_pago,
        fecha_pago,
        estado_fc

} = req.body;


const query = `INSERT INTO pacientes (nombre, apellido, fecha, hora, tipo_estudio, valor_estudio, estado_pago, forma_pago, fecha_pago, estado_fc)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

db.query(query, [nombre, apellido, fecha, hora, tipo_estudio, valor_estudio, estado_pago, forma_pago, fecha_pago, estado_fc], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).send("Hubo un error al guardar los datos.");
    }
    res.status(200).send("Datos guardados correctamente.");
  });
})



