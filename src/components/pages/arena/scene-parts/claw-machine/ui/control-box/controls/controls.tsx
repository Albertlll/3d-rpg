import { RigidBody } from "@react-three/rapier";

const ClawControls = () => {
    return (
        <RigidBody type="fixed" position={[0.61, 0.6, 0]}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 0.3, 1.02]} />
                <meshStandardMaterial color="#2c3e58" />
            </mesh>
        </RigidBody>
    )
}

export default ClawControls;