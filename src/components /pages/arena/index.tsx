import { PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useStore } from "effector-react";
import Inventory from "./arena-ui/inventory";
import ClawMachine  from "./scene-parts/claw-machine";
import Ground from "./scene-parts/ground";
import Player from "./scene-parts/player";
import { $gameState } from "../../stores/game-state-store";
import ClawControlsUI from "./scene-parts/claw-machine/ui/control-box/controls/claw-controls-ui";
import WaitingUI from "./arena-ui/waiting-ui";

function Arena() {
	const gameState = useStore($gameState);

	return (
		<>
			{/* Прицел в центре экрана */}
			<div className="absolute flex items-center justify-center w-full h-full">
				<div className="absolute w-1 rounded-full h-4 bg-black z-10" />
				<div className="absolute w-4 rounded-full h-1 bg-black z-10" />
			</div>

			{/* 3D сцена */}
			<Canvas camera={{ fov: 45, position: [0, 0.75, 0] }}>
				<Physics gravity={[0, -300, 0]}>
					{" "}
					{/* Включаем гравитацию для локальной работы */}
					<Player />
					{gameState === "playing" && <PointerLockControls />}
					<ambientLight intensity={1.5} />
					<axesHelper args={[5]} />
					<gridHelper args={[20, 20]} />
					<Ground />
					<ClawMachine />
				</Physics>
			</Canvas>

			{/* UI элементы */}
			<Inventory />
			<ClawControlsUI />
			<WaitingUI />
		</>
	);
}
export default Arena;