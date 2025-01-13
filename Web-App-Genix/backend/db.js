const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'genix'
})

db.connect((err)=>{
    if(err){
        console.error("Error al conectar a la base de datos: ", err.message)
        return;
    }
    console.log("Conexión exitosa a MySQL")
})

module.exports = db;