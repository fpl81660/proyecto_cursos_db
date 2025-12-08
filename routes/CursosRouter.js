const express = require("express");
const app = express.Router();
const CursosService = require("../services/CursosService"); 

app.post("/", (req, res) => {
    const { idcreador, titulo, descripcion, foto, precio, usuarios_inscritos } = req.body;

    CursosService.Cursos(idcreador, titulo, descripcion, foto, precio, usuarios_inscritos)
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            res.status(error.status || 500).json(error);
        });
});

module.exports = app;