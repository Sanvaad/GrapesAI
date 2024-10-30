// src/components/medical/3DAnalysis/ModelAnalysis.tsx
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useGLTF,
  Bounds,
  PerspectiveCamera,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";

interface HighlightPoint {
  position: [number, number, number];
  label: string;
  value: number;
  color: string;
}

interface ModelProps {
  highlightPoints: HighlightPoint[];
  onPointClick: (point: HighlightPoint) => void;
}

const Model: React.FC<ModelProps> = ({ highlightPoints, onPointClick }) => {
  const gltf = useGLTF("/human_anatomy.glb");
  const modelRef = useRef<THREE.Group>();
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.group ref={modelRef} scale={scale}>
      <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} />

      {/* Highlight points */}
      {highlightPoints.map((point, index) => (
        <group key={index} position={point.position}>
          <mesh
            onPointerOver={() => setHovered(point.label)}
            onPointerOut={() => setHovered(null)}
            onClick={() => onPointClick(point)}
          >
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial
              color={point.color}
              emissive={point.color}
              emissiveIntensity={hovered === point.label ? 2 : 0.5}
            />
          </mesh>

          <Html position={[0.1, 0.1, 0.1]} style={{ pointerEvents: "none" }}>
            <div className="bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
              {point.label}: {point.value}
            </div>
          </Html>
        </group>
      ))}
    </animated.group>
  );
};

interface AnalysisPoint {
  id: string;
  label: string;
  value: number;
  risk: "low" | "medium" | "high";
  details: string;
}

export function ModelAnalysis(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<AnalysisPoint | null>(
    null,
  );
  const [analysisPoints] = useState<AnalysisPoint[]>([
    {
      id: "1",
      label: "Heart",
      value: 85,
      risk: "medium",
      details: "Moderate cardiovascular risk detected",
    },
    {
      id: "2",
      label: "Lungs",
      value: 92,
      risk: "low",
      details: "Normal respiratory function",
    },
    {
      id: "3",
      label: "Brain",
      value: 78,
      risk: "high",
      details: "Elevated neurological indicators",
    },
  ]);

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case "low":
        return "#10B981";
      case "medium":
        return "#F59E0B";
      case "high":
        return "#EF4444";
      default:
        return "#3B82F6";
    }
  };

  const highlightPoints: HighlightPoint[] = analysisPoints.map((point) => ({
    position: getPositionForOrgan(point.label),
    label: point.label,
    value: point.value,
    color: getRiskColor(point.risk),
  }));

  function getPositionForOrgan(organ: string): [number, number, number] {
    // These positions would need to be adjusted based on your 3D model
    const positions: Record<string, [number, number, number]> = {
      Heart: [0, 0.5, 0],
      Lungs: [0.3, 0.5, 0],
      Brain: [0, 1.2, 0],
    };
    return positions[organ] || [0, 0, 0];
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-[#141925] border-[#1E2433]">
        <CardHeader>
          <CardTitle className="text-white">3D Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] w-full">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, 3]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />

              <Suspense
                fallback={
                  <Html center>
                    <div className="text-white">Loading 3D model...</div>
                  </Html>
                }
              >
                <Bounds fit clip observe damping={6} margin={1.2}>
                  <Model
                    highlightPoints={highlightPoints}
                    onPointClick={(point) => {
                      const analysis = analysisPoints.find(
                        (p) => p.label === point.label,
                      );
                      if (analysis) setSelectedPoint(analysis);
                    }}
                  />
                </Bounds>
              </Suspense>

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={(Math.PI * 3) / 4}
              />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#141925] border-[#1E2433]">
        <CardHeader>
          <CardTitle className="text-white">Analysis Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedPoint ? (
              <>
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    {selectedPoint.label}
                  </h3>
                  <Badge
                    variant={selectedPoint.risk as "default" | "secondary"}
                    className={`
                      ${selectedPoint.risk === "low" && "bg-green-500/10 text-green-500"}
                      ${selectedPoint.risk === "medium" && "bg-yellow-500/10 text-yellow-500"}
                      ${selectedPoint.risk === "high" && "bg-red-500/10 text-red-500"}
                    `}
                  >
                    {selectedPoint.risk.toUpperCase()} RISK
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-[#94A3B8]">Health Score</p>
                  <div className="text-2xl font-bold text-white">
                    {selectedPoint.value}%
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[#94A3B8]">Analysis</p>
                  <p className="text-white">{selectedPoint.details}</p>
                </div>

                <Button
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                  onClick={() => {
                    /* Handle detailed view */
                  }}
                >
                  View Detailed Report
                </Button>
              </>
            ) : (
              <p className="text-[#94A3B8]">
                Select a point on the model to view analysis details
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
