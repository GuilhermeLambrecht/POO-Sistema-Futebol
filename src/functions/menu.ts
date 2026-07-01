/**
 * Módulo de Funções Auxiliares do Menu
 * 
 * Separação de Responsabilidades:
 * - Este arquivo armazena as funções procedimentais que lidam com a interface de terminal
 *   e interação com o usuário (inputs/outputs).
 * - Ao remover a lógica de fluxo de dentro do 'Main.ts', mantemos o ponto de entrada principal
 *   enxuto e legível, facilitando a manutenção e organização do projeto.
 */

import { Time } from "../classes/Time";
import { Jogador } from "../classes/Jogador";
import { Atacante } from "../classes/Atacante";
import { Meia } from "../classes/Meia";
import { Defensor } from "../classes/Defensor";
import { Goleiro } from "../classes/Goleiro";
import { EnergiaInvalidaError, TimeLotadoError, CamisaDuplicadaError } from "../errors/erros";

/**
 * Exibe as opções do menu principal no terminal.
 */
export function exibirMenu(): void {
  console.log("\n=== SIMULADOR DE FUTEBOL ===");
  console.log("1. Criar Time");
  console.log("2. Adicionar Jogador");
  console.log("3. Listar Elenco");
  console.log("4. Jogar Partida");
  console.log("9. Sair");
}

/**
 * Função responsável por criar e retornar um novo objeto da classe Time.
 * @param teclado Instância do prompt-sync para captura do terminal.
 * @returns Um objeto Time inicializado ou null caso o nome seja inválido/vazio.
 */
export function criarTime(teclado: any): Time | null {
  const nomeDoTime = teclado("Digite o nome do time: ").trim();
  if (!nomeDoTime) {
    console.log("O nome do time não pode ser vazio!");
    return null;
  }
  const novoTime = new Time(nomeDoTime);
  console.log(`\nTime "${nomeDoTime}" criado com sucesso!`);
  return novoTime;
}

/**
 * Função responsável por perguntar a posição, capturar os dados, validar tipos,
 * instanciar a subclasse de Jogador correta e adicioná-la no Time fornecido.
 * @param teclado Instância do prompt-sync.
 * @param time O time no qual o jogador será contratado.
 */
export function adicionarJogador(teclado: any, time: Time): void {
  console.log("\n--- ESCOLHA A POSIÇÃO ---");
  console.log("1. Atacante");
  console.log("2. Meia");
  console.log("3. Defensor");
  console.log("4. Goleiro");
  const posOpcao = teclado("Opção de posição: ").trim();

  // Validação preliminar da escolha do menu de posições.
  if (posOpcao !== "1" && posOpcao !== "2" && posOpcao !== "3" && posOpcao !== "4") {
    console.log("\n[Erro] Opção de posição inválida!");
    return;
  }

  const nome = teclado("Digite o nome do jogador: ").trim();
  if (!nome) {
    console.log("O nome do jogador não pode ser vazio!");
    return;
  }

  const camisaInput = teclado("Digite o número da camisa: ");
  const camisa = parseInt(camisaInput, 10);
  if (isNaN(camisa) || camisa <= 0) {
    console.log("O número da camisa deve ser um número inteiro positivo!");
    return;
  }

  const energiaInput = teclado("Digite a energia inicial (0 a 100): ");
  const energia = parseInt(energiaInput, 10);
  if (isNaN(energia)) {
    console.log("A energia deve ser um valor numérico!");
    return;
  }

  let jogador: Jogador;

  try {
    // Coleta o atributo específico conforme a posição selecionada.
    if (posOpcao === "1") {
      const finalizacaoInput = teclado("Digite a capacidade de finalização: ");
      const finalizacao = parseInt(finalizacaoInput, 10);
      if (isNaN(finalizacao)) throw new Error("A finalização deve ser um valor numérico!");
      jogador = new Atacante(nome, camisa, energia, finalizacao);
    } else if (posOpcao === "2") {
      const visaoInput = teclado("Digite a capacidade de visão de jogo: ");
      const visao = parseInt(visaoInput, 10);
      if (isNaN(visao)) throw new Error("A visão de jogo deve ser um valor numérico!");
      jogador = new Meia(nome, camisa, energia, visao);
    } else if (posOpcao === "3") {
      const marcacaoInput = teclado("Digite a capacidade de marcação: ");
      const marcacao = parseInt(marcacaoInput, 10);
      if (isNaN(marcacao)) throw new Error("A marcação deve ser um valor numérico!");
      jogador = new Defensor(nome, camisa, energia, marcacao);
    } else {
      const reflexoInput = teclado("Digite a capacidade de reflexo: ");
      const reflexo = parseInt(reflexoInput, 10);
      if (isNaN(reflexo)) throw new Error("O reflexo deve ser um valor numérico!");
      jogador = new Goleiro(nome, camisa, energia, reflexo);
    }

    // Tenta contratar o jogador
    time.contratarJogador(jogador);
    console.log(`\nJogador ${nome} contratado com sucesso!`);
  } catch (error: any) {
    // Tratamento polimórfico das exceções customizadas.
    if (error instanceof EnergiaInvalidaError) {
      console.log(`\n[Erro de Energia] A energia informada é inválida!`);
    } else if (error instanceof TimeLotadoError) {
      console.log(`\n[Erro de Limite] O time já possui o limite de 11 jogadores!`);
    } else if (error instanceof CamisaDuplicadaError) {
      console.log(`\n[Erro de Camisa] ${error.message}`);
    } else {
      console.log(`\n[Erro ao contratar jogador] ${error.message}`);
    }
  }
}

/**
 * Função responsável por exibir no terminal a ficha completa dos jogadores contratados.
 * @param time O time cujos jogadores serão listados.
 */
export function listarElenco(time: Time): void {
  const elenco = time.elenco;
  if (elenco.length === 0) {
    console.log(`\nO time "${time.nomeDoTime}" ainda não tem jogadores contratados.`);
    return;
  }

  console.log(`\n=== ELENCO DO TIME: ${time.nomeDoTime.toUpperCase()} ===`);
  elenco.forEach((jogador) => {
    // Polimorfismo: cada jogador chama a sua versão de exibirFicha()
    console.log(jogador.exibirFicha());
  });
}

/**
 * Função responsável por iniciar a partida do time e mostrar a listagem de elenco pós-partida.
 * @param time O time que jogará a partida.
 */
export function jogarPartida(time: Time): void {
  try {
    time.jogarPartida();
    
    // Lista o elenco após a partida para mostrar as reduções de energia correspondentes.
    console.log(`\n=== ELENCO DO TIME APÓS A PARTIDA: ${time.nomeDoTime.toUpperCase()} ===`);
    time.elenco.forEach((jogador) => {
      console.log(jogador.exibirFicha());
    });
  } catch (error: any) {
    if (error instanceof EnergiaInvalidaError) {
      console.log(`\n[Erro de Energia] Um jogador ficou com a energia esgotada ou inválida durante a partida!`);
    } else {
      console.log(`\n[Erro ao realizar partida] ${error.message}`);
    }
  }
}
