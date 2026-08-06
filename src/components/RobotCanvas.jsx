import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function RobotModel({ wireframe }) {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  const bodyMaterial = { color: '#111e3f', metalness: 0.8, roughness: 0.2, wireframe }
  const cyanGlowMaterial = { color: '#00f0ff', wireframe: false }
  const jointMaterial = { color: '#334155', metalness: 0.9, roughness: 0.1, wireframe }

  return (
    <group ref={groupRef}>
      {/* Torso */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial {...bodyMaterial} />
      </mesh>
      
      {/* Chest Reactor */}
      <mesh position={[0, 1.0, 0.16]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial {...cyanGlowMaterial} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.3, 0.25, 0.3]} />
        <meshStandardMaterial {...bodyMaterial} />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 1.42, 0.16]}>
        <planeGeometry args={[0.2, 0.08]} />
        <meshBasicMaterial {...cyanGlowMaterial} />
      </mesh>

      {/* Shoulders & Arms */}
      <mesh position={[-0.35, 1.15, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...jointMaterial} />
      </mesh>
      <mesh position={[0.35, 1.15, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...jointMaterial} />
      </mesh>

      <mesh position={[-0.35, 0.8, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial {...bodyMaterial} />
      </mesh>
      <mesh position={[0.35, 0.8, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial {...bodyMaterial} />
      </mesh>

      {/* Hips & Legs */}
      <mesh position={[-0.15, 0.45, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...jointMaterial} />
      </mesh>
      <mesh position={[0.15, 0.45, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...jointMaterial} />
      </mesh>

      <mesh position={[-0.15, 0.15, 0]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial {...bodyMaterial} />
      </mesh>
      <mesh position={[0.15, 0.15, 0]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial {...bodyMaterial} />
      </mesh>
    </group>
  )
}

export default function RobotCanvas({ wireframe }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 3.8], fov: 45 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={2} color="#0b1329" />
      <pointLight position={[2, 3, 2]} intensity={3} color="#00f0ff" distance={10} />
      <pointLight position={[-2, 1, -2]} intensity={2} color="#38bdf8" distance={10} />
      
      <RobotModel wireframe={wireframe} />
      
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minDistance={2}
        maxDistance={6}
        target={[0, 0.5, 0]}
      />
    </Canvas>
  )
}
