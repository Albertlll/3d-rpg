import { useUnit } from "effector-react";
import { $currentWeaponIndex, $weaponList } from "../../../../../stores/player-store";
import InventoryCard from "./inventory-card";

function Inventory() {
	const currentWeaponIndex = useUnit($currentWeaponIndex);
	const weaponsList = useUnit($weaponList);

	return (
		<div className=" w-full flex items-center justify-center absolute bottom-4 gap-3">
			{weaponsList.map((weapon, index) => (
				<div key={weapon.id}>
					<InventoryCard
						weapon={weapon}
						type={currentWeaponIndex === index ? "selected" : "default"}
					/>
				</div>
			))}
		</div>
	);
}

export default Inventory;
