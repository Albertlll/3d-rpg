import { createEvent, createStore, sample } from "effector";

// Храним баланс игрока в монетах
const $wallet = createStore<number>(200);

// События изменения баланса
const addMoney = createEvent<{ amount: number }>();
const spendMoney = createEvent<{ amount: number }>();

// Пополнение баланса
sample({
  clock: addMoney,
  source: $wallet,
  fn: (balance, { amount }) => balance + Math.max(0, amount),
  target: $wallet,
});

// Списание с защитой от отрицательных значений
sample({
  clock: spendMoney,
  source: $wallet,
  fn: (balance, { amount }) => {
    const safeAmount = Math.max(0, amount);
    return Math.max(0, balance - safeAmount);
  },
  target: $wallet,
});

export { $wallet, addMoney, spendMoney };


