class Endereco{
    constructor(cidade, bairro, numero, rua){
        this.cidade = cidade
        this.bairro = bairro
        this.numero = numero
        this.rua = rua
    }

    enderecoCompleto(){
        return `${this.bairro}, ${this.rua}, ${this.cidade},${this.numero}`;
    }
}

module.exports = Endereco;