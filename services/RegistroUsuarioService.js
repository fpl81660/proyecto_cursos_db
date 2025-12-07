const db = require("../db");
class RegistroUsuarioService {
    RegistroUsuario(nombre, correo, contrasena, pais, foto_perfil, descripcion) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO usuarios(nombre, correo, contrasena, pais, foto_perfil, descripcion)
                    VALUES(?,?,?,?,?,?)`;
            db.query(sql, [nombre, correo, contrasena, pais, foto_perfil, descripcion || null], (err, result) => {
                if (err) {
                    console.error('Error al insertar en la base de datos:', err);
                    return reject(err);
                }
                console.log('Datos insertados de manera correcta');
                resolve({ mensaje: 'Registro exitoso.', idGenerado: result.insertId });
            });
        });
    }
}
module.exports = new RegistroUsuarioService();
