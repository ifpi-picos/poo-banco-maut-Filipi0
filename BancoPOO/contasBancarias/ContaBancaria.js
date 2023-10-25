class ContaBancaria {
  constructor(numero, saldo){
      this.numero = numero;
      this.saldo = saldo;
      this.transacoes = [];
  }

  realizarDeposito(valor){
      this.saldo += valor;
      this.transacoes.push(`Deposito de ${valor}`);
  }

  realizarSaque(valor){
      if (valor <= this.saldo){
          this.saldo -= valor;
          this.transacoes.push(`Saque de ${valor}`);
      } else {
          console.log("Saldo insuficiente.");
      }
  }

  realizarTransferencia(valor, contaDestino){
      if (valor <= this.saldo){
          this.saldo -= valor;
          contaDestino.realizarDeposito(valor);
          this.transacoes.push(`Transferência de ${valor} para a conta ${contaDestino.numero}`);
          return true;
      } else {
          console.log("Saldo insuficiente para a transferência.");
          return false;
      }
  }

  consultarSaldo(){
      return this.saldo;
  }
}

module.exports = ContaBancaria;
