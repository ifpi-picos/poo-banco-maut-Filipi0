class Transacoes {
  constructor() {
      this.transacoes = [];
  }

  registrarTransacao(origem, destino, valor) {
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
