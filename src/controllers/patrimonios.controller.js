let Patrimonios = require('../models/patrimonio.model');

module.exports = {

  index(req,res){
    let pat = Patrimonios.find()
    .then(patrimonios => res.json(patrimonios))
    .catch(err => res.status(400).json(`Error: ${err}`))
    return pat;
  },

  create(req,res){
    const {
      numero, 
      descricao, 
      marca, 
      origem, 
      setor, 
      responsavel, 
      dataLocacao
    } = req.body;

    const newPatrimonio = new Patrimonios({
      numero, 
      descricao, 
      marca, 
      origem, 
      setor, 
      responsavel, 
      dataLocacao
    });

    newPatrimonio.save()
      .then(()=> res.json('Patrimonio Adicionado!'))
      .catch(err => res.status(400).json(`Error: ${err}`))
  },

  delete(req,res){
    let {id} = req.params
    Patrimonios.remove({numero: id})
    .then(()=> res.json('Patrimonio removido!'))
    .catch(err=> res.status(400).json(`Error ${err}`))
  }

}