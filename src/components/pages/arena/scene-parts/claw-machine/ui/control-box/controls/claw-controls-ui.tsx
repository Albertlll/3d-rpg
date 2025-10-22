import { useStore } from "effector-react";
import { $gameState } from "../../../../../../../../stores/game-state-store";

const ClawControlsUI = () => {
	const gameState = useStore($gameState);

	// Показываем элементы управления только во время игры
	if (gameState !== "playing") {
		return null;
	}

	return (
		<div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 p-4 rounded-lg text-white">
			<h3 className="text-lg font-bold mb-2">Управление клешней</h3>
			<div className="grid grid-cols-3 gap-2">
				<div></div>
				<div className="bg-gray-700 p-2 rounded text-center">↑</div>
				<div></div>
				<div className="bg-gray-700 p-2 rounded text-center">←</div>
				<div className="bg-gray-700 p-2 rounded text-center">↓</div>
				<div className="bg-gray-700 p-2 rounded text-center">→</div>
			</div>
			<div className="mt-4">
				<div className="bg-red-600 p-2 rounded text-center font-bold">ENTER - Запустить клешню</div>
			</div>
		</div>
	);
};

export default ClawControlsUI;