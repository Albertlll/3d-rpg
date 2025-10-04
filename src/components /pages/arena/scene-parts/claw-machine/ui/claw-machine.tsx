import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Group } from "three";

const ClawMachine = () => {
	const machineRef = useRef<Group>(null);

	// Цвета автомата
	const colors = {
		mainBody: "#2c3e50",        // Основной корпус
		glassWalls: "#34495e",      // Полупрозрачные стенки
		claw: "#e74c3c",           // Хваталка
		controlPanel: "#34495e",   // Панель управления
		coinSlot: "#f39c12",       // Зона для мелочи
		cardSlot: "#3498db",       // Зона для карты
		joystick: "#e67e22",       // Джойстик
		button: "#e74c3c",        // Кнопка
		toys: {
			bear: "#8e44ad",      // Медведь
			cube: "#f39c12",      // Кубик
			heart: "#e74c3c"      // Сердце
		}
	};

	return (
		<RigidBody type="fixed" position={[0, 1, 0]}>
			<group ref={machineRef}>


				<mesh position={[0, 0.7, 0.5]}>
					<boxGeometry args={[0.98, 1.4, 0.02]} />
					<meshStandardMaterial color={colors.glassWalls} transparent opacity={0.3} />
				</mesh>
				
				{/* Задняя стенка */}
				<mesh position={[0, 0.7, -0.5]}>
					<boxGeometry args={[0.98, 1.4, 0.02]} />
					<meshStandardMaterial color={colors.glassWalls} transparent opacity={0.3} />
				</mesh>
				
				{/* Левая стенка */}
				<mesh position={[-0.5, 0.7, 0]}>
					<boxGeometry args={[0.02, 1.4, 0.98]} />
					<meshStandardMaterial color={colors.glassWalls} transparent opacity={0.3} />
				</mesh>
				
				{/* Правая стенка */}
				<mesh position={[0.5, 0.7, 0]}>
					<boxGeometry args={[0.02, 1.4, 0.98]} />
					<meshStandardMaterial color={colors.glassWalls} transparent opacity={0.3} />
				</mesh>

				{/* Штыри между стенками */}
				<mesh position={[-0.5, 0.7, 0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<meshStandardMaterial color={colors.mainBody} />
				</mesh>
				
				<mesh position={[0.5, 0.7, 0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<meshStandardMaterial color={colors.mainBody} />
				</mesh>
				
				<mesh position={[-0.5, 0.7, -0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<meshStandardMaterial color={colors.mainBody} />
				</mesh>
				
				<mesh position={[0.5, 0.7, -0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<meshStandardMaterial color={colors.mainBody} />
				</mesh>
			</group>
		</RigidBody>
	);
};

export default ClawMachine;