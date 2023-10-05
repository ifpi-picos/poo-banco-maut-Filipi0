const prompt = require('prompt-sync')();

const Cliente = require('./Cliente');
const Conta = require('./Conta');
const Endereco = require('./Endereco')

function exibirMenu(cliente) {
  console.log("\n***Bem-Vindo ao banco***");
  console.log("1. Criar Cliente");
  console.log("2. Criar Conta");
  console.log("3. Depositar");
  console.log("4. Sacar");
  console.log("5. Transferir");
  console.log("6. Verificar Saldo");
  console.log("0. Sair");

  const opcao = prompt("Selecione uma opção: ");

  switch (opcao) {
    case '1':
      criarCliente();
      break;
    case '2':
      criarConta(cliente);
      break;
    case '3':
      case '3':
       const valorDeposito = parseFloat(prompt('Digite o valor do depósito: '))
       cliente.contas[0].depositar(valorDeposito);
      console.log('\nDepósito realizado com sucesso!\n');
         exibirMenu(cliente);
         break;

    case '4':
      sacar(cliente.contas[0]);
      break;
    case '5':
      transferir(cliente.contas[0]);
      break;
    case '6':
      verificarSaldo(cliente.contas[0]);
      break;
    case '0':
      console.log("\nSaindo...");
      break;
    default:
      console.log("\nOpção inválida.\n");
      exibirMenu(cliente);
      break;
  }
}

function criarCliente() {
  const nome = prompt("Informe o nome do cliente: ");
  const cpf = prompt("Informe o CPF do cliente: ");
  const dataNascimento = prompt("Informe a data de nascimento do cliente: ");
  console.log('\nAgora o endereço completo');
  const bairro = prompt("Informe o endereço completo do cliente: ");
  const rua = prompt('digite o nome da sua rua: ')
  const cidade = prompt('Digite o nome da sua cidade: ')
  const numero = Number(prompt('Digite o numero: '))

  const cliente = new Cliente(nome, cpf, dataNascimento,bairro,rua,cidade,numero);
  console.log(`\nCliente ${cliente.nome} criado com sucesso.\n`);
  exibirMenu(cliente);
}

function criarConta(cliente) {
  const agencia = prompt("Informe a agência da conta: ");
  const numeroConta = prompt("Informe o número da conta: ");
  const saldo = parseFloat(prompt("Informe o saldo inicial da conta: "));

  const conta = new Conta(agencia, numeroConta, saldo);

  cliente.contas.push(conta);
  console.log(`\nConta criada com sucesso.\n`);
  exibirMenu(cliente);
}

exibirMenu(new Cliente('', '', '', ''));