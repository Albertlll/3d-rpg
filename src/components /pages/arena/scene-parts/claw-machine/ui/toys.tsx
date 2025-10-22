import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { Mesh } from "three";
import { registerToy, unregisterToy } from "../../../../../../stores/toys-store";

type ToyProps = { id: string; position: [number, number, number]; color: string };

const Toy = ({ id, position, color }: ToyProps) => {
  const bodyRef = useRef<any>(null);
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (bodyRef.current) registerToy({ id, api: bodyRef.current });
    return () => unregisterToy({ id });
  }, [id]);

  return (
    <RigidBody ref={bodyRef} type="dynamic" position={position} colliders={false} restitution={0.2} friction={1}>
      {/* Визуальная форма */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Коллайдер под коробку */}
      <CuboidCollider args={[0.06, 0.06, 0.06]} />
    </RigidBody>
  );
};

const Toys = () => {
  const toys = useMemo(() => {
    const arr: ToyProps[] = [];
    const colors = ["#f39c12", "#e74c3c", "#8e44ad", "#2ecc71", "#3498db", "#1abc9c"];
    for (let i = 0; i < 8; i++) {
      const x = -0.35 + Math.random() * 0.7;
      const z = -0.35 + Math.random() * 0.7;
      // Мировая высота пола автомата ~ 1.0; кладём игрушки чуть выше, чтобы упали на пол
      const y = 1.2 + Math.random() * 0.15;
      arr.push({ id: `toy-${i}`, position: [x, y, z], color: colors[i % colors.length] });
    }
    return arr;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {toys.map((t) => (
        <Toy key={t.id} {...t} />
      ))}
    </group>
  );
};

export default Toys;

