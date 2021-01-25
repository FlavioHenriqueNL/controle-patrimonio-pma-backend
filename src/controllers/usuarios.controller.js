const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); 

module.exports = {

  async registrar(req,res){
     try{  
      const {nome, cpf, password} = req.body;

      if(!cpf || !password || !nome) 
        return res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
      

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      console.log(passwordHash);

      const novoUsuario = new Usuarios({
        nome,
        password: passwordHash,
        cpf,
        nivel: 1 
      })

      const usuarioCriado = await novoUsuario.save();
      res.json(usuarioCriado);

    }catch(err){
      res.status(400).json(err);
    }
  },

  async logar(req,res){
    try{
      const {cpf, password} = req.body;
      
      const usuario = await Usuarios.findOne({cpf});
      if(!usuario) 
        return res.status(400).json({msg: "Não existe usuário com esse CPF."});
      
      const validarSenha = await bcrypt.compare(password, usuario.password);
      if(!validarSenha)
        return res.status(400).json({msg: "Senha inválida."});
      
      const token = jwt.sign({id: usuario._id}, process.env.JWT_SECRET);
      res.json({
        token,
        usuario: {
          id: usuario._id,
          cpf: usuario.cpf,
          nome: usuario.nome
        }
      })
      console.log(token);
      console.log(usuario);
      
    }catch(err){
      res.status(400).json(err.message);
    }
  },

  async deletar(req,res){
    try{
      const usuarioDeletado = await Usuarios.findByIdAndDelete(req.usuario);
      console.log(usuarioDeletado);
      res.json(usuarioDeletado);
    }catch(err){
      res.status(500).json({error: err.message});
    }
  },

  async tokenIsValid(req, res){
    try{
      const token = req.header('x-auth-token');
      if(!token) return res.json(false);

      const verificado = jwt.verify(token, process.env.JWT_SECRET);
      if(!verificado) return res.json(false);

      const usuario = await Usuarios.findById(verificado.id);
      if(!usuario) return res.json(false);

      return res.json(true);
    }catch(err){
      res.status(500).json({err: err.message})
    }
  },

  async getUsuario(req,res){
    try{
      const usuario = await Usuario.findById(req.usuario);
      return res.json({
        nome: usuario.nome,
        cpf: usuario.cpf,
        nivel: usuario.nivel
      });
    }catch(err){
      return res.json({
        err: "Um erro aconteceu."
      })
    }
  }
  

  
}
