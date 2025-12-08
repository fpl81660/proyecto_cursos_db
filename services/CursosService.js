const db = require("../db");

class InicioSesionService {

    async Cursos(nombre, contrasena) {
        const sql = `
            SELECT *
            FROM usuarios
            WHERE nombre = ? AND contrasena = ?
            LIMIT 1
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [nombre, contrasena], (err, result) => {
                if (err) {
                    return reject({
                        error: "Error al procesar el inicio de sesión",
                        details: err
                    });
                }

                if (result.length === 0) {
                    return reject({
                        status: 401,
                        error: "Credenciales incorrectas"
                    });
                }

                resolve(result[0]);
            });
        });
    }
}

module.exports = new InicioSesionService();