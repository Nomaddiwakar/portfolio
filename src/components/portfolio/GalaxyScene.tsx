import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Stars from "./Stars";
import Nebula from "./Nebula";
import ParticleField from "./ParticleField";
import OrbitControls from "./OrbitControls";
import ShootingStars from "./ShootingStars";
import SkillPlanet from "./SkillPlanet";
import HoloCore from "./HoloCore";
import CameraRig from "./CameraRig";
import type { SkillOrb, SkillCategory } from "./SkillsGalaxy";

interface GalaxySceneProps {
  skills: SkillOrb[];
  onSelect: (skill: SkillOrb) => void;
  activeSkill: SkillOrb | null;
  pointer: [number, number];
  selectedCategory: SkillCategory;
}

const orbitalRingRadii = [2.6, 3.6, 4.6, 5.6, 6.6, 7.6];

const GalaxyScene = ({
  skills,
  onSelect,
  activeSkill,
  pointer,
  selectedCategory,
}: GalaxySceneProps) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 19.5], fov: 40 }}
      style={{ width: "100%", height: "100%", display: "block", touchAction: "pan-y" }}
      className="rounded-[2.5rem]"
    >
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 14, 32]} />

      {/* Ambient & Directional Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[15, 12, 15]} intensity={2.0} color="#38bdf8" />
      <directionalLight position={[-15, 10, -10]} intensity={1.2} color="#c084fc" />

      {/* Deep Cyberpunk Space Background Elements */}
      <Stars />
      <Nebula />
      <ParticleField />
      <ShootingStars />

      {/* Central 3D Holographic Core */}
      <HoloCore />

      {/* Glowing Orbital Ring Paths */}
      {orbitalRingRadii.map((radius, idx) => (
        <mesh
          key={radius}
          rotation={[Math.PI / (4 + (idx % 3)), (idx * Math.PI) / 6, 0]}
        >
          <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? "#06b6d4" : "#a855f7"}
            transparent
            opacity={0.2}
            side={2}
          />
        </mesh>
      ))}

      {/* Orbiting Skill Planets */}
      {skills.map((skill) => (
        <SkillPlanet
          key={skill.name}
          skill={skill}
          onSelect={onSelect}
          active={activeSkill?.name === skill.name}
          selectedCategory={selectedCategory}
        />
      ))}

      {/* Camera Parallax Rig & Orbit Controls */}
      <CameraRig pointer={pointer} activeSkill={activeSkill} />
      <OrbitControls />

      <Preload all />
    </Canvas>
  );
};

export default GalaxyScene;
