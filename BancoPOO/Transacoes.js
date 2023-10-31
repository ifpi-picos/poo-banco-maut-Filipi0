// nome da classe deveria ser no singular
class Transacoes {
  constructor() {
    this.transacoes = [];
  }

  registrarTransacao(origem, destino, valor) {
    // as propriedades desse objeto deveria ser os atributos da classe
    const transacao = {
      origem: origem,
      destino: destino,
      valor: valor,
      data: new Date(),
    };
    this.transacoes.push(transacao);
  }

  listarTransacoes(numeroConta) {
    return this.transacoes.filter(
      (transacao) =>
        transacao.origem === numeroConta || transacao.destino === numeroConta
    );
  }
}

module.exports = Transacoes;
