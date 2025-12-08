create database cursos;
use cursos;
CREATE TABLE usuarios (
    idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    pais VARCHAR(50),
    foto_perfil VARCHAR(255),
	descripcion VARCHAR(255)
);
CREATE TABLE cursos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idcreador INT,
    titulo VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    foto VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    usuarios_inscritos INT DEFAULT 0,
    FOREIGN KEY (idcreador) REFERENCES usuarios(idUsuario)
);

select * from usuarios