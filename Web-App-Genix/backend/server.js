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
const crearCaja = require('./routes/createCaja')
const getCajas = require('./routes/getCajas')
const createProveedor = require('./routes/createProveedor')
const putProveedores = require('./routes/putProveedores')
const multer = require('multer');
const fileUpload = require('express-fileupload');

const storage = multer.memoryStorage(); // Utiliza almacenamiento en memoria para obtener el archivo como buffer
const upload = multer({ storage: storage });

dotenv.config(); // Configurar variables de entorno
app.use(fileUpload());
app.use(express.json()); // Middleware para parsear JSON
app.use(cors());  // Middleware que sirve para habilitar que cualquier cliente front pueda hacer peticiones a nuestro back, sin importar el dominio de origen.

app.use(express.urlencoded({ extended: true }));

// PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

app.use(express.json({ limit: "10mb" })); // Permite JSON de hasta 10MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Permite formularios grandes


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




  app.get('/facturas/:mes', (req, res) => {
    const mes = req.params.mes;
    const query = 'SELECT * FROM facturacion WHERE MONTH(fecha_emision) = ? ORDER BY fecha_emision DESC';
    db.query(query, [mes], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener pacientes' });
        } else {
            res.json(results);
        }
    });
});



// Usar la ruta para crear una caja
app.use(crearCaja)



// Usar la ruta para obtener una caja
app.use(getCajas)


// Usar la ruta para crear un proveedor
app.use(createProveedor)




app.get('/getProveedores', (req, res) => {
  const query = 'SELECT * FROM proveedores  ORDER BY fecha_vencimiento DESC';
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener pacientes' });
      } else {
          res.json(results);
      }
  });
});



app.use(putProveedores)
// app.use(guardarFcPdf)



// Ruta para guardar el archivo como BLOB en MySQL
app.post('/guardarfcpdf', async (req, res) => {
  if (!req.files || !req.files.file || !req.body.id) {
    return res.status(400).send("Archivo o ID faltante.");
  }

  const file = req.files.file; // Obtener el archivo
  const id = req.body.id; // Obtener el ID enviado desde el frontend

  // Guardar el archivo en la base de datos como BLOB junto con el ID
  const query = `INSERT INTO guardarfcpdf (id, factura_data) VALUES (?, ?)`;
  db.query(query, [id, file.data], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).send("Hubo un error al guardar los datos.");
    }
    res.status(200).send("Archivo y datos guardados correctamente.");
  });
});













// Ruta para obtener el archivo como BLOB
app.get('/guardarfcpdf/:id', (req, res) => {
  const id = req.params.id;  // El ID del archivo que deseas recuperar

  const query = 'SELECT factura_data FROM guardarfcpdf WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al recuperar el archivo:", err);
      return res.status(500).send("Hubo un error al recuperar el archivo.");
    }

    if (result.length === 0) {
      return res.status(404).send("Archivo no encontrado.");
    }

    const file = result[0].factura_data;

    // Configura la respuesta para enviar el archivo con el tipo de contenido adecuado
    res.setHeader('Content-Type', 'application/pdf');  // O el tipo adecuado para el archivo
    res.setHeader('Content-Disposition', 'attachment; filename="factura.pdf"');  // Nombre del archivo cuando lo descargue

    // Enviar el archivo como un buffer
    res.send(file);
  });
});















