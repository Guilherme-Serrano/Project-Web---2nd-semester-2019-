async function SELECT(){
    

    let cpf = localStorage.getItem("cpf"); //Atribui o cookie a uma variavel
    const req = await fetch("http://localhost:8082/select/"+cpf)
    var aux = await req.json(); //Espera a requisição do json
    
     
    let tam = aux.dados.length //Pega a quantidade de horarios
    
    let i

    for(i = 0; i < tam; i ++){
        if(aux.status == "Sucesso")  //Se o login for vdd, ele passa de pagina
        {
            localStorage.setItem("id"+i, aux.dados[i].id); //salva o login como cookie
            document.getElementById("meu-horario"+[i]).innerHTML = "Seu agendamento está marcado para:" + 
            "<br><br> Horario: "+ aux.dados[i].horario + "<br> Data: " + aux.dados[i].dia + "/" + 
            aux.dados[0].mes + "/" + aux.dados[i].ano + "<br> Serviço: " + aux.dados[i].id_servico + 
            "<br> Profissional: " +  aux.dados[i].id_funcionario;
        }else{
            document.getElementById("meu-horario"+[i]).innerHTML = "Voce não possui agendamento";
        }
    }   
}

async function DELETE(aux){
     
    let id = localStorage.getItem("id"+aux); //Atribui o cookie a uma variavel

    const req = await fetch("http://localhost:8082/delete/"+id, {
        method: 'DELETE',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
        
})
    var aux = await req.json(); //Espera a requisição do json
    
    alert(aux.dados);
    location.reload();
}


