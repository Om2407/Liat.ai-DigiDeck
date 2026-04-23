import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Stylized Mascot Character for Brands
function FinalMascot({ name, color, hovered }: { name: string, color: string, hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (hovered) {
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.3, 0.1));
    } else {
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.0, 0.1));
    }
  });

  return (
    <group ref={meshRef}>
      <BlobCharacter name={name} color={color} hovered={hovered} />
    </group>
  );
}

function BlobCharacter({ name, color, hovered }: { name: string, color: string, hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.5;
    if (hovered) {
      meshRef.current.rotation.z = Math.sin(t * 10) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        speed={hovered ? 4 : 2}
        distort={hovered ? 0.5 : 0.3}
        radius={1}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.1}
      />
      
      {/* Visual confirmation of character nature */}
      <group position={[0, 0, 1]}>
        <mesh position={[0.3, 0.3, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-0.3, 0.3, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        {hovered && (
           <Text
            position={[0, 1.2, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyMZhrib2Bg-4.woff"
          >
            {name}
          </Text>
        )}
      </group>
    </mesh>
  );
}

export default function BrandVisual3D({ name, color, onClick }: { name: string, color: string, onClick: () => void }) {
  const [hovered, setHover] = useState(false);

  return (
    <div 
      className="w-full h-full cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <FinalMascot color={color} hovered={hovered} name={name} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} far={1} />
      </Canvas>
    </div>
  );
}
