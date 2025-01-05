import { Environment, Outlines, PointerLockControls, Sky } from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Ground from "./scene-parts/ground";
import Player from "./scene-parts/player";
import { Physics, RigidBody } from "@react-three/rapier";
import Card from "./arena-ui/Card/Card";
import InventoryCard from "./arena-ui/inventory/inventory-card";
import Inventory from "./arena-ui/inventory";
import Leaderboard from "./arena-ui/leaderboard";
import Enemy from "./scene-parts/enemy";
function Arena() {
    return (
        <>
            <Canvas camera={{ fov: 45, position : [0, 0.75, 0] }}>
            
            <Physics  gravity={[0, -20, 0]}>
                <Player/>
                <PointerLockControls />

                {/* <ambientLight intensity={1.5} /> */}


                {/* <Sky sunPosition={[100, 20, 300]}/> */}

                <Environment background backgroundBlurriness={10} files={["./the_sky_is_on_fire_2k.exr"]} />
{/* 
                <RigidBody>
                    <mesh position={[0, 2, 2]}>
                        <boxGeometry/>
                        <meshStandardMaterial />
                        <Outlines thickness={5} color="black" />
                    </mesh>
                </RigidBody> */}


                <Ground/>


                <Enemy x={0} y={1} z={2}/>

            
            </Physics>
         

            </Canvas>

            <Inventory/>
            <Leaderboard/>

            <div className="">

            </div>


        </>
    );
}
export default Arena