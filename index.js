const express = require("express");
const routerApi = require('./routes/rutas');
const cors = require("cors");
const connection = require("./db")
const app = express();
const port = 3000;
const multer = require('multer');
const path = require("path");
const { route } = require("./routes/inicioSesionRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
routerApi(app)

app.get("/",(req, res) => {
  res.send("Servidor funcionando");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); 
    },
    filename: (req, file, cb) => {
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
/*
app.post("/iniciosesion", (req, res) => {
  const{nombre,contrasena}=req.body;
  const sql=`SELECT(nombre, contrasena) FROM usuarios WHERE nombre= ? AND contrasena= ?
                VALUES(?,?)`;
  connection.query(sql,[nombre,contrasena],(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({mensaje:'Error al buscar en la base de datos'})
    }
    console.log('Datos encontrados')
    res.status(201).json({mensaje:'Registro exitoso.'});
  });
});


//obtener todo los registros de confirmaciones 
app.get('/getAll', (req,res) => {
  const sql = `SELECT * FROM confirmacion`;

  connection.query(sql, (err, result) =>{
    if(err){
      return res.status(500).json({mensaje:"Error al traer los datos"});
    }

    res.status(200).json(result); 
  })
});

app.get('/getConfirmacionById/:id', (req,res) => {
  const{id}=req.params;
  const sql = `SELECT * FROM confirmacion WHERE id= ?`;
  connection.query(sql,[id] ,(err, result) =>{
    if(err){
      return res.status(500).json({mensaje:"Error al consultar"});
    }
    if(result.length===0){
      return res.status(200).json({mensaje:"Confirmacion no encontrada"});
    }

    res.status(200).json(result); 
  })
});

*/
app.listen(port, () => {
  console.log('Servidor corriendo en el puerto', port);
});
