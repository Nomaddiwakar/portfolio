import { useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, Points } from "three";

const ShootingStars = () => {
  const [positions] = useState(() => new Float32Array(6));
  const [active, setActive] = useState(false);
  const pointsRef = useMemo(() => ({ current: null as Points | null }), []);

  useEffect(() => {
    const interval = window.setInterval(() => setActive(true), 5500);
    return () => window.clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (active && pointsRef.current) {
      const t = state.clock.getElapsedTime();
      pointsRef.current.position.set(Math.cos(t) * 25, Math.sin(t * 0.8) * 18, -18);
      pointsRef.current.material.opacity = Math.max(0, 1 - (t % 3) * 0.32);
      if ((t % 3) > 2.75) setActive(false);
    }
  });

  return (
    <points ref={pointsRef} visible={active}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={2} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1.1} color="#ffca5e" transparent opacity={0.9} />
    </points>
  );
};

export default ShootingStars;
