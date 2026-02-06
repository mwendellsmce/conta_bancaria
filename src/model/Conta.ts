import { Colors } from "../util/Colors";

export abstract class Conta{
    
    // atributos da classe

    private _numero: number;
    private _agencia: number;
    private _titular: string;
    private _tipo: number;
    private _saldo: number;

    // metodo construtor

	constructor(numero: number, agencia: number, titular: string, tipo: number, saldo: number) {
		this._numero = numero;
		this._agencia = agencia;
		this._titular = titular;
		this._tipo = tipo;
		this._saldo = saldo;
	}

    // Métodos Get e Set
	public get numero(): number {
		return this._numero;
	}

	public get agencia(): number {
		return this._agencia;
	}

	public get tipo(): number {
		return this._tipo;
	}

	public get titular(): string {
		return this._titular;
	}

	public get saldo(): number {
		return this._saldo;
	}

	public set numero(numero: number) {
		this._numero = numero;
	}

	public set agencia(agencia: number) {
		this._agencia = agencia;
	}

	public set tipo(tipo: number) {
		this._tipo = tipo;
	}

	public set titular(titular: string) {
		this._titular = titular;
	}

	public set saldo(saldo: number) {
		this._saldo = saldo;
	}
    
// metodos auxiliares

public sacar(valor:number): boolean {
    if(valor <= 0){
            console.log(Colors.fg.red, "O valor deve ser positivo", Colors.reset)
            return false
        }
        if(valor > this._saldo){
            console.log(Colors.fg.red, "Saldo Insuficiente!", Colors.reset)
            return false
        }
        this._saldo -= valor
        return true
    }

 public depositar(valor: number): void {
    if(valor <= 0)
        console.log(Colors.fg.red, "O valor deve ser positivo", Colors.reset)
    else
        this._saldo += valor
}


public visualizar(): void{
    let tipo: string

        switch(this._tipo){
            case 1:
                tipo = "Conta Corrente"
            break
            case 2:
                tipo = "Conta Poupança"
            break
            default:
                tipo = "Tipo Inválido"
        }

        console.log('\n************************************')
        console.log('        DADOS DA CONTA              ')
        console.log('************************************')
        console.log(`Número da conta: ${this._numero}`)
        console.log(`Número da agência: ${this._agencia}`)
        console.log(`Nome do titular: ${this._titular}`)
        console.log(`Tipo da conta: ${tipo}`)
        console.log(`Saldo da conta: R$ ${this._saldo.toFixed(2)}`)
}
}