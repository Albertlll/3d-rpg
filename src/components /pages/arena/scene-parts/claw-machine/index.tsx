import ClawMachine from "./ui/claw-machine"
import Claw from "./ui/claw/claw";
import ControlBox from "./ui/control-box/consrol-box";
import ClawControls from "./ui/control-box/controls/controls";

const Machine = () => {
    return(
        <>
        <Claw/>
        <ClawMachine />
        <ControlBox />
        <ClawControls />

        </>
    )
}

export default Machine;