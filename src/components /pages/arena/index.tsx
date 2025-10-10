import { PointerLockControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Inventory from "./arena-ui/inventory";
import ClawMachine  from "./scene-parts/claw-machine";
import Ground from "./scene-parts/ground";
import Player from "./scene-parts/player";

function Arena() {

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
					<PointerLockControls />
					<ambientLight intensity={1.5} />
					
					{/* Направленный свет для создания теней и объема */}
					<directionalLight 
						position={[5, 10, 7]} 
						intensity={1.2} 
						castShadow 
						shadow-mapSize-width={1024}
						shadow-mapSize-height={1024}
					/>
					
					{/* Точечный свет над клешневой машиной */}
					<pointLight 
						position={[0, 3, 0]} 
						intensity={0.8} 
						color="#3498db"
					/>
					
					{/* Точечный свет сбоку для дополнительного освещения */}
					<pointLight 
						position={[-3, 2, -3]} 
						intensity={0.5} 
						color="#e74c3c"
					/>
					
					{/* Окружающая среда для отражений */}
					<Environment preset="city" />
					
					<axesHelper args={[5]} />
					<gridHelper args={[20, 20]} />
					<Ground />
					<ClawMachine />
				</Physics>
			</Canvas>

			{/* UI элементы */}
			<Inventory />
		</>
	);
}
export default Arena;