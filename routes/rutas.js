const inicioSesionRouter = require('./inicioSesionRouter');
const RegistroUsuarioRouter = require('./RegistroUsuarioRouter');
const CursosRouter = require('./CursosRouter');


function routerApi(app){
  app.use('/iniciosesion', inicioSesionRouter);
  app.use('/registrousuario', RegistroUsuarioRouter);
  app.use('/cursos', CursosRouter);
}

module.exports = routerApi;


