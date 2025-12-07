const express = require("express");
const app = express.Router();
const InicioSesionService = require("../services/InicioSesionService"); 

app.get("/", (req, res) => {
    const { nombre, contrasena } = req.query;

    InicioSesionService.InicioSesion(nombre, contrasena)
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            res.status(error.status || 500).json(error);
        });
});

module.exports = app;