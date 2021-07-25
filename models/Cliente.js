const db = require('./bd') //importa o bd

//Define o banco de dados
const cliente = db.sequelize.define('cliente', {
    
    nome: {
      type: db.Sequelize.STRING,
    },   
    cpf: {
      type: db.Sequelize.STRING,
    },
    senha: {
      type: db.Sequelize.STRING
    }
  });

  //cliente.sync({force: true})


  module.exports = cliente; //exporta o codigo