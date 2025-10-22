import { createEvent, createStore, sample } from "effector";

// Типы для состояния попыток и таймера
export type AttemptsTimerState = {
  attempts: number; // Количество оставшихся попыток
  currentAttempt: number; // Номер текущей попытки (1, 2, 3)
  timer: number; // Текущее значение таймера в секундах
  isTimerRunning: boolean; // Флаг, показывающий, запущен ли таймер
};

// Инициализируем начальное состояние
const initialState: AttemptsTimerState = {
  attempts: 0,
  currentAttempt: 0,
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
const startTimer = createEvent<void>(); // Запустить таймер
const stopTimer = createEvent<void>(); // Остановить таймер
const gameEnded = createEvent<void>(); // Событие завершения игры
const attemptsUpdated = createEvent<number>(); // Событие обновления количества попыток
const attemptCompleted = createEvent<void>(); // Событие завершения текущей попытки

// Переменная для хранения идентификатора интервала
let timerInterval: number | null = null;

// Эффекты для запуска и остановки таймера
sample({
  clock: startTimer,
  fn: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
      tickTimer();
    }, 1000);
  },
});

sample({
  clock: stopTimer,
  fn: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  },
});

// Обработчики событий
// При начале попыток устанавливаем 3 попытки и запускаем таймер на 30 секунд
sample({
  clock: startAttempts,
  fn: () => ({
    attempts: 3,
    currentAttempt: 1,
    timer: 30,
    isTimerRunning: true,
  }),
  target: $attemptsTimerState,
});

// Запускаем таймер при начале попыток
sample({
  clock: startAttempts,
  target: startTimer,
});

// При тике таймера уменьшаем значение таймера на 1
sample({
  clock: tickTimer,
  source: $attemptsTimerState,
  fn: (state) => {
    if (state.timer <= 1) {
      // Если таймер достиг нуля, завершаем его
      return { ...state, timer: 0 };
    }
    return {
      ...state,
      timer: state.timer - 1,
    };
  },
  target: $attemptsTimerState,
});

// Завершаем таймер когда он достигает нуля
sample({
  clock: tickTimer,
  source: $attemptsTimerState,
  filter: (state) => state.timer <= 1,
  target: endTimer,
});

// Останавливаем таймер при его завершении
sample({
  clock: endTimer,
  target: stopTimer,
});

// При завершении таймера обновляем состояние попыток (устаревший код, оставлен для совместимости)
sample({
  clock: attemptsUpdated,
  source: $attemptsTimerState,
  fn: (_state, newCurrentAttempt) => ({
    attempts: _state.attempts,
    currentAttempt: newCurrentAttempt,
    timer: newCurrentAttempt <= 3 ? 30 : 0,
    isTimerRunning: newCurrentAttempt <= 3,
  }),
  target: $attemptsTimerState,
});

// При завершении попытки увеличиваем номер текущей попытки
sample({
  clock: attemptCompleted,
  source: $attemptsTimerState,
  fn: (state) => state.currentAttempt + 1,
  target: attemptsUpdated,
});

// Обновляем состояние при изменении номера попытки
sample({
  clock: attemptsUpdated,
  fn: (newCurrentAttempt) => ({
    attempts: 3,
    currentAttempt: Math.min(newCurrentAttempt, 3),
    timer: newCurrentAttempt <= 3 ? 30 : 0,
    isTimerRunning: newCurrentAttempt <= 3,
  }),
  target: $attemptsTimerState,
});

// Запускаем новый таймер если есть попытки
sample({
  clock: attemptsUpdated,
  filter: (newCurrentAttempt) => newCurrentAttempt <= 3,
  target: startTimer,
});

// Завершаем игру если попыток нет (номер попытки > 3)
sample({
  clock: attemptsUpdated,
  filter: (newCurrentAttempt) => newCurrentAttempt > 3,
  target: gameEnded,
});

// Останавливаем таймер при сбросе
sample({
  clock: resetAttemptsTimer,
  target: stopTimer,
});

// При сбросе возвращаем начальное состояние
sample({
  clock: resetAttemptsTimer,
  fn: () => ({ ...initialState }),
  target: $attemptsTimerState,
});

// Экспортируем все необходимое
export { $attemptsTimerState, startAttempts, tickTimer, endTimer, resetAttemptsTimer, startTimer, stopTimer, gameEnded, attemptsUpdated, attemptCompleted };