const cors = require('cors'); // Permite la comunicación entre el front y el back.
const express = require('express'); // Framework para manejar rutas y solicitudes.
const dotenv = require('dotenv'); // Para manejar configuraciones sencibles (como claves de apis, credenciales) a través de variables.
const app = express() // Crear la app de Express
const authRoutes = require('./routes/authRoutes')
const db = require('./db')
const createPatients = require('./routes/createPatients')
const getPatients = require('./routes/getPatients')
const putPatients = require('./routes/putPatients')
const createFactura = require('./routes/createFactura')
const getFacturas = require('./routes/getFacturas')




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


// Usar la ruta post para crear paciente

app.use(createPatients)



// Usar la ruta para traer pacientes

app.use(getPatients)



// Usar la ruta para actualizar pacientes

app.use(putPatients)



// Obtener la info de 1 paciente

app.get('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM pacientes WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener paciente:', err);
            return res.status(500).send('Error al obtener paciente');
        }
        if (results.length === 0) {
            return res.status(404).send('Paciente no encontrado');
        }
        res.status(200).json(results[0]);
    });
});


// Ruta para eliminar un paciente
app.delete('/eliminarPacientes/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM pacientes WHERE id = ?';
  
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el paciente:', err);
        return res.status(500).send('Hubo un error al intentar eliminar el paciente.');
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send('Paciente no encontrado.');
      }
  
      res.status(200).send('Paciente eliminado correctamente.');
    });
  });



// Usar la ruta para crear una factura de un pacientes
  app.use(createFactura)


  // Usar la ruta para obtener las facturas
  app.use(getFacturas)
