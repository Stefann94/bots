import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Grid, Html } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/quadruped.glb')

function RealQuadrupedModel({ robotColor }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/quadruped.glb')

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
    }
  })

  // Aliniem modelul deasupra grid-ului
  useMemo(() => {
    if (scene) {
      scene.position.set(0, 0, 0)
      scene.updateMatrixWorld(true)
      
      const box = new THREE.Box3().setFromObject(scene)
      
      // Centrăm pe X/Z
      const center = new THREE.Vector3()
      box.getCenter(center)
      scene.position.x = -center.x
      scene.position.z = -center.z
      
      // Tălpile ridicate la Y=0
      scene.position.y = -box.min.y
    }
  }, [scene])

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Schimbăm culoarea modelului doar dacă e material de bază
          // (Notă: la unele modele complexe s-ar putea să colorăm prea multe părți, dar păstrăm funcționalitatea ca în Hero)
          if (child.material.name !== "Glass" && child.material.name !== "Lights" && child.material.color) {
             child.material.color.set(robotColor)
          }
          
          child.material.wireframe = false
          child.material.metalness = 0.8
          child.material.roughness = 0.2
          child.material.envMapIntensity = 1.5
          child.material.needsUpdate = true
        }
      })
    }
  }, [scene, robotColor])

  return (
    <group ref={groupRef} position={[0, 0.15, 0]}>
      {/* Modelul s-ar putea să necesite un scale diferit față de umanoid */}
      <primitive object={scene} scale={2} />
    </group>
  )
}

export default function QuadrupedCanvas({ robotColor }) {
  return (
    <Canvas
      camera={{ 
        position: [0, 2, 6],
        fov: 35,
        near: 0.1,
        far: 100
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={
        <Html center>
          <div className="text-cyber-cyan text-sm tracking-widest animate-pulse">ÎNCĂRCARE MODEL 3D...</div>
        </Html>
      }>
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3, 2, -3]} intensity={2} color="#00f0ff" distance={15} />
        
        <Environment preset="city" />
        
        {/* Grid-ul subtil original – renderOrder negativ forțează randarea înainte de robot */}
        <Grid 
          renderOrder={-1}
          position={[0, 0, 0]} 
          args={[20, 20]} 
          cellSize={0.25} 
          cellThickness={0.5} 
          cellColor="#00f0ff" 
          sectionSize={1.25} 
          sectionThickness={1} 
          sectionColor="#1a2b56" 
          fadeDistance={8}
          fadeStrength={1.5}
          material-depthWrite={true}
        />

        <RealQuadrupedModel robotColor={robotColor} />
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={2}
          maxDistance={12}
          target={[0, 0.5, 0]}
        />
      </Suspense>
    </Canvas>
  )
}
