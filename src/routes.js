const express = require('express');
const routes = express.Router();

/* 
  CONEXÃO VIA SQLITE3
*/

// const connection = require('./database/connection');

// const PatrimonioController = require('./controllers/PatrimonioController');
// const MovimentacaoController = require('./controllers/MovimentacaoController');

/* 
  CONEXÃO VIA MONGODB
*/

const PatrimonioController = require('./controllers/patrimonios.controller');
const MovimentacaoController = require('./controllers/movimentacoes.controller');
const UsuariosController = require('./controllers/usuarios.controller');
const Usuarios = require('./models/usuarios.model');
const auth = require('./middleware/auth'); 

const connection = require('./connectionMongo');
connection.once('open', ()=>{
  console.log("Conexão com a base de dados MongoDB estabelecida com sucesso!");
});

/* ROUTES */

routes.post('/patrimonios', PatrimonioController.create);
routes.get('/patrimonios', PatrimonioController.index);
routes.delete('/patrimonios/:id', PatrimonioController.delete);
routes.put('/patrimonios/:id', PatrimonioController.update);
routes.put('/patrimonios/editar/:id', PatrimonioController.updateFull);

routes.get('/movimentacoes', MovimentacaoController.index);
routes.post('/movimentacoes', MovimentacaoController.create);

routes.get('/usuarios', auth, UsuariosController.getUsuario);
routes.post('/usuarios/registrar', UsuariosController.registrar);
routes.delete('/usuarios/deletar', auth, UsuariosController.deletar);
routes.post('/tokenIsValid', UsuariosController.tokenIsValid);
routes.post('/login', UsuariosController.logar);


routes.get('/', (req, res)=>{
  return res.json({
    Message: "Olá mundo... De novo! ",
    Remetente: "Flávio Henrique"
  })
});

module.exports = routes;