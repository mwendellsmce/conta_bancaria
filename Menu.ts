import { Colors } from './src/util/Colors'
import { Input } from "./src/util/Input";
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaController } from './src/controller/ContaController';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { formatarMoeda } from "./src/util/Currency";

// criar um objeto global da classe ContaController
const contas = new ContaController();

// criar um array contendo os tipos de conta
const tiposContas = ['Conta Corrente', 'Conta Poupança']

let opcao: number

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
            listarTodasContas()            
            pause()
            break
        case 3:
            console.log(Colors.fg.green, 'Buscando conta por numero', Colors.reset)
            buscaContaPorNumero()
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
            depositar()
            pause()

            break
        case 8:
            console.log(Colors.fg.green, 'Transferir', Colors.reset)
            transferir()
            pause()

            break
        case 9:
            console.log(Colors.fg.green,`\nProcurar Conta por Nome do Titular\n`, Colors.reset)
            procurarPorTitular()
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
}

// op 2 listar todas as contas
function listarTodasContas(): void{
    contas.listarTodas();
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

    // se a conta existir
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
        console.log(`\n${formatarMoeda(saldo)}`)
        console.log('Digite o número do novo saldo \n (Pressione ENTER para manter o valor atual')
        entrada = Input.question('')

        saldo = entrada.trim() === '' ? saldo : parseFloat(entrada.replace(',', '.'))

        // verificar tipo de conta
        switch (tipo) {
            case 1: //conta corrente
                let limite = (conta as ContaCorrente).limite

                // atualizacao do limite
                console.log(`\nLimite Atual: ${formatarMoeda(limite)}`)
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

// op 5 deletar conta por numero
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
    console.log('Digite o número da conta: ')
    const numero = Input.questionInt('')
    
    const conta = contas.buscarNoArray(numero)

    if(conta !== null){
        console.log('Digite o valor do saque: ')
        const valor = Input.questionFloat('')

        contas.sacar(numero, valor)
    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset)
    }
}

function depositar(): void{

    console.log('Digite o número da conta: ')
    const numero = Input.questionInt('')
    
    const conta = contas.buscarNoArray(numero)

    if(conta !== null){
        console.log('Digite o valor do depósito: ')
        const valor = Input.questionFloat('')

        contas.depositar(numero, valor)
    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset)
    }
}

function transferir(): void{

    console.log('Digite o número da Conta de Origem: ')
    const numeroOrigem = Input.questionInt('')

    console.log('Digite o número da Conta de Destino: ')
    const numeroDestino = Input.questionInt("")

    const contaOrigem = contas.buscarNoArray(numeroOrigem);
    const contaDestino = contas.buscarNoArray(numeroDestino);

    if(contaOrigem === null){

        console.log(Colors.fg.red, `A Conta de Origem número ${numeroOrigem} não foi encontrada!`, Colors.reset);

    }else if(contaDestino === null)    {

        console.log(Colors.fg.red, `A Conta de Destino número ${numeroDestino} não foi encontrada!`, Colors.reset);

    }else{
        console.log("Digite o valor da Transferência: ");
        const valor = Input.questionFloat("");

        contas.transferir(numeroOrigem, numeroDestino, valor);
    }
}

function procurarPorTitular(): void{

    // Solicita o nome do titular
    console.log("'Digite o Nome do Titular: ");
    const titular = Input.question("");

    // Localiza a conta a partir do nome do titular
    contas.procurarPorTitular(titular);
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

