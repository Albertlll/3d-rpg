import { createEvent, createStore, sample } from "effector";

export type Notification = {
  id: string;
  type: "success" | "info" | "error";
  message: string;
  createdAt: number;
};

const $notifications = createStore<Notification[]>([]);

const notify = createEvent<{ type: Notification["type"]; message: string }>();
const removeNotification = createEvent<{ id: string }>();
const clearNotifications = createEvent<void>();

sample({
  clock: notify,
  source: $notifications,
  fn: (list, { type, message }) => {
    const n: Notification = {
      id: Math.random().toString(36).slice(2),
      type,
      message,
      createdAt: Date.now(),
    };
    return [n, ...list].slice(0, 6);
  },
  target: $notifications,
});

sample({
  clock: removeNotification,
  source: $notifications,
  fn: (list, { id }) => list.filter((n) => n.id !== id),
  target: $notifications,
});

sample({
  clock: clearNotifications,
  fn: () => [],
  target: $notifications,
});

export { $notifications, notify, removeNotification, clearNotifications };

