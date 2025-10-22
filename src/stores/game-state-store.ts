import { createEvent, createStore, sample } from "effector";
import { startAttempts, gameEnded, resetAttemptsTimer, stopTimer } from "./attempts-timer-store";
import { $wallet, spendMoney } from "./wallet-store";
import { notify } from "./notifications-store";

// Типы состояний игры
export type GameState = "waiting" | "playing";

// Создаем стор для состояния игры
const $gameState = createStore<GameState>("waiting");

// Создаем события для изменения состояния игры
const startGame = createEvent<void>();
const endGame = createEvent<void>();

// Событие запроса старта игры с проверкой баланса
const requestStartGame = createEvent<void>();

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

// Проверяем баланс перед стартом игры
sample({
  clock: requestStartGame,
  source: $wallet,
  fn: (balance) => {
    const GAME_COST = 50;
    if (balance >= GAME_COST) {
      return { canStart: true, cost: GAME_COST };
    }
    return { canStart: false, cost: GAME_COST };
  },
}).watch(({ canStart, cost }) => {
  if (canStart) {
    // Списываем деньги и запускаем игру
    spendMoney({ amount: cost });
    startGame();
  } else {
    // Показываем уведомление о нехватке средств
    notify({ 
      type: "error", 
      message: `Недостаточно средств! Нужно ${cost} монет для запуска игры.` 
    });
  }
});

// Экспортируем все необходимое
export { $gameState, startGame, endGame, requestStartGame };