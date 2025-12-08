const express = require("express");
const router = express.Router();
const CursosService = require("../services/CursosService");
const multer = require('multer');
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/uploads';
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('foto'), (req, res) => {
    
    const { idcreador, titulo, descripcion, precio, usuarios_inscritos } = req.body;
    
    const foto = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

    CursosService.CrearCursos(idcreador, titulo, descripcion, foto, precio, usuarios_inscritos)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get("/", (req, res) => {
    CursosService.ObtenerCursos()
        .then(cursos => {
            res.json(cursos);
        })
        .catch(error => {
            res.status(500).json({ error: "Error al obtener cursos" });
        });
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    CursosService.ObtenerCursoPorId(id)
        .then(curso => {
            res.json(curso);
        })
        .catch(error => {
            res.status(error.status || 500).json(error);
        });
});
module.exports = router;