class Conta {
  constructor(agencia, numeroConta, saldo, cliente) {
    this.agencia = agencia;
    this.numeroConta = numeroConta;
    this.saldo = saldo;
    this.cliente = cliente;
    this.transacoes = [];
  }

  depositar(valor) {
    if (valor > 0) {
      this.saldo += valor;
      this.registrarTransacao(`Depósito de R$ ${valor}`);
    }
  }

  sacar(valor) {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      this.registrarTransacao(`Saque de R$ ${valor}`);
    }
  }

  transferir(valor, contaDestino) {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      contaDestino.depositar(valor);
      this.registrarTransacao(`Transferência de R$ ${valor} para Conta ${contaDestino.numeroConta}`);
    }
  }

  exibirExtrato() {
    console.log(`Extrato da Conta ${this.numeroConta}:`);
    this.transacoes.forEach((transacao, index) => {
      console.log(`${index + 1}. ${transacao}`);
    });
    console.log(`Saldo Atual: R$ ${this.saldo}\n`);
  }

  registrarTransacao(descricao) {
    this.transacoes.push(descricao);
  }
}

module.exports = Conta;
