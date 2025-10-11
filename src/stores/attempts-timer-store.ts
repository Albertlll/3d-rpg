import { createEvent, createStore, sample, Effect } from "effector";
import { endGame } from "./game-state-store";

// Типы для состояния попыток и таймера
export type AttemptsTimerState = {
  attempts: number; // Количество оставшихся попыток
  timer: number; // Текущее значение таймера в секундах
  isTimerRunning: boolean; // Флаг, показывающий, запущен ли таймер
};

// Инициализируем начальное состояние
const initialState: AttemptsTimerState = {
  attempts: 0,
  timer: 0,
  isTimerRunning: false,
};

// Создаем стор для состояния попыток и таймера
const $attemptsTimerState = createStore<AttemptsTimerState>(initialState);

// Создаем события
const startAttempts = createEvent<void>(); // Начать попытки (пользователь нажал кнопку)
const tickTimer = createEvent<void>(); // Тик таймера (каждую секунду)
const endTimer = createEvent<void>(); // Завершить таймер (время истекло)
const resetAttemptsTimer = createEvent<void>(); // Сбросить состояние

// Переменная для хранения идентификатора интервала
let timerInterval: NodeJS.Timeout | null = null;

// Эффект для запуска таймера
const startTimerEffect = createEvent<void>();

// Эффект для остановки таймера
const stopTimerEffect = createEvent<void>();

// Обработчик для запуска таймера
startTimerEffect.watch(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => {
    tickTimer();
  }, 1000);
});

// Обработчик для остановки таймера
stopTimerEffect.watch(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

// Обработчики событий
// При начале попыток устанавливаем 3 попытки и запускаем таймер на 30 секунд
$attemptsTimerState.on(startAttempts, () => {
  startTimerEffect();
  return {
    attempts: 3,
    timer: 30,
    isTimerRunning: true,
  };
});

// При тике таймера уменьшаем значение таймера на 1
$attemptsTimerState.on(tickTimer, (state) => {
  if (state.timer <= 1) {
    // Если таймер достиг нуля, завершаем его
    endTimer();
    return state;
  }
  return {
    ...state,
    timer: state.timer - 1,
  };
});

// При завершении таймера уменьшаем количество попыток и перезапускаем таймер, если есть попытки
$attemptsTimerState.on(endTimer, (state) => {
  stopTimerEffect();
  const newAttempts = state.attempts - 1;
  if (newAttempts > 0) {
    // Если есть еще попытки, перезапускаем таймер
    startTimerEffect();
    return {
      attempts: newAttempts,
      timer: 30,
      isTimerRunning: true,
    };
  } else {
    // Если попыток больше нет, останавливаем таймер и завершаем игру
    endGame();
    return {
      attempts: 0,
      timer: 0,
      isTimerRunning: false,
    };
  }
});

// При сбросе возвращаем начальное состояние
$attemptsTimerState.on(resetAttemptsTimer, () => {
  stopTimerEffect();
  return initialState;
});

// Экспортируем все необходимое
export { $attemptsTimerState, startAttempts, tickTimer, endTimer, resetAttemptsTimer };