const connection = require('../database/connection');

module.exports = {

  async index(req,res){
    const movimentacoes = await connection('movimentacoes').select('*');
    return res.json(movimentacoes); 
  },

  async create(req,res){
    const {
      patrimonio_id, 
      origem,
      origem_setor,
      origem_responsavel,
      destino,
      destino_setor,
      destino_responsavel,
      destino_dataLocacao 
    } = req.body;

    await connection('movimentacoes').insert({
      patrimonio_id,
      origem,
      origem_setor,
      origem_responsavel,
      destino,
      destino_setor,
      destino_responsavel,
      destino_dataLocacao
    });

    return res.json('Movimentação criada com sucesso!');
  }


}