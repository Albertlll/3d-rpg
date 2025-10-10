import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Group } from "three";
import { craneMaterial, glassMaterial, bodyMaterial, controlPanelMaterial } from "../materials";

const ClawMachine = () => {
	const machineRef = useRef<Group>(null);

	return (
		<RigidBody type="fixed" position={[0, 1, 0]}>
			<group ref={machineRef}>


				<mesh position={[0, 0.7, 0.5]}>
					<boxGeometry args={[0.98, 1.4, 0.02]} />
					<primitive object={glassMaterial} />
				</mesh>
				
				{/* Задняя стенка */}
				<mesh position={[0, 0.7, -0.5]}>
					<boxGeometry args={[0.98, 1.4, 0.02]} />
					<primitive object={glassMaterial} />
				</mesh>
				
				{/* Левая стенка */}
				<mesh position={[-0.5, 0.7, 0]}>
					<boxGeometry args={[0.02, 1.4, 0.98]} />
					<primitive object={glassMaterial} />
				</mesh>
				
				{/* Правая стенка */}
				<mesh position={[0.5, 0.7, 0]}>
					<boxGeometry args={[0.02, 1.4, 0.98]} />
					<primitive object={glassMaterial} />
				</mesh>

				{/* Штыри между стенками */}
				<mesh position={[-0.5, 0.7, 0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<primitive object={bodyMaterial} />
				</mesh>
				
				<mesh position={[0.5, 0.7, 0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<primitive object={bodyMaterial} />
				</mesh>
				
				<mesh position={[-0.5, 0.7, -0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<primitive object={bodyMaterial} />
				</mesh>
				
				<mesh position={[0.5, 0.7, -0.5]}>
					<boxGeometry args={[0.02, 1.4, 0.02]} />
					<primitive object={bodyMaterial} />
				</mesh>
			</group>
		</RigidBody>
	);
};

export default ClawMachine;