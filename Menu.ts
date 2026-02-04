import { Colors } from './src/util/Colors'
import { Conta } from "./src/model/Conta";
import { Input } from "./src/util/Input";

let opcao: number

//instaciar objetos da classe conta

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
        console.log('            9 - Sair                                 ')
        console.log('                                                     ')
        console.log('*****************************************************')
        console.log('                                                     ', 
        Colors.reset)

    opcao = Input.questionInt(Colors.fg.blue + 'Escolha a opcao: ' + Colors.reset)

    switch (opcao) {
        case 1:
            console.log(Colors.fg.green, 'Criando conta!', Colors.reset)

            pause()
            break
        case 2:
            console.log(Colors.fg.green, 'Listando todas as contas', Colors.reset)

            pause()
            break
        case 3:
            console.log(Colors.fg.green, 'Buscando conta por numero', Colors.reset)
            
            pause()
            break
        case 4:
            console.log(Colors.fg.green, 'Atualizando dados da conta', Colors.reset)

            pause()
            break
        case 5:
            console.log(Colors.fg.green,'Apagando conta', Colors.reset)

            pause()
            break
        case 6:
            console.log(Colors.fg.green, 'Sacar', Colors.reset)
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
        case 9:
            sobre()
            console.log('\nPrograma encerrado!')
            break
        default:
            console.log(Colors.fg.redstrong, 'Opção Invalida!', Colors.reset)
            pause()

    }
} while (opcao !== 9)

function sobre(): void {
    console.log(Colors.fg.greenstrong, '\nProjeto desenvolvido por Marcus Wendell', Colors.reset)
}
function pause(): void {
    console.log('Pressione enter para continuar: ')
    Input.prompt()
}
