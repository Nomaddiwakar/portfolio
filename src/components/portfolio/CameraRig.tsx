import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3, PerspectiveCamera } from "three";
import type { SkillOrb } from "./SkillsGalaxy";

interface CameraRigProps {
  pointer: [number, number];
  activeSkill: SkillOrb | null;
}

const CameraRig = ({ pointer, activeSkill }: CameraRigProps) => {
  const { camera, size } = useThree();
  const target = useMemo(() => new Vector3(0, 0, 0), []);
  const desired = useMemo(() => new Vector3(), []);
  const focus = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const aspect = size.width / size.height;

    // Calculate required distance so max orbit radius (7.8) fits with 15% breathing room
    // On narrower mobile/tablet viewports, push camera further back proportionally
    const baseZ = aspect < 1 ? 20.0 / Math.max(0.45, aspect * 0.85) : 19.5 / Math.min(1.3, aspect);

    const pointerX = pointer[0] || 0;
    const pointerY = pointer[1] || 0;

    // Center baseline position at (0, 0, baseZ) with subtle mouse tilt
    desired.set(
      Math.sin(pointerX * 0.5) * 1.8 + (activeSkill ? activeSkill.position[0] * 0.1 : 0),
      -Math.sin(pointerY * 0.5) * 1.2 + (activeSkill ? activeSkill.position[1] * 0.1 : 0),
      baseZ - (activeSkill ? 2.0 : 0)
    );

    camera.position.lerp(desired, 0.08);

    focus.set(
      activeSkill ? activeSkill.position[0] * 0.15 : 0,
      activeSkill ? activeSkill.position[1] * 0.15 : 0,
      activeSkill ? activeSkill.position[2] * 0.15 : 0
    );

    target.lerp(focus, 0.08);
    camera.lookAt(target);
  });

  return null;
};

export default CameraRig;
