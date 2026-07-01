/**
 * Interface Exibivel
 * 
 * Uma interface define um "contrato" que outras classes devem cumprir.
 * Ela não contém estado (atributos) nem implementação de métodos.
 * Qualquer classe que implementar 'Exibivel' será obrigada a fornecer
 * uma implementação para o método 'exibirFicha()', retornando uma string.
 * Isso nos permite padronizar a forma como diferentes tipos de objetos se apresentam.
 */
export interface Exibivel {
  /**
   * Método responsável por formatar e retornar a ficha de dados em formato de texto.
   * @returns Uma string contendo os dados formatados para exibição.
   */
  exibirFicha(): string;
}
