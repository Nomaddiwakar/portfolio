import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group, Mesh } from "three";

const HoloCore = () => {
  const groupRef = useRef<Group>(null);
  const outerRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.25;
      outerRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Core Light */}
      <pointLight color="#00f3ff" intensity={4} distance={8} decay={2} />
      <pointLight color="#a855f7" intensity={3} distance={10} decay={2} />

      {/* Inner Emissive Sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#3b82f6"
          emissiveIntensity={2.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Hologram Wireframe Shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#c084fc"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Equatorial Hologram Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
      </mesh>

      {/* Equatorial Hologram Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.0, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.5} />
      </mesh>

      {/* Holographic 3D Tag */}
      <Html center distanceFactor={12} position={[0, 2.2, 0]}>
        <div className="pointer-events-none select-none whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-950/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.4)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              My Tech Universe
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default HoloCore;
