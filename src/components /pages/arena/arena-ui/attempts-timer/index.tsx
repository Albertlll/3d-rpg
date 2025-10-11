import { useUnit } from "effector-react";
import { $attemptsTimerState } from "../../../../../../stores/attempts-timer-store";

function AttemptsTimer() {
  const { attempts, timer, isTimerRunning } = useUnit($attemptsTimerState);

  return (
    <div className="w-full flex items-center justify-center absolute top-4 gap-3">
      <div className="bg-slate-800/80 text-white p-3 rounded-lg flex items-center gap-2">
        <span className="font-bold">Попытки:</span>
        <span className="text-xl">{attempts}</span>
      </div>
      <div className="bg-slate-800/80 text-white p-3 rounded-lg flex items-center gap-2">
        <span className="font-bold">Таймер:</span>
        <span className="text-xl">{timer}с</span>
      </div>
      {isTimerRunning && (
        <div className="bg-green-500/80 text-white p-3 rounded-lg">
          Таймер запущен
        </div>
      )}
    </div>
  );
}

export default AttemptsTimer;