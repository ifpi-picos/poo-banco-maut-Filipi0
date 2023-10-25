class Notificacao{
    constructor(cliente){
      this.cliente = cliente;
    }
  
    enviarNotificacao(mensagem){
      console.log(`[**Uma Transação foi efetuada!**] ${mensagem}`);
    }
  }
  
  module.exports = Notificacao;
  