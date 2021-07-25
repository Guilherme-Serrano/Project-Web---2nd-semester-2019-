const axios = require('axios')

async function AGENDAR(){
    
    let dia = document.getElementById("dia").value //Pega a info do form html
    let mes = document.getElementById("mes").value //Pega a info do form html
    let ano = document.getElementById("ano").value //Pega a info do form html
    let horario = document.getElementById("horario").value; //Pega a info do form html
    let profissional = document.getElementById("profissional").value; //Pega a info do form html
    let servico = document.getElementById("servico").value; //Pega a info do form html

    let cpf = localStorage.getItem("cpf"); //Atribui o cookie a uma variavel

    const dados = {
        dia, 
        mes, 
        ano, 
        horario, 
        profissional, 
        servico, 
        cpf
    };
    //localStorage.removeItem("cpf") //Libera o cookie
    
    console.log(dados);
    
 
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dados)
    }
    const res = await fetch('http://localhost:8082/agendar', options)

    var aux = await res.json();

    console.log(res.dados); 
    alert(aux.dados);
    
    
}