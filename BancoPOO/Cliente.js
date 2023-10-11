class Cliente {
  constructor(nome, cfp, email) {
      this.nome = nome;
      this.cfp = cfp;
      this.email = email;
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
