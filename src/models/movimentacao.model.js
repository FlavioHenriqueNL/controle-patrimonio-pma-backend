const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Movimentacoes = new Schema({
  patrimonio_id:      {type: Number, required: true}, 
  origem:             {type: String, required: true},
  origem_setor:       {type: String, required: true},
  origem_responsavel: {type: String, required: true},
  destino:            {type: String, required: true},
  destino_setor:      {type: String, required: true},
  destino_responsavel:{type: String, required: true},
  dataLocacao:        {type: Date, required: false}
})