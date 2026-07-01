/**
 * Subclasse Defensor
 * 
 * Herança e Polimorfismo:
 * - Herança: Herda de 'Jogador' os atributos comuns e lógica de validação.
 * - Especialização: Adiciona o atributo exclusivo '_marcacao' representativo da habilidade de marcação do Defensor.
 * - Polimorfismo: Sobrescreve 'exibirFicha()' e 'jogarPartida()' (perde 10 de energia ao fazer desarmes).
 */

import { Jogador } from "./Jogador";

export class Defensor extends Jogador {
  private _marcacao: number;

  /**
   * Construtor da classe Defensor.
   * @param nome Nome do jogador.
   * @param camisa Número da camisa.
   * @param energia Energia inicial.
   * @param marcacao Atributo de capacidade de marcação defensiva.
   */
  constructor(nome: string, camisa: number, energia: number, marcacao: number) {
    super(nome, camisa, energia);
    this._marcacao = marcacao;
  }

  public get marcacao(): number {
    return this._marcacao;
  }

  public set marcacao(valor: number) {
    this._marcacao = valor;
  }

  public exibirFicha(): string {
    return `[Defensor] Nome: ${this.nome} | Camisa: ${this.camisa} | Energia: ${this.energia} | Marcação: ${this.marcacao}`;
  }

  public jogarPartida(): void {
    console.log(`[Defensor] ${this.nome} desarmou o adversário com um desarme preciso na defesa!`);
    const novaEnergia = this.energia - 10;
    this.energia = novaEnergia < 0 ? 0 : novaEnergia;
  }
}
