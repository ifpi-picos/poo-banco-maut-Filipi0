const Notificacao = require('./Notificacao');

class Notificacao_sms extends Notificacao{
  constructor(cliente){
    super(cliente);
}
  enviarNotificacao(mensagem){
    console.log(`\n<<Notificação por SMS>> ${mensagem}`);
}
}

module.exports = Notificacao_sms;
