import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

const ParticleField = () => {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(3000);
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 40;
      array[i + 1] = (Math.random() - 0.5) * 40;
      array[i + 2] = (Math.random() - 0.5) * 40;
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0012;
    pointsRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.12) * 0.4 - 4;
  });

  return (
    <points ref={pointsRef} position={[0, 0, -5]}> 
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#7e9dff"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleField;
