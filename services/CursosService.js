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
        const sql = `select * from cursos`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject({
                        error: "Error al buscar el curso",
                        details: err
                    });
                 }

     res.status(200).json(result);
            });
        });
    }


}


module.exports = new CursosService();