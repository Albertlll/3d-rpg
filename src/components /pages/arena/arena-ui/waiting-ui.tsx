import { useStore } from "effector-react";
import { $gameState } from "../../../../stores/game-state-store";

const WaitingUI = () => {
	const gameState = useStore($gameState);

	// Показываем сообщение только в состоянии ожидания
	if (gameState !== "waiting") {
		return null;
	}

	return (
		<div className="absolute inset-0 flex items-center justify-center z-20 opacity-20">
			<div className="bg-gray-800 p-8 rounded-lg text-white text-center max-w-md ">
				<h2 className="text-2xl font-bold mb-4">Игровой автомат клешней</h2>
				<p className="mb-6">Подойдите к автомату и нажмите на кнопку, чтобы начать игру</p>
			</div>
		</div>
	);
};

export default WaitingUI;