/**
 * Subclasse Atacante
 * 
 * Herança e Polimorfismo:
 * - Herança: Herda de 'Jogador' todos os atributos comuns (nome, camisa, energia) e lógica de validação.
 * - Especialização: Adiciona o atributo exclusivo '_finalizacao' representativo da habilidade do Atacante.
 * - Polimorfismo: Sobrescreve 'exibirFicha()' para exibir seus dados e habilidade exclusiva, e
 *   'jogarPartida()', que simula uma ação característica de sua posição reduzindo a energia em 15.
 */

import { Jogador } from "./Jogador";

export class Atacante extends Jogador {
  // Atributo privado e específico do Atacante.
  private _finalizacao: number;

  /**
   * Construtor da classe Atacante.
   * @param nome Nome do jogador.
   * @param camisa Número da camisa.
   * @param energia Energia inicial.
   * @param finalizacao Atributo de capacidade de finalização de jogadas.
   */
  constructor(nome: string, camisa: number, energia: number, finalizacao: number) {
    // Chama o construtor da classe pai (Jogador) para inicializar os atributos herdados.
    super(nome, camisa, energia);
    this._finalizacao = finalizacao;
  }

  /**
   * Getter para o atributo finalizacao.
   */
  public get finalizacao(): number {
    return this._finalizacao;
  }

  /**
   * Setter para o atributo finalizacao.
   */
  public set finalizacao(valor: number) {
    this._finalizacao = valor;
  }

  /**
   * Implementação do contrato exibirFicha da interface Exibivel.
   * Retorna os dados específicos do atacante formatados.
   */
  public exibirFicha(): string {
    return `[Atacante] Nome: ${this.nome} | Camisa: ${this.camisa} | Energia: ${this.energia} | Finalização: ${this.finalizacao}`;
  }

  /**
   * Implementação polimórfica de jogarPartida.
   * O atacante perde 15 de energia ao final de cada partida ao realizar uma finalização.
   */
  public jogarPartida(): void {
    console.log(`[Atacante] ${this.nome} avançou em velocidade e finalizou a jogada ao gol!`);
    const novaEnergia = this.energia - 15;
    // Garante que a energia não caia abaixo de 0, acionando o setter validado.
    this.energia = novaEnergia < 0 ? 0 : novaEnergia;
  }
}
