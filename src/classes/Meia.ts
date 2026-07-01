/**
 * Subclasse Meia
 * 
 * Herança e Polimorfismo:
 * - Herança: Herda de 'Jogador' os atributos comuns e lógica de validação.
 * - Especialização: Adiciona o atributo exclusivo '_visao' representativo da habilidade de armador do Meia.
 * - Polimorfismo: Sobrescreve 'exibirFicha()' e 'jogarPartida()' (perde 8 de energia ao distribuir jogo).
 */

import { Jogador } from "./Jogador";

export class Meia extends Jogador {
  private _visao: number;

  /**
   * Construtor da classe Meia.
   * @param nome Nome do jogador.
   * @param camisa Número da camisa.
   * @param energia Energia inicial.
   * @param visao Atributo de capacidade de visão de jogo.
   */
  constructor(nome: string, camisa: number, energia: number, visao: number) {
    super(nome, camisa, energia);
    this._visao = visao;
  }

  public get visao(): number {
    return this._visao;
  }

  public set visao(valor: number) {
    this._visao = valor;
  }

  public exibirFicha(): string {
    return `[Meia] Nome: ${this.nome} | Camisa: ${this.camisa} | Energia: ${this.energia} | Visão: ${this.visao}`;
  }

  public jogarPartida(): void {
    console.log(`[Meia] ${this.nome} ditou o ritmo e distribuiu o jogo de forma inteligente!`);
    const novaEnergia = this.energia - 8;
    this.energia = novaEnergia < 0 ? 0 : novaEnergia;
  }
}
