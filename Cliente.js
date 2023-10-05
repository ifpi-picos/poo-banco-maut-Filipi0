const Conta = require('./Conta');

class Cliente {
  constructor(nome, cpf, dataNascimento) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.contas = [];
  }

  abrirConta(agencia, numeroConta, saldoInicial) {
    const conta = new Conta(agencia, numeroConta, saldoInicial, this);
    this.contas.push(conta);
    return conta;
  }

  exibirContas() {
    console.log(`Contas do cliente ${this.nome}:`);
    this.contas.forEach((conta, index) => {
      console.log(`Conta ${index + 1}: Agência ${conta.agencia}, Número ${conta.numeroConta}, Saldo R$ ${conta.saldo}`);
    });
  }
}

module.exports = Cliente;


