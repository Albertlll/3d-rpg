import { useFrame } from "@react-three/fiber";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";
import { usePersonControls } from "../hooks/move-hook";

function Player() {
	const playerRef = useRef<RapierRigidBody | null>(null);
	const controls = usePersonControls();


	useFrame((state) => {
		if (!playerRef.current) return;

		const speed = 9;
		const velocity = new Vector3();

		const cameraDirection = new Vector3();
		state.camera.getWorldDirection(cameraDirection);
		cameraDirection.y = 0;
		cameraDirection.normalize();

		const rightDirection = new Vector3();
		rightDirection.crossVectors(cameraDirection, new Vector3(0, 1, 0));
		rightDirection.normalize();

		if (controls.forward) {
			velocity.add(cameraDirection.clone().multiplyScalar(speed));
		}
		if (controls.backward) {
			velocity.add(cameraDirection.clone().multiplyScalar(-speed));
		}

		if (controls.left) {
			velocity.add(rightDirection.clone().multiplyScalar(-speed));
		}
		if (controls.right) {
			velocity.add(rightDirection.clone().multiplyScalar(speed));
		}

		if (controls.jump) {
			const currentVelocity = playerRef.current.linvel();
			if (Math.abs(currentVelocity.y) < 0.1) {
				velocity.y = 100;
			}
		}

		playerRef.current.setLinvel(velocity, true);

		const playerPosition = playerRef.current.translation();
		state.camera.position.set(playerPosition.x, playerPosition.y + 0.5, playerPosition.z);
	});

	return (
		<>
			<RigidBody
				ref={playerRef}
				type="dynamic"
				position={[5, 0.75, 0]}
				lockRotations
			>
				<mesh>
					<capsuleGeometry args={[0.75, 0.5]} />
				</mesh>
			</RigidBody>
		</>
	);
}

export default Player;
