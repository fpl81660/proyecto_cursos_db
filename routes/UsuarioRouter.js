const express = require("express");
const router = express.Router();
const CursosService = require("../services/CursosService");
const PagosService = require("../services/PagosService");

// Ruta para obtener cursos comprados: GET /usuario/1/cursos-comprados
router.get("/:id/cursos-comprados", (req, res) => {
    CursosService.ObtenerCursosComprados(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

// Ruta para obtener cursos creados: GET /usuario/1/mis-publicaciones
router.get("/:id/mis-publicaciones", (req, res) => {
    CursosService.ObtenerCursosCreados(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

// Ruta para pagar: POST /usuario/comprar
router.post("/comprar", (req, res) => {
    const { usuario_id, cursos, metodo_pago } = req.body;
    PagosService.procesarCompra(usuario_id, cursos, metodo_pago)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json(err));
});

module.exports = router;