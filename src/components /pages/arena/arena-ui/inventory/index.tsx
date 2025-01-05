import InventoryCard from "./inventory-card";

function Inventory() {
    return (
        <div className=" w-full flex items-center justify-center absolute bottom-4 gap-3">
            <InventoryCard type="selected"/>
            <InventoryCard type="default"/>
            <InventoryCard type="default"/>
        </div>
    );
}

export default Inventory;