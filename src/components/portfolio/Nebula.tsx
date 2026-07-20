import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Mesh } from "three";

const Nebula = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.18) * 0.06;
    meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.12) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, -1.5, -6]} rotation={[0, 0, 0]}> 
      <planeGeometry args={[22, 14, 42, 42]} />
      <meshBasicMaterial
        color="#6a6cff"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default Nebula;
