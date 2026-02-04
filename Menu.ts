import leia from "readline-sync"
import { Colors } from './src/util/Colors'

let opcao: number
//menu do while
do {
    console.log(Colors.bg.green, Colors.fg.yellow,
        '*****************************************          \n')
    console.log('          BANCO DO BRAZIL COM Z            ')
    console.log('\n*****************************************\n')
    console.log('1 - criar conta')
    console.log('2 - Listar todas as contas')
    console.log('3 - Buscar conta por Numero')
    console.log('4 - Atualizar dados da conta')
    console.log('5 - Apagar conta')
    console.log('6 - Sacar')
    console.log('7 - Depositar')
    console.log('8 - Transferir')
    console.log('9 - Sair')
    console.log('*****************************************      ')
    console.log('                                               ',
        Colors.reset)

    opcao = leia.questionInt(Colors.fg.blue + 'Escolha a opcao: ' + Colors.reset)

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
    leia.prompt()
}
