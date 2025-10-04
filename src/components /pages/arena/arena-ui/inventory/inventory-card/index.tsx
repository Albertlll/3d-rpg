import { cn } from "../../../../../../lib/utils";
import type { IWeapon } from "../../../../../../stores/player-store";
import BowIcon from "./icons/bow-icon.png";
import SwordIcon from "./icons/sword-icon.png";

function InventoryCard(props: { type: string; weapon: IWeapon }) {
	return (
		<div
			className={cn(
				" w-[70px] h-[70px] border-[4px] bg-slate-500/20 rounded-[10px]",
				props.type === "default" && "border-slate-700 ",
				props.type === "selected" && "border-slate-800 ",
			)}
		>
			{props.weapon.id === 0 ? (
				<img className="w-full h-full p-2" src={BowIcon} alt="" />
			) : (
				<img className="w-full h-full p-2" src={SwordIcon} alt="" />
			)}
		</div>
	);
}

export default InventoryCard;
