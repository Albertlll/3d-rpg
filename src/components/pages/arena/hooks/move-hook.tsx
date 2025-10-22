import { useEffect, useState } from "react";
import { nextLeftWeapon, nextRightWeapon } from "../../../../stores/player-store";

export const usePersonControls = () => {
	const [movement, setMovement] = useState({
		forward: false,
		backward: false,
		left: false,
		right: false,
		jump: false,
	});

	useEffect(() => {
		const keys: { [key: string]: string } = {
			KeyW: "forward",
			KeyS: "backward",
			KeyA: "left",
			KeyD: "right",
			Space: "jump",
		};

		const moveFieldByKey = (key: keyof typeof keys) => keys[key];

		const setMovementStatus = (code: keyof typeof keys, status: boolean) => {
			setMovement((m) => ({ ...m, [code]: status }));
		};
		const handleKeyDown = (ev: KeyboardEvent) => {
			setMovementStatus(moveFieldByKey(ev.code), true);
		};

		const handleKeyUp = (ev: KeyboardEvent) => {
			setMovementStatus(moveFieldByKey(ev.code), false);
		};

		// Обработчик события прокрутки колесика мыши
		const handleWheel = (ev: WheelEvent) => {
			// Предотвращаем стандартное поведение прокрутки
			ev.preventDefault();

			// Определяем направление прокрутки
			if (ev.deltaY < 0) {
				// Прокрутка вверх - то же, что и стрелка влево
				nextLeftWeapon();
			} else if (ev.deltaY > 0) {
				// Прокрутка вниз - то же, что и стрелка вправо
				nextRightWeapon();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		document.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
			document.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return movement;
};
