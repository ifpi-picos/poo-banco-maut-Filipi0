const Notificacao = require('./Notificacao');

class Notificacao_email extends Notificacao{
  constructor(cliente){
    super(cliente);
  }
  enviarNotificacao(mensagem){
    console.log(`\n<<Notificação por Email>> ${mensagem}`);
}
}

module.exports = Notificacao_email;
