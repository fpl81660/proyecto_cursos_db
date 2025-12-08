const express = require("express");
const router = express.Router();
const CursosService = require("../services/CursosService");
const multer = require('multer');
const path = require("path");
const fs = require('fs');

// 1. Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/uploads';
        // Crear la carpeta si no existe
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generar nombre único: fecha + numero random + extensión original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 2. Aplicar middleware upload.single('foto')
router.post("/", upload.single('foto'), (req, res) => {
    
    // Los datos de texto vienen en req.body
    const { idcreador, titulo, descripcion, precio, usuarios_inscritos } = req.body;
    
    // El archivo viene en req.file. Guardamos la ruta relativa o solo el nombre.
    // Si no hay archivo, enviamos null o una imagen por defecto.
    const foto = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

    CursosService.CrearCursos(idcreador, titulo, descripcion, foto, precio, usuarios_inscritos)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// Ruta GET para obtener cursos (ya la tenías en el servicio, hay que exponerla)
router.get("/", (req, res) => {
    CursosService.ObtenerCursos()
        .then(cursos => {
            res.json(cursos);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;