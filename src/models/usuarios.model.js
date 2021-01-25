const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nome: {type: String, require: true},
  cpf: {type: String, require: true, unique: true },
  password: {type: String, require: true},
}); 
const Usuarios = mongoose.model('Usuarios', usuariosSchema);

module.exports = Usuarios;