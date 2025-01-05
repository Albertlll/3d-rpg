import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Mesh } from "three";
import { usePersonControls } from "../hooks/move-hook";
import { Vector3 } from "three";

import {useFrame} from "@react-three/fiber";
import { useEnemiesStore } from "../../../../stores/enemies-store";

const MOVE_SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

function Player() {

    const playerRef = useRef< RapierRigidBody | null>(null);

    const { forward, backward, left, right, jump } = usePersonControls();

    const { setAngle } = useEnemiesStore();
    
    useFrame((state) => {
        if (!playerRef.current) return;

        const velocity = playerRef.current.linvel();

        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVE_SPEED).applyEuler(state.camera.rotation);

        playerRef.current.wakeUp();
        playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);


        const { x, y, z } = playerRef.current.translation();

        state.camera.position.set(x, y, z);

        setAngle(10)
        
    });

    return (
        <>

        <RigidBody ref={playerRef} position={[0, 0.75, 0]} >
            <mesh>
                {/* <meshStandardMaterial color="red" /> */}
                <capsuleGeometry args={[0.75, 0.5]}/>
                {/* <CapsuleCollider args={[0.75, 0.5]}/> */}
            </mesh>
        </RigidBody>

        </>
    );
}

export default Player;
