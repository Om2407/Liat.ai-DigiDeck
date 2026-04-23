import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

function BlobMascot({ position, color, speed, factor }: { position: [number, number, number], color: string, speed: number, factor: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.2;
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={0.4}
          radius={1}
        />
        {/* Simple Eyes for "Character" feel */}
        <mesh position={[0.4, 0.4, 0.8]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-0.4, 0.4, 0.8]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </mesh>
    </Float>
  );
}

function CubieMascot({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = position[1] + Math.cos(t * 1.2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <MeshWobbleMaterial color={color} speed={1} factor={0.6} />
        {/* Face */}
        <mesh position={[0, 0, 0.61]}>
           <planeGeometry args={[0.8, 0.4]} />
           <meshBasicMaterial color="black" transparent opacity={0.8} />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function MascotScene() {
  return (
    <group>
      <BlobMascot position={[-3, 0, 0]} color="#FFD700" speed={2} factor={1} />
      <CubieMascot position={[3, 0.5, 0]} color="#00FF7F" />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
    </group>
  );
}
