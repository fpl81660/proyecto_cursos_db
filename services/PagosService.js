const db = require("../db");

class PagosService {
    async procesarCompra(usuario_id, cursos, metodo_pago) {
        return new Promise((resolve, reject) => {
            // Preparamos los valores para insertar múltiples filas si hay varios cursos
            // cursos es el array que viene del carrito frontend
            const values = cursos.map(curso => [usuario_id, curso.id, curso.precio, metodo_pago]);
            
            const sql = `INSERT INTO compras (usuario_id, curso_id, monto, metodo_pago) VALUES ?`;

            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.error("Error al procesar compra:", err);
                    return reject(err);
                }
                resolve({ mensaje: "Compra exitosa", compras: result.affectedRows });
            });
        });
    }
}

module.exports = new PagosService();