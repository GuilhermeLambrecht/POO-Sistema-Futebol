/**
 * Subclasse Goleiro
 * 
 * Herança e Polimorfismo:
 * - Herança: Herda de 'Jogador' os atributos comuns e lógica de validação.
 * - Especialização: Adiciona o atributo exclusivo '_reflexo' representativo da agilidade do Goleiro.
 * - Polimorfismo: Sobrescreve 'exibirFicha()' e 'jogarPartida()' (perde 5 de energia ao realizar defesas).
 */

import { Jogador } from "./Jogador";

export class Goleiro extends Jogador {
  private _reflexo: number;

  /**
   * Construtor da classe Goleiro.
   * @param nome Nome do jogador.
   * @param camisa Número da camisa.
   * @param energia Energia inicial.
   * @param reflexo Atributo de capacidade de reflexo para defesas.
   */
  constructor(nome: string, camisa: number, energia: number, reflexo: number) {
    super(nome, camisa, energia);
    this._reflexo = reflexo;
  }

  public get reflexo(): number {
    return this._reflexo;
  }

  public set reflexo(valor: number) {
    this._reflexo = valor;
  }

  public exibirFicha(): string {
    return `[Goleiro] Nome: ${this.nome} | Camisa: ${this.camisa} | Energia: ${this.energia} | Reflexo: ${this.reflexo}`;
  }

  public jogarPartida(): void {
    console.log(`[Goleiro] ${this.nome} saltou no canto oposto e fez uma defesa espetacular!`);
    const novaEnergia = this.energia - 5;
    this.energia = novaEnergia < 0 ? 0 : novaEnergia;
  }
}
