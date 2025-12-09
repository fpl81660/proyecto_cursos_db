const db = require("../db");

class InicioSesionService {

    async InicioSesion(nombre, contrasena) {
        const sql = `
            SELECT idUsuario, nombre, correo, pais, foto_perfil, descripcion
            FROM usuarios
            WHERE nombre = ? AND contrasena = ?
            LIMIT 1
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [nombre, contrasena], (err, result) => {
                if (err) return reject({ error: "Error de servidor", details: err });
                if (result.length === 0) return reject({ status: 401, error: "Credenciales incorrectas" });
                resolve(result[0]);
            });
        });
    }
}

module.exports = new InicioSesionService();