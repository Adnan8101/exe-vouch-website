'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Points, PointMaterial, OrbitControls, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { createNoise3D } from 'simplex-noise';

// Particle System - Floating Golden Particles
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2500; // Reduced for performance
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread particles in 3D space
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      // Golden color palette with variations
      const goldVariation = Math.random() * 0.3;
      colors[i3] = 0.78 + goldVariation; // R
      colors[i3 + 1] = 0.65 + goldVariation * 0.5; // G
      colors[i3 + 2] = 0.43 + goldVariation * 0.3; // B
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Wave motion
      positions[i3 + 1] = y + Math.sin(time + x * 0.1) * 0.01;
      positions[i3] = x + Math.cos(time + y * 0.1) * 0.01;
      positions[i3 + 2] = z + Math.sin(time + x * 0.05) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Animated Waves - Multiple Layers
function AnimatedWave({ color, speed, yOffset, amplitude }: { color: string; speed: number; yOffset: number; amplitude: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime * speed;
    const geometry = meshRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      
      const noiseValue = noise3D(x * 0.3, y * 0.3, time);
      const z = noiseValue * amplitude;
      
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
    
    meshRef.current.rotation.z = time * 0.1;
  });
  
  return (
    <mesh ref={meshRef} position={[0, yOffset, -10]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Glowing Orbs - Floating Energy Spheres
function GlowingOrbs() {
  const orbCount = 8;
  
  return (
    <>
      {Array.from({ length: orbCount }).map((_, i) => (
        <FloatingOrb key={i} index={i} total={orbCount} />
      ))}
    </>
  );
}

function FloatingOrb({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 15;
  
  const color = useMemo(() => {
    const colors = ['#c9a76f', '#d4b786', '#f4e5c3', '#b8965f', '#e6d4b0'];
    return colors[index % colors.length];
  }, [index]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const speed = 0.3 + index * 0.1;
    
    meshRef.current.position.x = Math.cos(time * speed + angle) * radius;
    meshRef.current.position.y = Math.sin(time * speed * 0.7) * 8;
    meshRef.current.position.z = Math.sin(time * speed + angle) * radius;
    
    meshRef.current.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.3);
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
}

// Flowing Lines - Energy Streams
function FlowingLines() {
  const groupRef = useRef<THREE.Group>(null);
  const lineCount = 20;
  
  const lines = useMemo(() => {
    return Array.from({ length: lineCount }).map((_, i) => {
      const points = [];
      const segments = 100;
      const radius = 10 + i * 0.5;
      
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = (j / segments) * 20 - 10;
        const z = Math.sin(angle) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      return {
        points,
        color: new THREE.Color().setHSL(0.1 + i * 0.02, 0.8, 0.6),
      };
    });
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  
  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line key={i} points={line.points} color={line.color} />
      ))}
    </group>
  );
}

function Line({ points, color }: { points: THREE.Vector3[]; color: THREE.Color }) {
  const lineRef = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);
  
  useFrame((state) => {
    if (!lineRef.current) return;
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });
  
  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    }))} ref={lineRef} />
  );
}

// Rotating Galaxy
function RotatingGalaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 5000; // Reduced for performance
  
  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    const colorPalette = [
      new THREE.Color('#c9a76f'),
      new THREE.Color('#d4b786'),
      new THREE.Color('#f4e5c3'),
      new THREE.Color('#b8965f'),
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 25;
      const spinAngle = radius * 0.5;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      const mixedColor = colorPalette[i % 4].clone();
      mixedColor.lerp(new THREE.Color('#ffffff'), Math.random() * 0.3);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      scales[i] = Math.random();
    }
    
    return [positions, colors, scales];
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Morphing Sphere - Central Focal Point
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });
  
  return (
    <Sphere ref={meshRef} args={[3, 64, 64]} position={[0, 0, -5]}>
      <MeshDistortMaterial
        color="#c9a76f"
        emissive="#d4b786"
        emissiveIntensity={0.5}
        distort={0.4}
        speed={2}
        roughness={0.4}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

// Neural Network Effect
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 30;
  
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
    }));
  }, []);
  
  const connections = useMemo(() => {
    const connections = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.9) {
          connections.push([i, j]);
        }
      }
    }
    return connections;
  }, []);
  
  useFrame(() => {
    if (!groupRef.current) return;
    
    nodes.forEach((node) => {
      node.position.add(node.velocity);
      
      if (Math.abs(node.position.x) > 15) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 15) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 15) node.velocity.z *= -1;
    });
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#c9a76f" transparent opacity={0.6} />
        </mesh>
      ))}
      
      {connections.map(([i, j], idx) => {
        const points = [nodes[i].position, nodes[j].position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: '#c9a76f', transparent: true, opacity: 0.2 });
        
        return (
          <primitive key={idx} object={new THREE.Line(geometry, material)} />
        );
      })}
    </group>
  );
}

// Main Scene Component
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 20;
  }, [camera]);
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#c9a76f" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4b786" />
      <spotLight position={[0, 15, 0]} angle={0.5} intensity={1} color="#f4e5c3" />
      
      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* All Effects */}
      <ParticleField />
      <RotatingGalaxy />
      <GlowingOrbs />
      <AnimatedWave color="#c9a76f" speed={0.5} yOffset={-5} amplitude={2} />
      <AnimatedWave color="#d4b786" speed={0.7} yOffset={-7} amplitude={1.5} />
      <AnimatedWave color="#f4e5c3" speed={0.3} yOffset={-9} amplitude={1} />
      <FlowingLines />
      <MorphingSphere />
      <NeuralNetwork />
      
      {/* Post Processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={[0.001, 0.001]}
          blendFunction={BlendFunction.NORMAL}
        />
        <Noise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
    </>
  );
}

// Main Animated Background Component
export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5, max: 1 }}
        frameloop="demand"
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 30, 80]} />
        <Scene />
      </Canvas>
      
      {/* Gradient Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
}
