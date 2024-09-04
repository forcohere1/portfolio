import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

const Blob = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'transparent',
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <RotatingBlob />
    </Canvas>
  );
};

const RotatingBlob = () => {
  const meshRef = React.useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere
      args={[1.5, 128, 128]}
      ref={meshRef}
      scale={[viewport.width / 10, viewport.width / 10, viewport.width / 10]}
    >
      <MeshDistortMaterial
        color="#ffffff"
        distort={0.5}
        speed={2}
        roughness={0.4}
        metalness={0.1}
        transparent={true}
        opacity={0.3}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={1}
        transmission={1}
        thickness={1.5}
      />
    </Sphere>
  );
};

export default Blob;
