/**
 * Módulo de Exceções Customizadas do Sistema
 * 
 * Centraliza os erros de domínio específicos da aplicação.
 * Estender a classe nativa 'Error' permite criar tipos de erros próprios,
 * facilitando a captura e o tratamento específico no menu (Main) usando 'instanceof'.
 */

/**
 * Erro lançado quando a energia fornecida está fora do intervalo válido de 0 a 100.
 */
export class EnergiaInvalidaError extends Error {
  constructor(message: string = "A energia do jogador deve estar entre 0 e 100.") {
    super(message);
    this.name = "EnergiaInvalidaError";
    
    // Define explicitamente o protótipo para garantir que a verificação 'instanceof'
    // funcione corretamente em ambientes compilados para ES5/CommonJS.
    Object.setPrototypeOf(this, EnergiaInvalidaError.prototype);
  }
}

/**
 * Erro lançado ao tentar contratar um novo jogador quando o time já atingiu o limite de 11 jogadores.
 */
export class TimeLotadoError extends Error {
  constructor(message: string = "Elenco completo. Não é possível contratar mais de 11 jogadores.") {
    super(message);
    this.name = "TimeLotadoError";
    Object.setPrototypeOf(this, TimeLotadoError.prototype);
  }
}

/**
 * Erro lançado ao tentar contratar um jogador com um número de camisa que já pertence a outro jogador do elenco.
 */
export class CamisaDuplicadaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CamisaDuplicadaError";
    Object.setPrototypeOf(this, CamisaDuplicadaError.prototype);
  }
}
