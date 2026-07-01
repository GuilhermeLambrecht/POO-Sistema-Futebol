/**
 * Classe Abstrata Jogador
 * 
 * Abstração e Encapsulamento:
 * - Esta classe representa a base conceitual de qualquer jogador no sistema.
 * - Ela é declarada como 'abstract' porque não queremos que jogadores genéricos sejam
 *   instanciados diretamente, apenas posições específicas (Atacante, Meia, etc.).
 * - Ela implementa a interface 'Exibivel', prometendo que seus descendentes saberão se exibir.
 * - O encapsulamento é mantido usando atributos protegidos ('protected'), permitindo que as
 *   subclasses acessem os dados diretamente, mas protegendo-os do acesso externo descontrolado.
 */

import { Exibivel } from "../interfaces/Exibivel";
import { EnergiaInvalidaError } from "../errors/erros";

export abstract class Jogador implements Exibivel {
  // Atributos protegidos: visíveis nesta classe e nas subclasses, mas privados para o restante do código.
  protected _nome: string;
  protected _energia: number;
  protected readonly _camisa: number; // Readonly garante que após o construtor a camisa não possa ser alterada.

  /**
   * Construtor da classe Jogador.
   * @param nome Nome do jogador.
   * @param camisa Número da camisa.
   * @param energia Energia inicial (padrão 100).
   */
  constructor(nome: string, camisa: number, energia: number = 100) {
    this._nome = nome;
    this._camisa = camisa;
    
    // Validação da energia inicial.
    if (energia < 0 || energia > 100) {
      throw new EnergiaInvalidaError();
    }
    this._energia = energia;
  }

  /**
   * Getter para o nome do jogador.
   */
  public get nome(): string {
    return this._nome;
  }

  /**
   * Setter para o nome do jogador.
   */
  public set nome(nome: string) {
    this._nome = nome;
  }

  /**
   * Getter para a energia atual.
   */
  public get energia(): number {
    return this._energia;
  }

  /**
   * Setter para a energia atual, aplicando validação estrita.
   * Lança 'EnergiaInvalidaError' caso o valor esteja fora do intervalo [0, 100].
   */
  public set energia(valor: number) {
    if (valor < 0 || valor > 100) {
      throw new EnergiaInvalidaError();
    }
    this._energia = valor;
  }

  /**
   * Getter para o número da camisa. Não há setter correspondente, tornando o atributo readonly.
   */
  public get camisa(): number {
    return this._camisa;
  }

  /**
   * Método Abstrato exibirFicha
   * Deve ser obrigatoriamente implementado por todas as subclasses.
   */
  public abstract exibirFicha(): string;

  /**
   * Método Abstrato jogarPartida
   * Define o comportamento polimórfico de gastar energia na partida, implementado por cada posição.
   */
  public abstract jogarPartida(): void;
}
