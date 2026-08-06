import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Grid, Html } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/robot.glb')

function RealRobotModel({ robotColor }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/robot.glb')

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
    }
  })

  // Aliniem tălpile DEASUPRA grid-ului înainte de primul frame
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
      
      // Tălpile (box.min.y) ridicate fix la Y=0
      scene.position.y = -box.min.y
    }
  }, [scene])

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Schimbăm culoarea modelului
          if (child.material.color) {
            child.material.color.set(robotColor)
          }
          
          child.material.wireframe = false
          child.material.metalness = 0.9
          child.material.roughness = 0.1
          child.material.envMapIntensity = 2.0
          child.material.needsUpdate = true
        }
      })
    }
  }, [scene, robotColor])

  return (
    // Robotul stă cu tălpile la Y=0.15 (ușor deasupra grid-ului care e la Y=0)
    <group ref={groupRef} position={[0, 0.15, 0]}>
      <primitive object={scene} scale={2.2} />
    </group>
  )
}

export default function RobotCanvas({ robotColor }) {
  return (
    <Canvas
      camera={{ 
        position: [0, 2.2, 7],
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
        <ambientLight intensity={1.2} color="#ffffff" />
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

        <RealRobotModel robotColor={robotColor} />
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={3}
          maxDistance={12}
          target={[0, 1.8, 0]}
        />
      </Suspense>
    </Canvas>
  )
}
