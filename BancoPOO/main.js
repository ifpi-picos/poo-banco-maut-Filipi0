const Cliente = require('./Cliente.js');
const ContaCorrente = require('./contasBancarias/ContaCorrente.js');
const ContaPoupanca = require('./contasBancarias/ContaPoupanca.js');
const Transacoes = require('./Transacoes.js');
const Endereco = require('./Endereco.js');
const Notificacao = require('./notificacoes/Notificacao.js');
const Notificacao_email = require('./notificacoes/Notificacao_email.js');
const Notificacao_sms = require('./notificacoes/Notificacao_sms.js');
const ContaBancaria = require('./contasBancarias/ContaBancaria.js');

const cc = new ContaCorrente(123, 0, 100);
const cc2 = new ContaCorrente(456, 0, 100);

const cp = new ContaPoupanca(789, 0, 0.1, 0.1, 0.1);

cc.realizarDeposito(100);
console.log(cc.consultarSaldo());
cc.realizarSaque(50);
console.log(cc.consultarSaldo());
cc.realizarTransferencia(10, cc2);
cc.realizarTransferencia(10, cc2);
cc.realizarTransferencia(10, cc2);
cc.realizarTransferencia(10, cc2);
cc.realizarTransferencia(10, cc2); // não está considerando o limite do cheque especial
cc.realizarTransferencia(10, cc2);
console.log(cc.consultarSaldo());
console.log(JSON.stringify(cc.transacoes)); // faltou o método de exibir extrato/transacoes

cp.realizarDeposito(100);
console.log(cp.consultarSaldo());
cp.realizarSaque(10);
console.log(cp.consultarSaldo());