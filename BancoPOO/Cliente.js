class Cliente {
  constructor(nome, cfp, dataNascimento) {
      this.nome = nome;
      this.cfp = cfp;
      this.dataNascimento = dataNascimento;
      this.contas = [];
  }

  registrarConta(conta) {
      this.contas.push(conta);
  }

  encontrarConta(numeroConta) {
      return this.contas.find((conta) => conta.numero === numeroConta);
  }
}

module.exports = Cliente;
