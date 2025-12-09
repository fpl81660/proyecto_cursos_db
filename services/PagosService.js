const db = require("../db");

class PagosService {
    async procesarCompra(usuario_id, cursos, metodo_pago) {
        return new Promise((resolve, reject) => {
            // Mapeamos los datos para que coincidan con tu tabla 'pagos' en SQL
            // Estructura de values: [idUsuario, idCurso, monto, estado]
            // Usamos 'Aprobado' como estado por defecto
            const values = cursos.map(curso => [usuario_id, curso.id, curso.precio, 'Aprobado']);
            
            // CAMBIO CLAVE: Usar tabla 'pagos' y columnas 'idUsuario', 'idCurso'
            const sql = `INSERT INTO pagos (idUsuario, idCurso, monto, estado) VALUES ?`;

            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.error("Error al procesar compra:", err);
                    return reject(err);
                }
                resolve({ mensaje: "Compra exitosa", pagos: result.affectedRows });
            });
        });
    }
}

module.exports = new PagosService();