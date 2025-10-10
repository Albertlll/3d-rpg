import { createEvent, createStore } from "effector";

// Типы состояний игры
export type GameState = "waiting" | "playing";

// Создаем стор для состояния игры
const $gameState = createStore<GameState>("waiting");

// Создаем события для изменения состояния игры
const startGame = createEvent<void>();
const endGame = createEvent<void>();

// Обработчики событий
$gameState.on(startGame, () => "playing");
$gameState.on(endGame, () => "waiting");

// Экспортируем все необходимое
export { $gameState, startGame, endGame };