import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $notifications, removeNotification } from "../../../../../stores/notifications-store";

const Notifications = () => {
  const notifications = useUnit($notifications);
  const remove = useUnit(removeNotification);

  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => remove({ id: n.id }), 2500)
    );
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [notifications, remove]);

  if (notifications.length === 0) return null;

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-50" aria-live="polite" aria-relevant="additions removals">
      {notifications.map((n) => (
        <div
          key={n.id}
          role="status"
          tabIndex={0}
          aria-label={`Уведомление: ${n.message}`}
          className={
            "px-3 py-2 rounded shadow text-white " +
            (n.type === "success" ? "bg-green-600" : n.type === "error" ? "bg-red-600" : "bg-blue-600")
          }
          onClick={() => remove({ id: n.id })}
          onKeyDown={(e) => e.key === "Enter" && remove({ id: n.id })}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;

