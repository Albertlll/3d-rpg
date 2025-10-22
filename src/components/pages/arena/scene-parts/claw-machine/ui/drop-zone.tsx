import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Group, Mesh } from "three";
import { bodyMaterial } from "../materials";

const DropZone = () => {
    const dropZoneRef = useRef<Group>(null);

    // Определяем зону сброса сбоку от автомата
    const DROP_ZONE = {
        width: 0.6,   // Ширина зоны сброса
        depth: 0.4,   // Глубина зоны сброса
        height: 0.8,  // Высота зоны сброса
    };

    return (
        <group ref={dropZoneRef} position={[0.8, 0, 0]}>
            {/* Зона сброса - видимая область для пойманных игрушек */}
            <RigidBody type="fixed" position={[0, DROP_ZONE.height / 2 - 0.1, 0]}>
                {/* Пол зоны сброса */}
                <mesh position={[0, -DROP_ZONE.height / 2 + 0.05, 0]}>
                    <boxGeometry args={[DROP_ZONE.width, 0.1, DROP_ZONE.depth]} />
                    <meshStandardMaterial color="#2c3e50" opacity={0.5} transparent />
                </mesh>

                {/* Задняя стенка зоны сброса */}
                <mesh position={[0, 0, -DROP_ZONE.depth / 2]}>
                    <boxGeometry args={[DROP_ZONE.width, DROP_ZONE.height, 0.02]} />
                    <meshStandardMaterial color="#34495e" opacity={0.3} transparent />
                </mesh>

                {/* Левая стенка зоны сброса */}
                <mesh position={[-DROP_ZONE.width / 2, 0, 0]}>
                    <boxGeometry args={[0.02, DROP_ZONE.height, DROP_ZONE.depth]} />
                    <meshStandardMaterial color="#34495e" opacity={0.3} transparent />
                </mesh>

                {/* Правая стенка зоны сброса */}
                <mesh position={[DROP_ZONE.width / 2, 0, 0]}>
                    <boxGeometry args={[0.02, DROP_ZONE.height, DROP_ZONE.depth]} />
                    <meshStandardMaterial color="#34495e" opacity={0.3} transparent />
                </mesh>

                {/* Передняя стенка зоны сброса (прозрачная для видимости) */}
                <mesh position={[0, 0, DROP_ZONE.depth / 2]}>
                    <boxGeometry args={[DROP_ZONE.width, DROP_ZONE.height, 0.02]} />
                    <meshStandardMaterial color="#3498db" opacity={0.1} transparent />
                </mesh>
            </RigidBody>

            {/* Надпись на зоне сброса */}
            <mesh position={[0, DROP_ZONE.height + 0.2, 0]}>
                <planeGeometry args={[DROP_ZONE.width * 0.8, 0.3]} />
                <meshBasicMaterial color="#f39c12" transparent opacity={0.8} />
            </mesh>
        </group>
    );
};

export default DropZone;
