const inicioSesionRouter = require('./inicioSesionRouter');
const RegistroUsuarioRouter = require('./RegistroUsuarioRouter');


function routerApi(app){
  app.use('/iniciosesion', inicioSesionRouter);
  app.use('/registrousuario', RegistroUsuarioRouter);
}

module.exports = routerApi;


