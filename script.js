/*document.getElementById('formularioContas').addEventListener('change', function (){
    atribuirBotoes();
})

function atribuirBotoes(){
    document.getElementById('btnIncluirConta').addEventListener('click', incluaConta)
    document.getElementById('btnAtualizarConta').addEventListener('click', atualizeConta)
}*/

function imprimaFormularioCadastro(){
    let objDados=leiaDados();
    let formulario=document.getElementById('formularioContas');
    let strHtml=`<p>Qual o seu ID de Cliente? <input type="text" id="campoIdCliente"></p>
    <p>Número do Banco: <input type="text" id="campoNumeroBanco"></p>
    <p>Agência: <input type="text" id="campoNumeroAgencia"></p>
    <p>Número da Conta: <input type="text" id="campoNumeroConta"></p>
    <button id="btnIncluirConta">Salvar Conta</button>`;
    formulario.innerHTML=strHtml;
}

function imprimaId(){
    let objDados=leiaDados();
    let dropDown=document.getElementById('inputGroupSelect01');
    let strHtml=`<option selected>Selecione seu Id de Cliente</option>`;
    for(let i = 0; i < objDados.contas.length; i++){
        strHtml+=`<option value="${objDados.contas[i].cliente}">${objDados.contas[i].cliente}</option>`;
    }
    dropDown.innerHTML=strHtml;
}

/*//Função para conferir o valor selecionado no dropdown
function alerta(){
    let selectElement=document.querySelector('#inputGroupSelect01');
    let idCliente=selectElement.value;
    alert(`${idCliente}`);
}*/

function imprimaFormularioAtualizar(){
    let objDados=leiaDados();
    let formulario=document.getElementById('formularioContas');
    let strHtml=`<div class="input-group mb-3">
    <label class="input-group-text" for="inputGroupSelect01">Id</label>
    <select class="form-select" id="inputGroupSelect01"></select>
    </div>
    <p>Número do Banco: <input type="text" id="campoNumeroBanco"></p>
    <p>Agência: <input type="text" id="campoNumeroAgencia"></p>
    <p>Número da Conta: <input type="text" id="campoNumeroConta"></p>
    <button id="btnAtualizarConta">Atualizar Conta</button>`;
    formulario.innerHTML=strHtml;
    imprimaId();
}

function leiaDados(){
    let strDados = localStorage.getItem('db');
    let objDados = {};
    if(strDados){
        objDados=JSON.parse(strDados);
    }
    else {
        objDados={contas:[]};
    }
    return objDados;
}

function salveDados (dados){
    localStorage.setItem('db', JSON.stringify(dados));
}

function incluaConta(){
    let objDados=leiaDados();
    //Nova Conta
    let strNumBanco= document.getElementById('campoNumeroBanco').value;
    let strAgencia= document.getElementById('campoNumeroAgencia').value;
    let strConta=document.getElementById('campoNumeroConta').value;
    let idCliente=document.getElementById('campoIdCliente').value;
    let ERRO=false;
    for(i=0;i<objDados.contas.length;i++){
        ERRO=objDados.contas[i].cliente==idCliente;
    }
    let novoId=objDados.contas.length;
    novoId++;
    
    if(!ERRO){
        let novaConta={
            id:novoId,
            nBanco:strNumBanco,
            cliente:idCliente,
            nAgencia: strAgencia,
            nConta: strConta
        };
        objDados.contas.push(novaConta);
        //Salvar Dados
        salveDados(objDados);
        //Atualizar Página
        imprimaTabela();
    }
    else{
        alert('O ID do cliente já está cadastrado!');
    }
}

function atualizeConta(){
    let objDados=leiaDados();
    //Atualização de dados
    let novoNumBanco=document.getElementById('campoNumeroBanco').value;
    let novoNumAgencia=document.getElementById('campoNumeroAgencia').value;
    let novoNumConta=document.getElementById('campoNumeroConta').value;
    let selectElement=document.querySelector('#inputGroupSelect01');
    let idCliente=selectElement.value;
    let ERRO=(idCliente=='Selecione seu Id de Cliente');
    if(ERRO){
        alert('Por favor selecione o seu Id de Cliente!');
    }
    else{
        let i=0;
        while(objDados.contas[i].cliente!=idCliente){
            i++;
        }
        //alert(`${i}---${objDados.contas[i].cliente}---${idCliente}`);
        let dadosAtualizados={
            id:i+1,
            nBanco:novoNumBanco,
            cliente:idCliente,
            nAgencia: novoNumAgencia,
            nConta: novoNumConta
        };
        objDados.contas[i]=dadosAtualizados;
        //Salve Atualização
        salveDados(objDados);
        //Imprima Nova Tabela
        imprimaTabela();
    }
}

function imprimaTabela(){
    let tela=document.getElementById('tela');
    let strHtml=`<table><tr><th>ID do Cliente</th><th>Banco</th><th>Agência</th><th>Conta</th></tr>`;
    let objDados=leiaDados();
    for(i=0;i<objDados.contas.length;i++){
        strHtml+=`<tr><td>${objDados.contas[i].cliente}</td><td>${objDados.contas[i].nBanco}</td><td>${objDados.contas[i].nAgencia}</td><td>${objDados.contas[i].nConta}</td></tr>`;
    }
    strHtml+=`</table>`;
    tela.innerHTML=strHtml;
}


function escondaDados(){
    let tela=document.getElementById('tela');
    let strHtml='';
    tela.innerHTML=strHtml;
}



// Script Botões

document.getElementById('btnCarregaDados').addEventListener('click',imprimaTabela);
document.getElementById('btnEscondeDados').addEventListener('click', escondaDados);
document.getElementById('btnCadastrar').addEventListener('click', function (){
    imprimaFormularioCadastro();
    document.getElementById('btnIncluirConta').addEventListener('click', incluaConta);
});
document.getElementById('btnAtualizar').addEventListener('click', function (){
    imprimaFormularioAtualizar();
    document.getElementById('btnAtualizarConta').addEventListener('click', atualizeConta);
});
//document.getElementById('alerta').addEventListener('click', alerta);

/*Teste Bobo
function imprimaFormulario(){
    let formulario=document.getElementById('formularioContas');
    let strHtml='';
    strHtml='<p>Qual o seu ID de Cliente? <input type="text" id="campoIdCliente"></p>'+'<p>Número do Banco: <input type="text" id="campoNumeroBanco"></p>'+'<p>Agência: <input type="text" id="campoNumeroAgencia"></p>'+'<p>Número da Conta: <input type="text" id="campoNumeroConta"></p>'+'<button id="btnIncluirConta">Salvar Conta</button>';
    formulario.innerHTML=strHtml;
    
}
document.getElementById('formularioContas').addEventListener('load', imprimaFormulario);*/



