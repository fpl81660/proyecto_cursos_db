const express = require('express') 
const app = express.Router();
const RegistroUsuarioService = require("../services/RegistroUsuarioService"); 

app.post("/RegistroUsuario", async (req, res) => {
  const { nombre, correo, contrasena, pais, foto_perfil, descripcion } = req.body;
  try {
    const result = await RegistroUsuarioService.RegistroUsuario(nombre, correo, contrasena, pais, foto_perfil, descripcion);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor al registrar el usuario' });
  }
});

module.exports = app;