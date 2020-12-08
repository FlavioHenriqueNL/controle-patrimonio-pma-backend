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

const connection = require('./connectionMongo');
connection.once('open', ()=>{
  console.log("Conexão com a base de dados MongoDB estabelecida com sucesso!");
});

/* ROUTES */

routes.post('/patrimonios', PatrimonioController.create);
routes.get('/patrimonios', PatrimonioController.index);
routes.delete('/patrimonios/:id', PatrimonioController.delete);
routes.put('/patrimonios/:id', PatrimonioController.update);

routes.get('/movimentacoes', MovimentacaoController.index);
routes.post('/movimentacoes', MovimentacaoController.create);



routes.get('/', (req, res)=>{
  return res.json({
    Message: "Olá mundo... De novo! ",
    Remetente: "Flávio Henrique"
  })
});

module.exports = routes;