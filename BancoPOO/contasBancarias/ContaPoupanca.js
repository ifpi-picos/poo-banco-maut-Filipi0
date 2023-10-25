const ContaBancaria = require('./ContaBancaria');

class ContaPoupanca extends ContaBancaria{
    constructor(numero, saldo, taxaRendimento, taxaSaque, taxaTransferencia){
      super(numero, saldo);
      this.taxaRendimento = taxaRendimento;
      this.taxaSaque = taxaSaque;
      this.taxaTransferencia = taxaTransferencia;
    }
  
    realizarSaque(valor){
      const valorComTaxa = valor * (1 + this.taxaSaque);
      super.realizarSaque(valorComTaxa);
    }
  
    realizarTransferencia(valor, contaDestino){
      const valorComTaxa = valor * (1 + this.taxaTransferencia);
      if (super.realizarTransferencia(valorComTaxa, contaDestino)){
        return true;
      }
      return false;
    }
  
    realizarDeposito(valor){
      const valorComRendimento = valor * (1 + this.taxaRendimento);
      super.realizarDeposito(valorComRendimento);
    }
  }
  
  module.exports = ContaPoupanca;