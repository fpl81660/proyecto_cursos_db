const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({ //Esto es para establecer una conexión con la base de datos
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err)=>{
  if (err) {
    console.error('Error conectando a MySQL');
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;