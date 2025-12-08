const inicioSesionRouter = require('./inicioSesionRouter');
const RegistroUsuarioRouter = require('./RegistroUsuarioRouter');
const CursosRouter = require('./CursosRouter');
const usuarioRouter = require('./UsuarioRouter');


function routerApi(app){
  app.use('/iniciosesion', inicioSesionRouter);
  app.use('/registrousuario', RegistroUsuarioRouter);
  app.use('/cursos', CursosRouter);
  app.use('/usuario', usuarioRouter);
}

module.exports = routerApi;


