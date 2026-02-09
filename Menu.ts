import { Colors } from './src/util/Colors'
import { Conta } from "./src/model/Conta";
import { Input } from "./src/util/Input";
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaController } from './src/controller/ContaController';
import { ContaPoupanca } from './src/model/ContaPoupanca';

// criar um objeto global da classe ContaController
const contas = new ContaController();

// criar um array contendo os tipos de conta
const tiposContas = ['Conta Corrente', 'Conta Poupança']

let opcao: number
/*
instaciar objetos da classe conta

const c1 = new Conta(1, 1234, "Sofia", 1, 100000.00);

//teste metodo sacar
console.log('Sacar 100.00: ', c1.sacar(100));
console.log('Sacar 200000.00', c1.sacar(200000));
console.log('Sacar 0:', c1.sacar(0));

//teste do metodo depositar

console.log('Depositar -10: ')
c1.depositar(-10)

console.log('Depositar 500: ')
c1.depositar(500)

c1.visualizar
*/
/* teste de classe conta corrente

const cc1 = new ContaCorrente(2, 5678, 'Bianca', 1, 200000.00, 2000);
cc1.agencia = 123
console.log(cc1)
*/

// teste
criarContasTeste();

do {
    console.log(Colors.bg.black, Colors.fg.yellow,
        '*****************************************************')
    console.log('                                                     ')
    console.log('                BANCO DO BRAZIL COM Z                ')
    console.log('                                                     ')
    console.log('*****************************************************')
    console.log('                                                     ')
    console.log('            1 - Criar Conta                          ')
    console.log('            2 - Listar todas as Contas               ')
    console.log('            3 - Buscar Conta por Numero              ')
    console.log('            4 - Atualizar Dados da Conta             ')
    console.log('            5 - Apagar Conta                         ')
    console.log('            6 - Sacar                                ')
    console.log('            7 - Depositar                            ')
    console.log('            8 - Transferir valores entre Contas      ')
    console.log('            9 - Procurar conta por nome do titular   ')
    console.log('            0 - Sair                                 ')
    console.log('                                                     ')
    console.log('*****************************************************')
    console.log('                                                     ',
        Colors.reset)

    opcao = Input.questionInt(Colors.fg.blue + 'Escolha a opcao: ' + Colors.reset)

    switch (opcao) {
        case 1:
            console.log(Colors.fg.green, 'Criando conta!', Colors.reset)
            criarConta()
            pause()
            break
        case 2:
            console.log(Colors.fg.green, 'Listando todas as contas', Colors.reset)
            contas.listarTodas()
            pause()
            break
        case 3:
            console.log(Colors.fg.green, 'Buscando conta por numero', Colors.reset)
            buscaContaPorNumero();
            pause()
            break
        case 4:
            console.log(Colors.fg.green, 'Atualizando dados da conta', Colors.reset)
            atualizarConta()
            pause()
            break
        case 5:
            console.log(Colors.fg.green, 'Apagando conta', Colors.reset)
            deletarContaPorNumero()
            pause()
            break
        case 6:
            console.log(Colors.fg.green, 'Sacar', Colors.reset)
            sacar()
            pause()

            break
        case 7:
            console.log(Colors.fg.green, 'Depositar', Colors.reset)
            pause()

            break
        case 8:
            console.log(Colors.fg.green, 'Transferir', Colors.reset)
            pause()

            break
        case 0:
            sobre()
            console.log('\nPrograma encerrado!')
            break
        default:
            console.log(Colors.fg.redstrong, 'Opção Invalida!', Colors.reset)
            pause()

    }
} while (opcao !== 0)

// op 1: criar uma nova conta
function criarConta() {
    console.log('Digite o numero da agencia: ')
    const agencia = Input.questionInt('')
    console.log('Digite o nome do titular: ')
    const titular = Input.question('')
    console.log('Digite o tipo da conta: ')
    const tipo = Input.keyInSelect(tiposContas, '', { cancel: false }) + 1
    console.log('Digite o saldo da conta: ')
    const saldo = Input.questionFloat('')

    switch (tipo) {
        case 1: //conta corrente
            console.log('Digite o limite da conta: ')
            const limite = Input.questionFloat('')
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
            break

        case 2:// conta poupanca
            console.log('Digite o aniversario da conta: ')
            const aniversario = Input.questionInt('')
            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario))
            break
    }
    console.log('Digite o limite da conta: ')

    console.log('Digite o dia do aniversario da conta: ')

}

// op 3 buscar conta por numero
function buscaContaPorNumero(): void {
    console.log('Digite o número da conta: ')
    const numero = Input.questionInt('')
    contas.procurarPorNumero(numero);
}

//op 4 atualizar
function atualizarConta(): void {
    console.log('Digite o número da conta: ')
    const numero = Input.questionInt('')
    const conta = contas.buscarNoArray(numero)

    if (conta !== null) {

        // guarda os valores atuais da conta
        let agencia = conta.agencia
        let titular = conta.titular
        const tipo = conta.tipo
        let saldo = conta.saldo

        // atualizacao da agencia
        console.log(`\nAgencia Atual: ${agencia}`)
        console.log('Digite o número da nova agencia \n (Pressione ENTER para manter o valor atual')
        let entrada = Input.question('')

        agencia = entrada.trim() === '' ? agencia : parseInt(entrada)

        // atualizacao do titular
        console.log(`\nNome do atual titular: ${titular}`)
        console.log('Digite o novo nome do titular \n (Pressione ENTER para manter o valor atual')
        entrada = Input.question('')

        titular = entrada.trim() === '' ? titular : entrada

        // atualizacao do saldo
        console.log(`\nSaldo Atual: ${saldo}`)
        console.log('Digite o número do novo saldo \n (Pressione ENTER para manter o valor atual')
        entrada = Input.question('')

        saldo = entrada.trim() === '' ? saldo : parseFloat(entrada.replace(',', '.'))

        // verificar tipo de conta
        switch (tipo) {
            case 1: //conta corrente
                let limite = (conta as ContaCorrente).limite

                // atualizacao do limite
                console.log(`\nLimite Atual: ${limite}`)
                console.log('Digite o número do novo limite \n (Pressione ENTER para manter o valor atual')
                entrada = Input.question('')

                limite = entrada.trim() === '' ? limite : parseFloat(entrada.replace(',', '.'))

                contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));
                break

            case 2:// conta poupanca
                let aniversario: number = (conta as ContaPoupanca).aniversario

                // atualizacao do aniversario
                console.log(`\nAniversario Atual: ${aniversario}`)
                console.log('Digite o novo dia do aniversario \n (Pressione ENTER para manter o valor atual')

                entrada = Input.question('')

                aniversario = entrada.trim() === '' ? aniversario : parseInt(entrada)
                contas.atualizar(new ContaPoupanca(numero, agencia, titular, tipo, saldo, aniversario))
                break
        }
    } else {
        console.log(Colors.fg.red, `A conta numero ${numero} não existe!`, Colors.reset)
    }
}

// op 5 deletar con por numero
function deletarContaPorNumero(): void {
    console.log('Digite o número da conta: ')
    const numero = Input.questionInt('')
    const confirmar = Input.keyInYN('Tem certeza que quer deletar? ')
    if (confirmar === true) {
        contas.deletar(numero)
    } else {
        console.log('Operação Cancelada!')
    }
}

function sacar(): void {
    console.log(Colors.fg.greenstrong, 
        '\nSaque', 
        Colors.reset);

    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {
        console.log("Digite o valor do saque: ");
        const valor = Input.questionFloat("");

        // Chama o método sacar do Controller que já faz a validação de saldo
        contas.sacar(numero, valor); 
    } else {
        console.log(Colors.fg.red, 
            `\nA Conta número ${numero} não foi encontrada!`, 
            Colors.reset);
    }
}



function sobre(): void {
    console.log(Colors.fg.greenstrong, '\nProjeto desenvolvido por Marcus Wendell', Colors.reset)
}
function pause(): void {
    console.log('Pressione enter para continuar: ')
    Input.prompt()
}

function criarContasTeste(): void {

    // Instâncias da Classe ContaCorrente
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1, 1000.00, 100.00));

    // Instâncias da Classe ContaPoupança
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));

}
