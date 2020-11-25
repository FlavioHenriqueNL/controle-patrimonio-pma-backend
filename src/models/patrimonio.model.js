const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const patrimoniosSchema = new Schema({
  numero: {type: Number, required: true, unique: true},
  descricao: {type: String, required: true},
  marca: {type: String, required: true},
  origem: {type: String, required: true},
  setor: {type: String, required: true},
  responsavel: {type: String, required: true},
  dataLocacao: {type: Date, required: false}
},{
  timestamps: true
});

const Patrimonios = mongoose.model('Patrimonios', patrimoniosSchema);

module.exports = Patrimonios;