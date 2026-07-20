import { useRef, useMemo, useState } from "react";
import { useFrame, type MeshStandardMaterialProps, type MeshBasicMaterialProps } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import type { SkillOrb, SkillCategory } from "./SkillsGalaxy";

interface SkillPlanetProps {
  skill: SkillOrb;
  onSelect: (skill: SkillOrb) => void;
  active?: boolean;
  selectedCategory: SkillCategory;
}

const SkillPlanet = ({ skill, onSelect, active, selectedCategory }: SkillPlanetProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  // Check if current node is dimmed by category filter
  const isDimmed =
    selectedCategory !== "All" && selectedCategory !== skill.category;

  const bodyShape = useMemo(() => {
    switch (skill.type) {
      case "cube":
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case "crystal":
        return <octahedronGeometry args={[0.95, 0]} />;
      case "ring":
        return <torusKnotGeometry args={[0.85, 0.2, 48, 16]} />;
      case "terminal":
        return <boxGeometry args={[1.3, 0.85, 0.2]} />;
      case "moon":
        return <icosahedronGeometry args={[1.05, 1]} />;
      case "satellite":
        return <coneGeometry args={[0.55, 1.2, 12]} />;
      default:
        return <sphereGeometry args={[0.95, 24, 24]} />;
    }
  }, [skill.type]);

  const ringShape = useMemo(() => {
    if (skill.type === "ring") {
      const ringMaterialProps: MeshBasicMaterialProps = {
        color: skill.accent,
        transparent: true,
        opacity: 0.35,
        side: 2,
      };

      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.65, 48]} />
          <meshBasicMaterial {...ringMaterialProps} />
        </mesh>
      );
    }
    if (skill.type === "moon") {
      const moonMaterialProps: MeshBasicMaterialProps = {
        color: skill.color,
        transparent: true,
        opacity: 0.25,
      };

      return (
        <mesh rotation={[0, 0, Math.PI / 3]} scale={1.35}>
          <torusGeometry args={[1.35, 0.07, 12, 48]} />
          <meshBasicMaterial {...moonMaterialProps} />
        </mesh>
      );
    }
    return null;
  }, [skill.type, skill.accent, skill.color]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Orbital revolution
    if (groupRef.current) {
      groupRef.current.rotation.y = t * skill.orbitSpeed * 0.4;
    }

    // Local node rotation & float
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.5 + skill.position[0]) * 0.1;
      meshRef.current.position.y =
        skill.position[1] + Math.sin(t * 1.2 + skill.position[0]) * 0.15;
    }
  });

  const targetScale = isDimmed
    ? skill.scale * 0.5
    : hovered
    ? skill.scale * 1.3
    : active
    ? skill.scale * 1.2
    : skill.scale;

  return (
    <group ref={groupRef}>
      <group
        ref={meshRef}
        scale={targetScale}
        position={skill.position}
      >
        {/* Node Point Light for Neon Glow */}
        <pointLight
          color={skill.color}
          intensity={hovered || active ? 3.5 : isDimmed ? 0.3 : 1.2}
          distance={4}
          decay={2}
        />

        {/* 3D Geometry */}
        <mesh
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(event) => {
            event.stopPropagation();
            setHovered(false);
          }}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(skill);
          }}
        >
          {bodyShape}
          <meshStandardMaterial
            {...({
              color: skill.color,
              emissive: skill.accent,
              emissiveIntensity: hovered || active ? 2.0 : isDimmed ? 0.2 : 0.9,
              roughness: 0.2,
              metalness: 0.5,
              transparent: true,
              opacity: isDimmed ? 0.25 : 0.95,
            } as MeshStandardMaterialProps)}
          />
        </mesh>

        {ringShape}

        {/* Outer Aura Glow */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.15, 16, 16]} />
          <meshBasicMaterial
            {...({
              color: skill.accent,
              transparent: true,
              opacity: hovered ? 0.2 : isDimmed ? 0.02 : 0.06,
              toneMapped: false,
            } as MeshBasicMaterialProps)}
          />
        </mesh>

        {/* 3D Label Tag on Hover / Selection */}
        {(hovered || active || selectedCategory === skill.category) && !isDimmed && (
          <Html distanceFactor={14} position={[0, 1.6, 0]} center>
            <div
              onClick={() => onSelect(skill)}
              className="cursor-pointer select-none whitespace-nowrap rounded-2xl border border-white/20 bg-slate-950/85 px-3 py-1.5 text-center shadow-xl backdrop-blur-xl transition-transform hover:scale-105"
              style={{
                boxShadow: `0 0 20px ${skill.color}40`,
                borderColor: `${skill.color}66`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: skill.color }}
                />
                <p className="font-mono text-xs font-semibold text-white tracking-wider">
                  {skill.name}
                </p>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

export default SkillPlanet;
