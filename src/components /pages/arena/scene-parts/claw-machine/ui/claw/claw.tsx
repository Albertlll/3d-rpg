import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { craneMaterial } from "../../materials";
import { useStore, useUnit } from "effector-react";
import { $gameState, endGame } from "../../../../../../../stores/game-state-store";

const BOUNDS = 0.3; // безопасные границы по X/Z внутри контейнера
const INITIAL_CABLE_LENGTH = 0.3; // начальная длина троса до головы
const LOWER_MAX = 1.0; // макс. длина опускания
const OPEN_ANGLE = Math.PI / 4; // угол раскрытия
const CLOSED_ANGLE = - Math.PI / 5; // угол закрытия
const ROTATE_LERP = 20; // скорость анимации раскрытия/закрытия

type Phase = "idle" | "lowering" | "raising";

const Claw = () => {
	// Состояние системы
	const [phase, setPhase] = useState<Phase>("idle");
	const [isOpen, setIsOpen] = useState(true); // старт: открыта
	const [clawLength, setClawLength] = useState(0); // текущая длина троса
	const [clawX, setClawX] = useState(-BOUNDS); // старт: левый нижний угол
	const [clawZ, setClawZ] = useState(-BOUNDS);

	// Рефы для анимации
	const clawSystemRef = useRef<Group>(null);
	const cableRef = useRef<Mesh>(null);
	const prongRefs = [useRef<Mesh>(null), useRef<Mesh>(null), useRef<Mesh>(null)];

	const gameState = useUnit($gameState);

	// Управление: стрелки двигают систему, Enter запускает цикл вниз/вверх
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Разрешаем управление только во время игры
			if (gameState !== "playing") return;

			if (event.code === "Enter") {
				if (phase === "idle") {
					setIsOpen(true); // при опускании клешня открывается
					setPhase("lowering");
				}
				return;
			}
			if (event.code === "ArrowLeft") {
				setClawX((x) => Math.max(-BOUNDS, x - 0.1));
			} else if (event.code === "ArrowRight") {
				setClawX((x) => Math.min(BOUNDS, x + 0.1));
			} else if (event.code === "ArrowUp") {
				setClawZ((z) => Math.max(-BOUNDS, z - 0.1));
			} else if (event.code === "ArrowDown") {
				setClawZ((z) => Math.min(BOUNDS, z + 0.1));
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [phase, gameState]);

	// Анимация: фазы опускания/подъема и раскрытие/закрытие зубцов
	useFrame((_, delta) => {
		if (phase === "lowering") {
			const next = Math.min(LOWER_MAX, clawLength + delta * 2);
			setClawLength(next);
			if (next >= LOWER_MAX) {
				setIsOpen(false); // при подъеме закрывается
				setPhase("raising");
			}
		} else if (phase === "raising") {
			const next = Math.max(0, clawLength - delta * 2);
			setClawLength(next);
			if (next <= 0) {
				setIsOpen(true); // вернулись в исходное: открыта
				setPhase("idle");
				// Завершаем игру после завершения цикла клешни
				endGame();
			}
		}

		// Позиция всей системы (X/Z движение)
		if (clawSystemRef.current) {
			clawSystemRef.current.position.x = clawX;
			clawSystemRef.current.position.z = clawZ;
		}

		// Трос растягивается от крышки до головы
		if (cableRef.current) {
			const totalLength = INITIAL_CABLE_LENGTH + clawLength;
			cableRef.current.scale.y = totalLength;
			// Центр троса всегда на половине текущей длины, но учитываем отступ до крышки
			cableRef.current.position.y = 0.15 - totalLength / 2;
		}

		// Клешня следует за концом троса
		const head = clawSystemRef.current?.children.find((c) => (c as Group).name === "clawHead") as Group | undefined;
		if (head) {
			head.position.y = -(INITIAL_CABLE_LENGTH + clawLength);
		}

		// Плавное раскрытие/закрытие 3 зубцов
		const target = isOpen ? OPEN_ANGLE : CLOSED_ANGLE;
		for (const ref of prongRefs) {
			if (ref.current) {
				const current = ref.current.rotation.z;
				ref.current.rotation.z = current + (target - current) * Math.min(1, delta * ROTATE_LERP);
			}
		}
	});

	return (
		<RigidBody type="fixed" position={[0, 1, 0]}>
			<group>
				{/* Крышка автомата */}
				<mesh position={[0, 1.45, 0]}>
					<boxGeometry args={[1.02, 0.1, 1.02]} />
					<primitive object={craneMaterial} />
				</mesh>

				{/* Вся система хваталки */}
				<group ref={clawSystemRef} position={[0, 1.3, 0]}>

					{/* Трос (начинается от крышки) */}
					<mesh ref={cableRef} position={[0, 0.15, 0]}>
						<cylinderGeometry args={[0.01, 0.01, 1]} />
						<primitive object={craneMaterial} />
					</mesh>

					{/* Голова клешни (узел), положение обновляется от длины троса */}
					<group name="clawHead" position={[0, -INITIAL_CABLE_LENGTH, 0]}>
						{/* Центральная втулка */}
						<mesh position={[0, 0.1, 0]}>
							<cylinderGeometry args={[0.05, 0.12, 0.12]} />
							<primitive object={craneMaterial} />
						</mesh>

						{/* Три зубца через 120° вокруг оси Y */}
						{[0, 120, 240].map((deg, i) => (
							<group key={deg} rotation={[0, (deg * Math.PI) / 180, 0]}>
								{/* смещение зубца радиально от центра */}
								<mesh ref={prongRefs[i]} position={[0.11, 0, 0]} rotation={[0, 0, OPEN_ANGLE]}>
									<boxGeometry args={[0.04, 0.2, 0.04]} />
									<primitive object={craneMaterial} />
								</mesh>
							</group>
						))}
					</group>
				</group>
			</group>
		</RigidBody>
	);
};

export default Claw;