const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
  try{
    const token = req.header("x-auth-token");
    if(!token)
      return res.status(401).json({msg: "Sem token de autenticação, autorização negada."});

    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    if(!verificado)
      return res.status(401).json({msg: "Falha na verficação de token, autorização negada."});
    
    console.log(`Está verificado? ${verificado}`);
    req.usuario = verificado.id;
    next();

  }catch(err){
    res.status(500).json({error: err.message})
  }
}

module.exports = auth;