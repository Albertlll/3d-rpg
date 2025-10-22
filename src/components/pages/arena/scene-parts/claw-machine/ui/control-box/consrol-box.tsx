import { RigidBody } from "@react-three/rapier";

const ControlBox = () => {
	// Цвет корпуса для control-box
	const bodyColor = "#2c3e50";

	return (
		<RigidBody type="fixed" position={[0, 0, 0]}>
			<group>
				<mesh position={[0, 0.5, 0]}>
					<boxGeometry args={[1.02, 1, 1.02]} />
					<meshStandardMaterial color={bodyColor} />
				</mesh>
			</group>
		</RigidBody>
	);
};

export default ControlBox;