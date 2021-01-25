const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movimentacoesSchema = new Schema({
  patrimonio_id:      {type: Array, required: true}, 
  origem:             {type: String, required: true},
  origem_setor:       {type: String, required: true},
  origem_responsavel: {type: String, required: true},
  destino:            {type: String, required: true},
  destino_setor:      {type: String, required: true},
  destino_responsavel:{type: String, required: true},
  dataLocacao:        {type: Date, required: true}
});

const Movimentacoes = mongoose.model('Movimentacoes', movimentacoesSchema);

module.exports = Movimentacoes;