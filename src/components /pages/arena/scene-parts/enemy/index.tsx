import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import type { Mesh } from "three";
import { NearestFilter } from "three";
import spider from "./spider.png";
function Enemy(props: { x: number; y: number; z: number }) {
	const texture = useTexture(spider);

	texture.minFilter = NearestFilter;
	texture.magFilter = NearestFilter;

	const enemyRef = useRef<null | Mesh>(null);

	useFrame((state) => {
		if (!enemyRef.current) return;

		// const cameraPos = state.camera.position;
		// const enemyPos = enemyRef.current.position;

		enemyRef.current.lookAt(state.camera.position);

		// const r = Math.sqrt((enemyPos.x - cameraPos.x) ** 2 - (enemyPos.y - cameraPos.y) ** 2 )

		// console.log(r - enemyPos.x ** 2)
		// console.log(enemyPos.x)

		// console.log(enemyRef.current.normalMatrix)

		// enemyRef.current.rotation.y = newAngle
	});

	return (
		<RigidBody type="dynamic">
			<mesh ref={enemyRef} position={[props.x, props.y, props.z]}>
				<planeGeometry />
				<meshStandardMaterial map={texture} transparent />
			</mesh>
		</RigidBody>
	);
}

export default Enemy;
