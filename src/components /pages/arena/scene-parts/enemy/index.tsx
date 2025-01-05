import { useRef } from "react";
import { useEnemiesStore } from "../../../../../stores/enemies-store";
import {useFrame} from "@react-three/fiber";
import { Euler, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import cat from "./cat.png"
function Enemy(props : {x : number, y : number, z : number}) {

    const texture = useTexture(cat)



    const enemyRef = useRef<null | Mesh>(null);

    useFrame((state) => {
        if (!enemyRef.current) return;


        const cameraPos = state.camera.position;
        const enemyPos = enemyRef.current.position;


        enemyRef.current.lookAt(state.camera.position)


        // const r = Math.sqrt((enemyPos.x - cameraPos.x) ** 2 - (enemyPos.y - cameraPos.y) ** 2 )

        // console.log(r - enemyPos.x ** 2)
        // console.log(enemyPos.x)

        // console.log(enemyRef.current.normalMatrix)

        // enemyRef.current.rotation.y = newAngle

        
    });

    return (
        <mesh ref={enemyRef} position={[props.x, props.y, props.z]}>

            <planeGeometry/>
            <meshStandardMaterial map={texture} transparent/>
        
        </mesh>
    );
}

export default Enemy;