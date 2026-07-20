import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

const Stars = () => {
  const pointsRef = useRef<Points>(null);
  const starPositions = useMemo(() => {
    const positions = new Float32Array(6000);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 120;
      positions[i + 1] = (Math.random() - 0.5) * 120;
      positions[i + 2] = (Math.random() - 0.5) * 120;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
  });

  return (
    <points ref={pointsRef} position={[0, 0, -12]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starPositions.length / 3} array={starPositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#9fc9ff" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

export default Stars;
