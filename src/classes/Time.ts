/**
 * Classe Time
 * 
 * Encapsulamento de Relações (Associação):
 * - Representa o time de futebol que contém uma lista (elenco) de jogadores.
 * - O array '_elenco' é estritamente privado, impedindo alterações diretas de fora.
 * - O getter de elenco retorna uma cópia rasa ('[...this._elenco]') para evitar que
 *   métodos externos modifiquem a estrutura interna original do elenco (quebra de encapsulamento).
 * - Centraliza as regras de negócio de contratação: limite máximo de 11 jogadores e
 *   proibição de números de camisa duplicados.
 */

import { Jogador } from "./Jogador";
import { TimeLotadoError, CamisaDuplicadaError } from "../errors/erros";

export class Time {
  private _nomeDoTime: string;
  private _elenco: Jogador[];

  /**
   * Construtor da classe Time.
   * @param nomeDoTime Nome do time de futebol.
   */
  constructor(nomeDoTime: string) {
    this._nomeDoTime = nomeDoTime;
    this._elenco = [];
  }

  /**
   * Getter para o nome do time.
   */
  public get nomeDoTime(): string {
    return this._nomeDoTime;
  }

  /**
   * Setter para o nome do time.
   */
  public set nomeDoTime(nome: string) {
    this._nomeDoTime = nome;
  }

  /**
   * Getter para o elenco de jogadores.
   * Retorna uma cópia para preservar o encapsulamento do array original.
   */
  public get elenco(): Jogador[] {
    return [...this._elenco];
  }

  /**
   * Contrata um novo jogador para o time.
   * Aplica validações estritas de tamanho do elenco e numeração de camisa.
   * @param jogador O jogador a ser contratado.
   * @throws TimeLotadoError Se o elenco já possuir 11 jogadores.
   * @throws CamisaDuplicadaError Se a camisa do jogador já estiver em uso.
   */
  public contratarJogador(jogador: Jogador): void {
    // Regra 1: Limite máximo de 11 jogadores.
    if (this._elenco.length >= 11) {
      throw new TimeLotadoError();
    }

    // Regra 2: Impedir camisas de número repetido no elenco.
    const camisaExistente = this._elenco.some(j => j.camisa === jogador.camisa);
    if (camisaExistente) {
      throw new CamisaDuplicadaError(`Número de camisa ${jogador.camisa} já existente no elenco.`);
    }

    // Insere o jogador no elenco interno.
    this._elenco.push(jogador);
  }

  /**
   * Executa a partida do time, fazendo com que cada jogador no elenco
   * atue sob o seu comportamento específico (polimorfismo).
   * @throws Error Se o time não tiver jogadores para entrar em campo.
   */
  public jogarPartida(): void {
    if (this._elenco.length === 0) {
      throw new Error("Não é possível jogar uma partida sem jogadores no elenco!");
    }
    
    console.log(`\n--- PARTIDA INICIADA: O time ${this._nomeDoTime} entra em campo! ---`);
    
    // Polimorfismo em ação: cada subclasse executa sua própria versão de jogarPartida.
    this._elenco.forEach((jogador) => {
      jogador.jogarPartida();
    });
  }
}
