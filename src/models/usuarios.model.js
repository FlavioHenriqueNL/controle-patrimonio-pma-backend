const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nome: {type: String, require: true},
  cpf: {type: String, require: true, unique: true },
  password: {type: String, require: true},
});

usuariosSchema.pre("save", async function hashPassword(next){
  if(!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 8);
});

usuariosSchema.methods = {
  compareHash(hash){
    return bcrypt.compare(hash, this.password);
  },
  generateToken(){
    return jwt.sign({id: this.id}, "secret",{expiresIn: 86400})
  }
}

const Usuarios = mongoose.model('Usuarios', usuariosSchema);

module.exports = Usuarios;