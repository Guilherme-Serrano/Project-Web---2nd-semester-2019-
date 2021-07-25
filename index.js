const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Conexão com BD MySQL ------------------------------------------------------------------------------

const Agendamento = require('./models/Agendamento');
const Cliente = require('./models/Cliente');

//Funções ---------------------------------------------------------------------------------

//----- Realiza o login -------
async function login(req, res){
  
  var login = req.query.login //Atribui o valor da requisição feita pelo front
  var senha = req.query.senha //Atribui o valor da requisição feita pelo front

  let aux = await Cliente.findAll({
    where: {
      cpf: login
    }
  })//procura no bd


  if(aux.length == 0){
    return res.json({status: "Erro", dados: "Erro de autenticação"});
  }else{
    if(login === aux[0].cpf && senha === aux[0].senha){
      
      return res.json({status: "Sucesso", dados: "Login realizado com sucesso"});  //Manda um json pro front com status e dados  
      
    }else{
      if(login === aux[0].cpf && senha !== aux[0].senha){
        return res.json({status: "Erro", dados: "Erro de autenticação"});    
      } 
      
    }  
  }


  

}

//----- Agenda o horario -----
async function agendar(req, res){
  
 const {
   dia,
   mes,
   ano,
   horario,
   profissional,
   servico,
   cpf
 } = req.body 
 
  //verifica dada
  if(mes == 04 || mes == 06 || mes == 09 || mes == 11 ){
    if(dia > 30 ){
      return res.json({status: "Erro", dados: "data invalida"})
    }
  }

  if(mes == 02 && ano == 2020 && dia > 29){
    return res.json({status: "Erro", dados: "data invalida"})
  }else{
    if(mes == 02 && ano == 2021 && dia > 28){
      return res.json({status: "Erro", dados: "data invalida"})
    }
    
  } 

  //Pesquisa no banco de dados
  let aux = await Agendamento.findAll({
    where: {
      horario: horario,
      id_funcionario: profissional,
      dia: dia,
      mes: mes,
      ano: ano 
    }
  })  

  if(aux.length != 0 )
  {
    return res.json({status: "Erro", dados: "Horario Ocupado!"})
  }  

  //INSERE OS DADOS RECEBIDOS NO BANCO DE DADOS
  Agendamento.create({
    horario: horario, 
    id_servico: servico, 
    id_cliente: cpf,
    id_funcionario: profissional,
    dia: dia,
    mes: mes,
    ano: ano    
  }).then(function(){
      return res.json({status: "Sucesso", dados: "Horario agendado com sucesso"})

  }).catch(function(erro){
    return res.json({status: "Erro", dados: "Falha ao agendar horario" + erro})
  })    
}

//----- Localiza os dados do agendamento do cliente -----
async function Localizar(req, res){

  let cpf  = req.params.cpf;  
  
 let aux = await Agendamento.findAll({
    where: {
      id_cliente: cpf
    }
  }) //realiza o select no bd

  if(aux.length == 0 )
  {
    return res.json({status: "Erro", dados: "Você não possui nenhum agendamento!"})
  }else{
    return res.json({status: "Sucesso", dados: aux}) // Retorna o select do bd
  }
 
}

//------ Deleta os dados do agendamento ------
async function deletar(req, res){

  let id  = req.params.id;

  Agendamento.destroy({
    where: {
      id: id
    }
  });

  
  return res.json({status: "Sucesso", dados: "Agendamento deletado com sucesso!"})

}

//Rotas -----------------------------------------------------------------------------------


//Faz o login do cliente (Sem a parte do bd ainda)
app.get("/login", login)

//Agenda o cliente
app.post("/agendar", agendar)

//Procura o horario do cliente
app.get("/select/:cpf", Localizar) 

//Deleta o agendamento atraves do ID
app.delete("/delete/:id", deletar)

app.listen(8082, function(){
  console.log("Servidor rodando na url http://localhost:8082")
});
