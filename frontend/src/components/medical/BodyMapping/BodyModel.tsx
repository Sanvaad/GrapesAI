// src/components/medical/BodyMapping/BodyModel.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Model = ({ highlightedParts, riskScores }) => {
  const gltf = useLoader(GLTFLoader, "/models/human_body.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive object={gltf.scene} ref={modelRef} scale={[1.5, 1.5, 1.5]} />
  );
};

export function BodyVisualization({ highlightedParts = {}, riskScores = {} }) {
  return (
    <div className="w-full h-[600px] bg-[#141925] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense
          fallback={
            <Html>
              <div className="text-white">Loading 3D model...</div>
            </Html>
          }
        >
          <Model highlightedParts={highlightedParts} riskScores={riskScores} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Usage:
// <BodyVisualization
//   highlightedParts={{ heart: true, lungs: true }}
//   riskScores={{ heart: 75, lungs: 45 }}
// />
