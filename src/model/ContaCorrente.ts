import { Colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaCorrente extends Conta {

    // Atributos especificos de Conta Corrente
    private _limite: number;

    constructor(
        numero: number,
        agencia: number,
        titular: string,
        tipo: number,
        saldo: number,
        limite: number) {
        super(numero, agencia, titular, tipo, saldo);
        this._limite = limite;
    }

    // metodos get e setter especificos da classe conta corrente

    public get limite(): number {
        return this._limite;
    }


    public set limite(value: number) {
        this._limite = value;
    }

    public sacar(valor: number): boolean {

        if (valor <= 0) {
            console.log(Colors.fg.red, '\nO valor deve ser positivo!', Colors.reset);
            return false;
        }

        if ((this.saldo + this.limite) < valor) {
            console.log(Colors.fg.red, '\nSaldo Insuficiente!', Colors.reset);
            return false;
        }

        this.saldo -= valor; 
        return true;
    }

    // metodo visualizar sobre escrito por porlemofismo
    public visualizar(): void {
        super.visualizar();
        console.log(`Limite da Conta: R$ ${this._limite.toFixed(2)}`);
    }
} 
