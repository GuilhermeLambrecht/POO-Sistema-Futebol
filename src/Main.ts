/**
 * Arquivo Principal (Main.ts)
 * 
 * Ponto de Entrada da Aplicação:
 * - Inicializa o console interativo com o 'prompt-sync'.
 * - Controla o laço while principal que exibe o menu e captura as opções do usuário.
 * - Delega a execução de cada caso para as funções especializadas importadas do módulo 'menu.ts'.
 * - Dessa forma, mantemos o código limpo, modular, bem comentado e de fácil leitura.
 */

import promptSync from "prompt-sync";
import { Time } from "./classes/Time";
import { 
  exibirMenu, 
  criarTime, 
  adicionarJogador, 
  listarElenco, 
  jogarPartida 
} from "./functions/menu";

const teclado = promptSync();
let meuTime: Time | null = null;

// Laço principal de repetição que mantém o programa em execução até ser encerrado (opção 9).
while (true) {
  exibirMenu();
  const opcao = teclado("Escolha uma opção: ");

  switch (opcao) {
    case "1": {
      // Delega a criação do time para a função criarTime.
      meuTime = criarTime(teclado);
      break;
    }
    case "2": {
      // Verifica se o time já foi criado antes de prosseguir com a contratação.
      if (!meuTime) {
        console.log("\n[Erro] Você precisa criar um time primeiro (Opção 1)!");
        break;
      }
      // Chama a função auxiliar para contratação de um jogador.
      adicionarJogador(teclado, meuTime);
      break;
    }
    case "3": {
      // Verifica se o time já foi criado antes de listar.
      if (!meuTime) {
        console.log("\n[Erro] Você precisa criar um time primeiro (Opção 1)!");
        break;
      }
      // Lista todos os jogadores do time atual.
      listarElenco(meuTime);
      break;
    }
    case "4": {
      // Verifica se o time já foi criado antes de jogar.
      if (!meuTime) {
        console.log("\n[Erro] Você precisa criar um time primeiro (Opção 1)!");
        break;
      }
      // Executa a simulação da partida.
      jogarPartida(meuTime);
      break;
    }
    case "9": {
      console.log("Saindo do programa...");
      process.exit(0);
    }
    default: {
      console.log("Opção inválida! Escolha um número do menu.");
      break;
    }
  }
}
