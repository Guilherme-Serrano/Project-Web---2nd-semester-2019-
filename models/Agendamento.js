const db = require('./bd') //importa o bd

//Define o banco de dados
const Agendamento = db.sequelize.define('agendamento', {
    horario: {
      type: db.Sequelize.STRING,
    },
    id_servico: {
      type: db.Sequelize.STRING,
    },
    id_cliente: {
      type: db.Sequelize.STRING,
    },
    id_funcionario: {
      type: db.Sequelize.STRING,
    },
    dia: {
      type: db.Sequelize.STRING,
    },
    mes: {
      type: db.Sequelize.STRING,
    },
    ano: {
      type: db.Sequelize.STRING,
    }
   
  });


  

  //Agendamento.sync({force: true}); //Cria tabela no bd

  module.exports = Agendamento //exporta o codigo