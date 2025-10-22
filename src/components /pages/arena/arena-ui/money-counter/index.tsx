import { useUnit } from "effector-react";
import { $wallet } from "../../../../../stores/wallet-store";

const MoneyCounter = () => {
  const wallet = useUnit($wallet);

  return (
    <div className="absolute top-4 left-4 z-30">
      <div className="bg-slate-800/80 text-white p-3 rounded-lg flex items-center gap-2">
        <span className="font-bold">💰</span>
        <span className="font-bold">Монеты:</span>
        <span className="text-xl text-yellow-400">{wallet}</span>
      </div>
    </div>
  );
};

export default MoneyCounter;
