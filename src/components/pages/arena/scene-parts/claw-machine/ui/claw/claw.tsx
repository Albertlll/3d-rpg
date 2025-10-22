import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { craneMaterial } from "../../materials";
import { useUnit } from "effector-react";
import { $gameState } from "../../../../../../../stores/game-state-store";
import { attemptCompleted } from "../../../../../../../stores/attempts-timer-store";
import { $toys, setToyGrabbed } from "../../../../../../../stores/toys-store";
import { notify } from "../../../../../../../stores/notifications-store";
import { Vector3 } from "three";

const BOUNDS = 0.3; // безопасные границы по X/Z внутри контейнера
const INITIAL_CABLE_LENGTH = 0.3; // начальная длина троса до головы
const LOWER_MAX = 1.0; // макс. длина опускания
const OPEN_ANGLE = Math.PI / 4; // угол раскрытия
const CLOSED_ANGLE = - Math.PI / 5; // угол закрытия
const ROTATE_LERP = 20; // скорость анимации раскрытия/закрытия

type Phase = "idle" | "lowering" | "raising";

const Claw = () => {
	// Исходные позиции клешни
	const INITIAL_X = -BOUNDS; // старт: левый нижний угол
	const INITIAL_Z = -BOUNDS;
	const RESET_LERP = 5; // скорость возврата в исходное положение

	// Состояние системы
	const [phase, setPhase] = useState<Phase>("idle");
	const [isOpen, setIsOpen] = useState(true); // старт: открыта
	const [clawLength, setClawLength] = useState(0); // текущая длина троса
	const [clawX, setClawX] = useState(INITIAL_X);
	const [clawZ, setClawZ] = useState(INITIAL_Z);
	const [targetX, setTargetX] = useState(INITIAL_X); // целевая позиция X для плавного перемещения
	const [targetZ, setTargetZ] = useState(INITIAL_Z); // целевая позиция Z для плавного перемещения

	// Рефы для анимации
    const clawSystemRef = useRef<Group>(null);
	const cableRef = useRef<Mesh>(null);
	const prongRefs = [useRef<Mesh>(null), useRef<Mesh>(null), useRef<Mesh>(null)];
    const headWorld = useRef(new Vector3());
    const [grabbedToyId, setGrabbedToyId] = useState<string | null>(null);

	const gameState = useUnit($gameState);
    const toysMap = useUnit($toys);

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
			if (event.code === "ArrowUp") {
				setTargetX((x) => Math.max(-BOUNDS, x - 0.1));
			} else if (event.code === "ArrowDown") {
				setTargetX((x) => Math.min(BOUNDS, x + 0.1));
			} else if (event.code === "ArrowRight") {
				setTargetZ((z) => Math.max(-BOUNDS, z - 0.1));
			} else if (event.code === "ArrowLeft") {
				setTargetZ((z) => Math.min(BOUNDS, z + 0.1));
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
                // Попытка схватить ближайшую игрушку
                const head = clawSystemRef.current?.children.find((c) => (c as Group).name === "clawHead") as Group | undefined;
                if (head && clawSystemRef.current) {
                    head.getWorldPosition(headWorld.current);
                    let bestId: string | null = null;
                    let bestDist = Infinity;
                    for (const [id, rec] of Object.entries(toysMap)) {
                        if (!rec || rec.grabbed) continue;
                        const t = rec.api.translation();
                        const dx = t.x - headWorld.current.x;
                        const dy = t.y - headWorld.current.y;
                        const dz = t.z - headWorld.current.z;
                        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        if (d < bestDist) {
                            bestDist = d;
                            bestId = id;
                        }
                    }
                    if (bestId && bestDist < 0.18) {
                        setGrabbedToyId(bestId);
                        setToyGrabbed({ id: bestId, grabbed: true });
                        notify({ type: "success", message: "Игрушка схвачена!" });
                    } else {
                        notify({ type: "info", message: "Промах. Попробуйте ещё!" });
                    }
                }
			}
		} else if (phase === "raising") {
			const next = Math.max(0, clawLength - delta * 2);
			setClawLength(next);
			if (next <= 0) {
				setIsOpen(true); // вернулись в исходное: открыта
				setPhase("idle");
				// Устанавливаем целевые позиции в исходное положение для плавного возврата
				setTargetX(INITIAL_X);
				setTargetZ(INITIAL_Z);
				// Завершаем попытку после завершения цикла клешни
				attemptCompleted();
                // Отпускаем игрушку на вершине
                if (grabbedToyId && toysMap[grabbedToyId]) {
                    setToyGrabbed({ id: grabbedToyId, grabbed: false });
                    setGrabbedToyId(null);
                }
			}
		}

		// Плавное перемещение к целевым позициям
		const currentX = clawX + (targetX - clawX) * Math.min(1, delta * RESET_LERP);
		const currentZ = clawZ + (targetZ - clawZ) * Math.min(1, delta * RESET_LERP);

		setClawX(currentX);
		setClawZ(currentZ);

		// Позиция всей системы (X/Z движение)
		if (clawSystemRef.current) {
			clawSystemRef.current.position.x = currentX;
			clawSystemRef.current.position.z = currentZ;
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
            // Если держим игрушку — подтягиваем её к голове
            if (grabbedToyId && toysMap[grabbedToyId]) {
                head.getWorldPosition(headWorld.current);
                const api = toysMap[grabbedToyId].api;
                api.setLinvel({ x: 0, y: 0, z: 0 }, true);
                api.setAngvel({ x: 0, y: 0, z: 0 }, true);
                api.setTranslation({ x: headWorld.current.x, y: headWorld.current.y - 0.08, z: headWorld.current.z }, true);
            }
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