const ContaBancaria = require('./ContaBancaria');

class ContaCorrente extends ContaBancaria{
    constructor(numero, saldo, limiteChequeEspecial){
      super(numero, saldo)
      this.limiteChequeEspecial = limiteChequeEspecial;
      this.transferenciasSemTaxa = 2; 
    }
  
    realizarTransferencia(valor, contaDestino){
      if (this.transferenciasSemTaxa > 0){
        this.transferenciasSemTaxa--;
      }else{
        valor += valor * 0.10;
      }
      return super.realizarTransferencia(valor, contaDestino);
    }
  }
  module.exports = ContaCorrente;