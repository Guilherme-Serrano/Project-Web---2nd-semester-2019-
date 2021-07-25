
async function LOGIN(){
        
    let login = document.getElementById("login").value; //Pega a info do form html
    let senha = document.getElementById("senha").value; //Pega a info do form html

    localStorage.setItem("cpf", login); //salva o login como cookie
    
    const req = await fetch("http://localhost:8082/login?login=" + login + "&senha=" + senha); //ligacao com o back
    var aux = await req.json(); //Espera a requisição do json
    console.log(aux); 
    alert(aux.dados); //Mensagem na tela

    if(aux.status == "Sucesso")  //Se o login for vdd, ele passa de pagina
    {
        window.location.href='../agendar/agendar.html';
    }    

}





