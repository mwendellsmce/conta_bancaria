import { Conta } from "../model/Conta";

export interface ContaRepository{

    // metodos do crud(creat, read, update, delete)

    procurarPorNumero(numero: number): void;
    listarTodas(): void;
    cadastrar(conta: Conta): void;
    atualizar(counta: Conta): void;
    deletar(numero: number): void;

    // metodos bancarios
    sacar(numero: number, valor: number): void;
    depositar(numero: number, valor: number): void;
    transferir(numeroOrigim: number, numeroDestino: number, valor: number): void;

}