import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Group } from "three";
import { craneMaterial, glassMaterial, bodyMaterial, controlPanelMaterial } from "../materials";
import { startGame } from "../../../../../../stores/game-state-store";
import { startAttempts } from "../../../../../../stores/attempts-timer-store";
const ClawMachine = () => {
    const machineRef = useRef<Group>(null);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    // Цвета автомата
    const colors = {
        mainBody: "#2c3e50",        // Основной корпус
        glassWalls: "#34495e",      // Полупрозрачные стенки
        claw: "#e74c3c",           // Хваталка
        controlPanel: "#34495e",   // Панель управления
        coinSlot: "#f39c12",       // Зона для мелочи
        cardSlot: "#3498db",       // Зона для карты
        joystick: "#e67e22",       // Джойстик
        button: isButtonHovered ? "#ff6b6b" : "#e74c3c",        // Кнопка (подсвечивается при наведении)
        toys: {
            bear: "#8e44ad",      // Медведь
            cube: "#f39c12",      // Кубик
            heart: "#e74c3c"      // Сердце
        }
    };

    // Обработчик клика по кнопке
    const handleButtonClick = () => {
        startAttempts();
    };

    return (
        <RigidBody type="fixed" position={[0, 1, 0]}>
            <group ref={machineRef}>
                {/* Основной корпус */}

                {/* Боковые стенки */}
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

                {/* Кнопка для запуска игры */}
                <mesh
                    position={[0.6, -0.25, 0.1]}
                    onPointerEnter={() => setIsButtonHovered(true)}
                    onPointerLeave={() => setIsButtonHovered(false)}
                    onClick={handleButtonClick}
                >
                    <cylinderGeometry args={[0.05, 0.05, 0.05]} />
                    <meshStandardMaterial color={colors.button} />
                </mesh>
            </group>
        </RigidBody>
    );
};

export default ClawMachine;