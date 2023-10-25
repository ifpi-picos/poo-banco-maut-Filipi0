const prompt = require('prompt-sync')();

const Cliente = require('./Cliente.js')
const ContaCorrente = require('./contasBancarias/ContaCorrente.js')
const ContaPoupanca = require('./contasBancarias/ContaPoupanca.js')
const Transacoes = require('./Transacoes.js')
const Endereco = require('./Endereco.js')
const Notificacao = require('./notificacoes/Notificacao.js');
const Notificacao_email = require('./notificacoes/Notificacao_email.js')
const Notificacao_sms = require('./notificacoes/Notificacao_sms.js')

console.log('\n**********************************');
console.log("**** Bem-Vindo ao Banco Maut! ****");
console.log('**********************************\n');
console.log("Preencha o cadastro abaixo.");
console.log("*******************************");

let nome = prompt("Digite o nome do cliente: ");
let cfp = parseFloat(prompt('Digite o CPF do cliente: '));
let dataNascimento = prompt("Digite sua data de nascimento: ");

console.log('\nAgora, preencha seu endereço corretamente.');
console.log('****************************************');

let estado = prompt('Digite o nome do seu estado: ');
let cidade = prompt('Digite sua cidade: ');
let numero = Number(prompt('Digite o numero da sua residência: '));
const endereco = new Endereco(estado, cidade, numero);

const cliente = new Cliente(nome, cfp, dataNascimento);
//const notificacao = new Notificacao(cliente);

console.log("Como você deseja receber notificações?")
console.log("1. SMS");
console.log("2. Email");
const escolhaNotificacao = prompt("Escolha a forma de notificação (1 para SMS, 2 para Email): ");

let notificacao;
if (escolhaNotificacao === '1') {
  notificacao = new Notificacao_sms(cliente);
} else if (escolhaNotificacao === '2') {
  notificacao = new Notificacao_email(cliente);
} else {
  console.log("Opção inválida. Usando notificação padrão.");
  notificacao = new Notificacao(cliente);
}
console.log('\nCliente registrado com sucesso! \n');

const transacoes = new Transacoes();

function depositar(conta, valor){
  if(valor > 0){
    conta.realizarDeposito(valor);
    notificacao.enviarNotificacao(`\nDepósito realizado na conta ${conta.numero} - Valor: R$ ${valor}`);
    console.log('\nDepósito realizado com sucesso.\n');
  }else{
    console.log('\nValor de depósito inválido.\n');
  }
}

function criarContaCorrente(){
    const numeroConta = prompt("Digite o número da conta corrente: ");
    const saldoInicial = parseFloat(prompt("Digite o saldo inicial da conta corrente: "));
    const chequeEspecial = parseFloat(prompt("Digite o limite do cheque especial: "));
    const novaConta = new ContaCorrente(numeroConta, saldoInicial, chequeEspecial);
    cliente.registrarConta(novaConta);
    console.log(`\nConta corrente ${numeroConta} registrada com sucesso.`);
    console.log('*******************************************\n');
  }

  function criarContaPoupanca(){
    const numeroConta = prompt("Digite o número da conta poupança: ");
    const saldoInicial = parseFloat(prompt("Digite o saldo inicial da conta poupança: "));
    let taxaRendimento = 0.10
    let taxaSaque = 0.05
    let taxaTransferencia = 0.10
    
    const novaConta = new ContaPoupanca(numeroConta, saldoInicial, taxaRendimento, taxaSaque, taxaTransferencia);
    cliente.registrarConta(novaConta);
    console.log(`\nConta poupança ${numeroConta} registrada com sucesso.\n`);
    console.log('*******************************************\n');
  }
  
function transferir(origem, destino, valor){
  const contaOrigem = cliente.encontrarConta(origem);
  const contaDestino = cliente.encontrarConta(destino);
  if(contaOrigem && contaDestino){
    if(contaOrigem.realizarTransferencia(valor, contaDestino)){
      notificacao.enviarNotificacao(`\nTransferência realizada da conta ${contaOrigem.numero} para a conta ${contaDestino.numero} - Valor: R$ ${valor}`);
      console.log('\nTransferência realizada com sucesso!\n');
      console.log('*******************************************\n');
      transacoes.registrarTransacao(origem, destino, valor);
    }else{
      console.log('\nSaldo insuficiente!\n');
    }
  }else{
    console.log('\nConta não encontrada.\n');
  }
}

function exibirTransacoes(numeroConta){
  const listaTransacoes = transacoes.listarTransacoes(numeroConta);
  console.log(`\nTransações da conta* ${numeroConta}*:`);
  listaTransacoes.forEach((transacao) => {
    console.log(`Origem: ${transacao.origem}, Destino: ${transacao.destino}, Valor: ${transacao.valor}, Data: ${transacao.data}`);
  });
}

function exibirMenu(){
    console.log('\n<ESCOLHA SUA OPERAÇÃO>');
    console.log('1. Realizar Depósito em uma conta');
    console.log('2. Realizar Saque de uma conta');
    console.log('3. Consultar saldo de uma conta');
    console.log('4. Criar uma nova conta corrente');
    console.log('5. Criar uma nova conta poupança');
    console.log('6. Transferir entre contas');
    console.log('7. Listar transações de uma conta');
    console.log('8. Sair');
  
    const escolha = prompt('Escolha sua opção: ');
    console.log('');
  
    switch (escolha){
      case '1':
        const contaNumeroDeposito = prompt("Digite o número da conta para depositar: ");
        const valorDeposito = parseFloat(prompt("Digite o valor do depósito: "));
        const contaDeposito = cliente.encontrarConta(contaNumeroDeposito);
        if (contaDeposito){
          depositar(contaDeposito, valorDeposito);
        }else{
          console.log('\nConta não encontrada.\n');
        }
        exibirMenu();
        break;
  
      case '2':
        const contaNumeroSaque = prompt("Digite o número da conta para saque: ");
        const valorSaque = parseFloat(prompt("Digite o valor do saque: "));
        const contaSaque = cliente.encontrarConta(contaNumeroSaque);
        if (contaSaque){
          contaSaque.realizarSaque(valorSaque);
          notificacao.enviarNotificacao(`Saque realizado na conta ${contaSaque.numero} - Valor: R$ ${valorSaque}`);
          console.log('\nSaque realizado com sucesso.\n');
        }else{
          console.log('\nConta não encontrada.\n');
        }
        exibirMenu();
        break;
  
      case '3':
        const contaNumeroSaldo = prompt("Digite o número da conta para consultar saldo: ");
        const contaSaldo = cliente.encontrarConta(contaNumeroSaldo);
        if(contaSaldo){
          console.log(`Saldo da conta R$ ${contaNumeroSaldo}: ${contaSaldo.consultarSaldo()}.`);
        }else{
          console.log('\nConta não encontrada.\n');
        }
        exibirMenu();
        break;
  
      case '4':
        criarContaCorrente();
        exibirMenu();
        break;
  
      case '5':
        criarContaPoupanca();
        exibirMenu();
        break;
  
      case '6':
        const contaOrigem = prompt("Digite o número da conta de origem: ");
        const contaDestino = prompt("Digite o número da conta de destino: ");
        const valorTransferencia = parseFloat(prompt("Digite o valor da transferência: "));
        transferir(contaOrigem, contaDestino, valorTransferencia);
        exibirMenu();
        break;
  
      case '7':
        const contaNumeroTransacoes = prompt("Digite o número da conta para listar as transações: ");
        exibirTransacoes(contaNumeroTransacoes);
        exibirMenu();
        break;
  
      case '8':
        console.log('\nSaindo...\n');
        break;
  
      default:
        console.log('\nOpção inválida! Tente novamente.\n');
        exibirMenu();
    }
  }
  
  exibirMenu();
