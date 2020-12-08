let Movimentacoes = require('../models/movimentacao.model');

module.exports = {

  index(req,res){
    let mov = Movimentacoes.find()
      .then(movimentacoes => res.json(movimentacoes))
      .catch(err => res.status(400).json(`Error: ${err}`))
    ;
    return mov;
  },

  create(req,res){
    const {
      patrimonio_id,
      origem,
      origem_setor,
      origem_responsavel,
      destino,
      destino_setor,
      destino_responsavel,
      dataLocacao
    } = req.body;

    const newMovimentacao = new Movimentacoes({
      patrimonio_id,
      origem,
      origem_setor,
      origem_responsavel,
      destino,
      destino_setor,
      destino_responsavel,
      dataLocacao
    });

    newMovimentacao.save()
      .then(()=> res.json('Movimentação criada!'))
      .catch(err => res.status(400).json(`Error: ${err}`))
    ;
  }
}