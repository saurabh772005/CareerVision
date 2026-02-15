
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Text, 
  Environment, 
  ContactShadows,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { Compass } from 'lucide-react';

// Intrinsic elements for React Three Fiber
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const SphereGeometry = 'sphereGeometry' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
// Fix: Added AmbientLight and ensure all lights use aliased constants for JSX
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const CompassModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const needleRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current || !needleRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth mouse follow rotation for the whole compass
    const targetRotationX = (mouse.y * viewport.height) / 20;
    const targetRotationY = (mouse.x * viewport.width) / 20;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);

    // Needle points slightly towards mouse but keeps a rhythmic pulse
    needleRef.current.rotation.z = THREE.MathUtils.lerp(
      needleRef.current.rotation.z, 
      Math.atan2(mouse.y, mouse.x) + Math.sin(t * 2) * 0.1, 
      0.05
    );
  });

  return (
    <Group ref={groupRef}>
      {/* Outer Glass Ring */}
      <Mesh>
        <TorusGeometry args={[2.5, 0.15, 32, 100]} />
        <MeshTransmissionMaterial 
          backside 
          samples={16} 
          thickness={0.5} 
          chromaticAberration={0.02} 
          anisotropy={0.1} 
          distortion={0.1} 
          distortionScale={0.1} 
          temporalDistortion={0.1} 
          color="#00C2FF" 
        />
      </Mesh>

      {/* Main Body Dial */}
      <Mesh rotation={[Math.PI / 2, 0, 0]}>
        <CylinderGeometry args={[2.2, 2.2, 0.2, 64]} />
        <MeshStandardMaterial 
          color="#0A0E27" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#0047FF" 
          emissiveIntensity={0.1} 
        />
      </Mesh>

      {/* Inner Glowing Ring */}
      <Mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.11]}>
        <TorusGeometry args={[1.8, 0.02, 16, 100]} />
        <MeshStandardMaterial color="#02C39A" emissive="#02C39A" emissiveIntensity={2} />
      </Mesh>

      {/* Career Direction Marks */}
      {[
        { label: "GROWTH", pos: [0, 2, 0.15] },
        { label: "ROI", pos: [2, 0, 0.15] },
        { label: "SKILLS", pos: [0, -2, 0.15] },
        { label: "CLARITY", pos: [-2, 0, 0.15] }
      ].map((mark, i) => (
        <Text
          key={i}
          position={mark.pos as [number, number, number]}
          fontSize={0.2}
          color="white"
          font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
          anchorX="center"
          anchorY="middle"
        >
          {mark.label}
        </Text>
      ))}

      {/* Compass Needle */}
      <Group ref={needleRef} position={[0, 0, 0.2]}>
        {/* Top Half - Blue */}
        <Mesh position={[0, 0.8, 0]}>
          <CylinderGeometry args={[0, 0.15, 1.6, 4]} />
          <MeshStandardMaterial color="#007AFF" emissive="#007AFF" emissiveIntensity={1} />
        </Mesh>
        {/* Bottom Half - Teal */}
        <Mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.PI]}>
          <CylinderGeometry args={[0, 0.15, 1.6, 4]} />
          <MeshStandardMaterial color="#02C39A" emissive="#02C39A" emissiveIntensity={1} />
        </Mesh>
        {/* Center Pin */}
        <Mesh>
          <SphereGeometry args={[0.2, 16, 16]} />
          <MeshStandardMaterial color="white" metalness={1} roughness={0} />
        </Mesh>
      </Group>

      {/* Decorative Floating Particles */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <Mesh position={[2.5, 2.5, -1]}>
          <SphereGeometry args={[0.1, 8, 8]} />
          <MeshStandardMaterial color="#02C39A" emissive="#02C39A" emissiveIntensity={2} />
        </Mesh>
      </Float>
      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        <Mesh position={[-2.5, -2, -0.5]}>
          <SphereGeometry args={[0.08, 8, 8]} />
          <MeshStandardMaterial color="#007AFF" emissive="#007AFF" emissiveIntensity={2} />
        </Mesh>
      </Float>

      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
    </Group>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <Compass size={48} className="text-[#02C39A] animate-spin" />
    <span className="text-xs font-bold text-[#6B7A8F] uppercase tracking-widest">Initializing 3D Compass...</span>
  </div>
);

const Compass3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center cursor-move">
      <React.Suspense fallback={<LoadingState />}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 8], fov: 40 }}
        >
          {/* Fix: Use capitalized aliased components for light elements to satisfy JSX typing */}
          <AmbientLight intensity={0.5} />
          <PointLight position={[10, 10, 10]} intensity={2} color="#00C2FF" />
          <PointLight position={[-10, -10, 10]} intensity={1} color="#02C39A" />
          
          <Environment preset="night" />

          <CompassModel />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false}
            makeDefault 
            rotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Canvas>
      </React.Suspense>
    </div>
  );
};

export default Compass3D;
