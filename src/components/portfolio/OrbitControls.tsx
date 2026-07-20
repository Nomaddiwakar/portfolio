import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

const OrbitControls = () => {
  return (
    <DreiOrbitControls
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      rotateSpeed={0.3}
      dampingFactor={0.12}
      autoRotate={false}
      enableDamping
    />
  );
};

export default OrbitControls;
