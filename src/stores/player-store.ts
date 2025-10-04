import { createEvent, createStore, sample } from "effector";

export interface IWeapon {
	id: number;
	title: string;
	damage: number;
	effect: string;
}

// Создаем сторы
const $currentWeaponIndex = createStore<number>(0);
const $weaponList = createStore<Array<IWeapon>>([
	{
		id: 0,
		title: "Bow",
		damage: 10,
		effect: "freeze",
	},
	{
		id: 1,
		title: "Sword",
		damage: 10,
		effect: "freeze",
	},
]);

const nextRightWeapon = createEvent<void>();
const nextLeftWeapon = createEvent<void>();
const setCurrentWeapon = createEvent<number>();

sample({
	clock: nextRightWeapon,
	source: { currentIndex: $currentWeaponIndex, weapons: $weaponList },
	fn: ({ currentIndex, weapons }) => (currentIndex + 1) % weapons.length,
	target: $currentWeaponIndex,
});

sample({
	clock: nextLeftWeapon,
	source: { currentIndex: $currentWeaponIndex, weapons: $weaponList },
	fn: ({ currentIndex, weapons }) => 
		(currentIndex + weapons.length - 1) % weapons.length,
	target: $currentWeaponIndex,
});

sample({
	clock: setCurrentWeapon,
	source: $weaponList,
	fn: (weapons, index) => Math.max(0, Math.min(index, weapons.length - 1)),
	target: $currentWeaponIndex,
});

// Экспортируем все необходимое
export { 
	$currentWeaponIndex, 
	$weaponList, 
	nextRightWeapon, 
	nextLeftWeapon, 
	setCurrentWeapon 
};
