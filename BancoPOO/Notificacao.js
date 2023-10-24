class Notificacao{
    constructor(cliente){
      this.cliente = cliente;
    }
  
    enviarNotificacao(mensagem){
      console.log(`[Uma Transação foi efetuada! ${this.cliente.nome}] ${mensagem}`);
    }
  }
  
  module.exports = Notificacao;
  