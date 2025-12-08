const db = require("../db");

class CursosService {

    async CrearCursos(idcreador,titulo,descripcion,foto,precio,usuarios_inscritos) {
        const sql = `insert into cursos (idcreador,titulo,descripcion,foto,precio,usuarios_inscritos) values (?,?,?,?,?,?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [idcreador,titulo,descripcion,foto,precio,usuarios_inscritos], (err, result) => {
                if (err) {
                    return reject({
                        error: "Error al registar el curso",
                        details: err
                    });
                }

                if (result.length === 0) {
                    return reject({
                        status: 401,
                        error: "Datos incorrectos"
                    });
                }

                resolve(result[0]);
            });
        });
    }
 async ObtenerCursos() {
        const sql = `SELECT * FROM cursos`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject({
                        error: "Error al buscar los cursos",
                        details: err
                    });
                }
                resolve(result); 
            });
        });
    }
    async ObtenerCursoPorId(id) {
        const sql = `SELECT * FROM cursos WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, result) => {
                if (err) {
                    return reject({
                        error: "Error al buscar el curso",
                        details: err
                    });
                }
                if (result.length === 0) {
                    return reject({
                        status: 404,
                        error: "Curso no encontrado"
                    });
                }
                resolve(result[0]);
            });
        });
    }

    // ... métodos anteriores (CrearCursos, ObtenerCursos) ...

    // Método para obtener los cursos que el usuario YA compró
    async ObtenerCursosComprados(usuarioId) {
        const sql = `
            SELECT c.* FROM cursos c
            JOIN compras co ON c.id = co.curso_id
            WHERE co.usuario_id = ?
        `;
        return new Promise((resolve, reject) => {
            db.query(sql, [usuarioId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Método para obtener los cursos que el usuario CREÓ (Mis Publicaciones)
    async ObtenerCursosCreados(usuarioId) {
        const sql = `SELECT * FROM cursos WHERE idcreador = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [usuarioId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}


module.exports = new CursosService();