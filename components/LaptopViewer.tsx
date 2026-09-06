// components/LaptopViewer.jsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function LaptopModel() {
  const { scene } = useGLTF("/profile/Untitled.glb");
  return <primitive object={scene} scale={4} />;
}

export default function LaptopViewer() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <LaptopModel />
      <OrbitControls />
    </Canvas>
  );
}
