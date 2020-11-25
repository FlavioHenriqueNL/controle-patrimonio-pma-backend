const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(port, ()=>{
  console.log(`Servidor está funcionando na porta: ${port}`);
});