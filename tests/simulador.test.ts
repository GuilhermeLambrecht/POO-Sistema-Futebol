/**
 * Arquivo de Testes Automatizados (simulador.test.ts)
 * 
 * Qualidade de Software e Testes Unitários:
 * - Desenvolvido utilizando o framework Jest e executado através do ts-jest.
 * - Todos os testes seguem rigorosamente o padrão AAA (Arrange, Act, Assert):
 *   1. Arrange (Preparar): Configura o ambiente, cria objetos e define parâmetros.
 *   2. Act (Agir): Executa a ação ou método que se deseja testar.
 *   3. Assert (Verificar): Compara os resultados obtidos com os esperados, validando a correção.
 */

import { Time } from "../src/classes/Time";
import { Atacante } from "../src/classes/Atacante";
import { TimeLotadoError, CamisaDuplicadaError, EnergiaInvalidaError } from "../src/errors/erros";

describe("Testes Unitários da classe Time", () => {
  
  test("Garantir que a 12ª tentativa de contratarJogador() lança TimeLotadoError", () => {
    // 1. Arrange (Preparar): Criar time e preenchê-lo com o limite máximo de 11 jogadores
    const time = new Time("Test FC");
    for (let i = 1; i <= 11; i++) {
      time.contratarJogador(new Atacante(`Jogador ${i}`, i, 100, 80));
    }
    const novoJogador = new Atacante("Jogador 12", 12, 100, 80);

    // 2. Act (Agir) & 3. Assert (Verificar)
    // Esperamos que a contratação do 12º jogador lance um erro específico do tipo TimeLotadoError
    expect(() => {
      time.contratarJogador(novoJogador);
    }).toThrow(TimeLotadoError);
  });

  test("Garantir que contratarJogador() lança CamisaDuplicadaError ao repetir um número de camisa", () => {
    // 1. Arrange (Preparar): Criar o time e contratar o primeiro jogador com a camisa 10
    const time = new Time("Test FC");
    const jogador1 = new Atacante("Neymar", 10, 100, 95);
    const jogador2 = new Atacante("Messi", 10, 100, 98);
    time.contratarJogador(jogador1);

    // 2. Act (Agir) & 3. Assert (Verificar)
    // Esperamos que tentar contratar o segundo jogador com o mesmo número 10 resulte em CamisaDuplicadaError
    expect(() => {
      time.contratarJogador(jogador2);
    }).toThrow(CamisaDuplicadaError);
  });
});

describe("Testes Unitários da classe Jogador (Atacante)", () => {
  
  test("Garantir que jogarPartida() reduz a energia corretamente", () => {
    // 1. Arrange (Preparar): Criar um atacante com 100 de energia. O desgaste esperado para atacante é de 15 pontos.
    const atacante = new Atacante("Gabigol", 9, 100, 85);
    const energiaEsperada = 85; // 100 - 15 = 85

    // 2. Act (Agir): Fazer o jogador jogar uma partida
    atacante.jogarPartida();

    // 3. Assert (Verificar): Garantir que a energia final corresponde ao esperado
    expect(atacante.energia).toBe(energiaEsperada);
  });

  test("Garantir que setar energia para um valor fora de 0-100 lança EnergiaInvalidaError", () => {
    // 1. Arrange (Preparar): Instanciar um atacante válido
    const atacante = new Atacante("Gabigol", 9, 100, 85);

    // 2. Act (Agir) & 3. Assert (Verificar)
    // Caso de teste A: Energia acima de 100 deve falhar e lançar EnergiaInvalidaError
    expect(() => {
      atacante.energia = 101;
    }).toThrow(EnergiaInvalidaError);

    // Caso de teste B: Energia abaixo de 0 deve falhar e lançar EnergiaInvalidaError
    expect(() => {
      atacante.energia = -1;
    }).toThrow(EnergiaInvalidaError);
  });
});
