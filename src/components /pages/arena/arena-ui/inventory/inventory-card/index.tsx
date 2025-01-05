import { cn } from "../../../../../../lib/utils";

function InventoryCard(props : {type : string}) {
    return (
        <div className={cn(" w-[70px] h-[70px] border-[4px] bg-slate-500/20 rounded-[10px]",
            props.type == "default" && "border-slate-700 ",
            props.type == "selected" && "border-slate-800 ",
    
        )}></div>
    );
}

export default InventoryCard;