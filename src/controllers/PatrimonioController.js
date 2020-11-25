const connection = require('../database/connection');
module.exports = {

  async index(req,res){
    const patrimonios = await connection('patrimonios').select('*');
    return res.json(patrimonios);
  },

  async create(req, res){
    const body = req.body;
    const {numero, descricao, marca, origem, origem_setor, origem_responsavel, origem_dataLocacao} = req.body;
    console.log(body);
  
    await connection('patrimonios').insert({
      numero,
      descricao,
      marca,
      origem,
      origem_setor,
      origem_responsavel,
      origem_dataLocacao,
    });

    return res.json({
      Message: "Patrimonio criado com sucesso!!!",
      Patrimonio: numero
    });
  },

  async delete(req,res){
    const {id} = req.params;
    try{
      await connection('patrimonios').where('numero', id).delete();
    }catch(e){
      console.log(e.message);
    }
    return res.status(204).send();
  },

  async update(req,res){
    const {id} = req.params;
    const {origem, setor, responsavel, datalocacao} = req.body;
    try{
      await connection('patrimonios').where('numero', id)
              .update({
                origem,
                origem_setor: setor,
                origem_responsavel: responsavel,
                origem_dataLocacao: datalocacao
              });
    }catch(e){
      console.log(`Não foi possível efetuar essa ação. ${e.message}`)
    }
    return(
      console.log(`Atualização realizada com sucesso! ${res.json()}`)
    )
  }
}