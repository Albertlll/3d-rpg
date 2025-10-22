import { createEvent, createStore, sample } from "effector";
import { startAttempts, gameEnded, resetAttemptsTimer, stopTimer } from "./attempts-timer-store";

// Типы состояний игры
export type GameState = "waiting" | "playing";

// Создаем стор для состояния игры
const $gameState = createStore<GameState>("waiting");

// Создаем события для изменения состояния игры
const startGame = createEvent<void>();
const endGame = createEvent<void>();

// Обработчики событий
sample({
  clock: startGame,
  fn: () => "playing" as GameState,
  target: $gameState,
});

sample({
  source: endGame,
  fn: () => "waiting" as GameState,
  target: $gameState,
});


// Синхронизируем начало игры с началом попыток
sample({
  clock: startGame,
  target: startAttempts,
});

// Синхронизируем завершение игры с событием завершения игры из таймера
sample({
  clock: gameEnded,
  target: endGame,
});

// При завершении игры сбрасываем таймер и попытки, чтобы не было 4/3
sample({
  clock: gameEnded,
  target: [stopTimer, resetAttemptsTimer],
});

// Экспортируем все необходимое
export { $gameState, startGame, endGame };