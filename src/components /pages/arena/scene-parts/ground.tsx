import { RigidBody } from "@react-three/rapier";

function Ground() {
	return (
		<RigidBody type="fixed">
			<mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
				<planeGeometry args={[500, 500]} />
				<meshStandardMaterial color="rgb(76, 99, 99)" />
			</mesh>
		</RigidBody>
	);
}

export default Ground;
