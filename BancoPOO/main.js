const prompt = require('prompt-sync')();

const Cliente = require('./Cliente.js');
const ContaBancaria = require('./ContaBancaria.js');
const Transacoes = require('./Transacoes.js');

console.log("\nBem-Vindo ao Banco Virtual!\n");

let nome = prompt("Digite o nome do cliente: ");
let cfp = Number(prompt('Digite o CPF do cliente: '));
let email = prompt("Digite o email do cliente: ");

const cliente = new Cliente(nome, cfp, email);
console.log('\nCliente registrado com sucesso: \n');

const transacoes = new Transacoes();

function depositar(conta, valor) {
    if (valor > 0) {
        conta.realizarDeposito(valor);
        console.log('\nDepósito realizado com sucesso.\n');
    } else {
        console.log('Valor de depósito inválido.');
    }
}

function criarConta() {
    const numeroConta = prompt("Digite o número da conta: ");
    const saldoInicial = parseFloat(prompt("Digite o saldo inicial da conta: "));
    const novaConta = new ContaBancaria(numeroConta, saldoInicial);
    cliente.registrarConta(novaConta);
    console.log(`\nConta ${numeroConta} registrada com sucesso.\n`);
}

function transferir(origem, destino, valor) {
    const contaOrigem = cliente.encontrarConta(origem);
    const contaDestino = cliente.encontrarConta(destino);
    if (contaOrigem && contaDestino) {
        if (contaOrigem.realizarTransferencia(valor, contaDestino)) {
            console.log('\nTransferência realizada com sucesso.\n');
            transacoes.registrarTransacao(origem, destino, valor);
        } else {
            console.log('Saldo insuficiente na conta de origem.');
        }
    } else {
        console.log('Conta(s) não encontrada(s).');
    }
}

function exibirTransacoes(numeroConta) {
    const listaTransacoes = transacoes.listarTransacoes(numeroConta);
    console.log(`\nTransações da conta ${numeroConta}:`);
    listaTransacoes.forEach((transacao) => {
        console.log(`Origem: ${transacao.origem}, Destino: ${transacao.destino}, Valor: ${transacao.valor}, Data: ${transacao.data}`);
    });
}

function exibirMenu() {
    console.log('\nESCOLHA SUA OPERAÇÃO');
    console.log('1. Realizar Depósito em uma conta');
    console.log('2. Realizar Saque de uma conta');
    console.log('3. Consultar saldo de uma conta');
    console.log('4. Criar uma nova conta');
    console.log('5. Transferir entre contas');
    console.log('6. Listar transações de uma conta');
    console.log('7. Sair');

    const escolha = prompt('Escolha sua opção: ');

    switch (escolha) {
        case '1':
            const contaNumeroDeposito = prompt("Digite o número da conta para depósito: ");
            const valorDeposito = parseFloat(prompt("Digite o valor do depósito: "));
            const contaDeposito = cliente.encontrarConta(contaNumeroDeposito);
            if (contaDeposito) {
                depositar(contaDeposito, valorDeposito);
            } else {
                console.log('Conta não encontrada.');
            }
            exibirMenu();
            break;

        case '2':
            const contaNumeroSaque = prompt("Digite o número da conta para saque: ");
            const valorSaque = parseFloat(prompt("Digite o valor do saque: "));
            const contaSaque = cliente.encontrarConta(contaNumeroSaque);
            if (contaSaque) {
                contaSaque.realizarSaque(valorSaque);
                console.log('\nSaque realizado com sucesso.\n');
            } else {
                console.log('Conta não encontrada.');
            }
            exibirMenu();
            break;

        case '3':
            const contaNumeroSaldo = prompt("Digite o número da conta para consultar saldo: ");
            const contaSaldo = cliente.encontrarConta(contaNumeroSaldo);
            if (contaSaldo) {
                console.log(`Saldo da conta ${contaNumeroSaldo}: ${contaSaldo.consultarSaldo()}`);
            } else {
                console.log('Conta não encontrada.');
            }
            exibirMenu();
            break;

        case '4':
            criarConta();
            exibirMenu();
            break;

        case '5':
            const contaOrigem = prompt("Digite o número da conta de origem: ");
            const contaDestino = prompt("Digite o número da conta de destino: ");
            const valorTransferencia = parseFloat(prompt("Digite o valor da transferência: "));
            transferir(contaOrigem, contaDestino, valorTransferencia);
            exibirMenu();
            break;

        case '6':
            const contaNumeroTransacoes = prompt("Digite o número da conta para listar as transações: ");
            exibirTransacoes(contaNumeroTransacoes);
            exibirMenu();
            break;

        case '7':
            console.log('Saindo...');
            break;

        default:
            console.log('Opção inválida!');
            exibirMenu();
    }
}

exibirMenu();
