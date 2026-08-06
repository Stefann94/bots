import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ObserverRobot() {
  const groupRef = useRef()
  const headRef = useRef()
  const neckRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const chestRef = useRef()
  
  const target = new THREE.Vector3()
  const { viewport } = useThree()

  const isMobile = viewport.width < 5
  
  // Calculăm un scale dinamic: mic pe laptopuri (0.45), puțin mai mare pe ecrane ultrawide (max 0.75)
  const scale = isMobile ? 0 : Math.min(0.75, Math.max(0.45, viewport.width * 0.06))
  
  // Îl poziționăm dinamic, păstrând o margine ("padding") proporțională cu mărimea lui
  const posX = (viewport.width / 2) - (scale * 1.8)
  const posY = -(viewport.height / 2) + (scale * 1.6)

  // Folosim un listener nativ pe window pentru a garanta tracking-ul,
  // indiferent de pointerEvents="none" pe Canvas.
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (e) => {
      // Normalizăm coordonatele la -1 -> 1
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame((state) => {
    if (isMobile) return

    const t = state.clock.elapsedTime

    // 1. Efectul de respirație (Mișcare Sus-Jos a întregului corp)
    const breathOffset = Math.sin(t * 2.5) * 0.08
    if (groupRef.current) {
      groupRef.current.position.y = posY + breathOffset
    }

    // 2. Extinderea pieptului (Respirație)
    if (chestRef.current) {
      chestRef.current.scale.z = 1 + Math.sin(t * 2.5) * 0.05
      chestRef.current.scale.x = 1 + Math.sin(t * 2.5) * 0.02
    }

    // 3. Mișcarea brațelor (Sincronizată cu respirația)
    if (leftArmRef.current && rightArmRef.current) {
      // Rotire ușoară din umeri
      leftArmRef.current.rotation.z = Math.sin(t * 2.5) * 0.05 + 0.1
      leftArmRef.current.rotation.x = Math.sin(t * 1.25) * 0.1
      
      rightArmRef.current.rotation.z = -Math.sin(t * 2.5) * 0.05 - 0.1
      rightArmRef.current.rotation.x = Math.sin(t * 1.25) * 0.1
    }

    // 4. Tracking Cursor pentru Cap (Sistem geometric precis - Intersecție Raycast)
    // Calculăm vectorul de direcție de la cameră prin poziția mouse-ului
    const mousePos = new THREE.Vector3(pointer.current.x, pointer.current.y, 0.5)
    mousePos.unproject(state.camera)
    const dir = mousePos.sub(state.camera.position).normalize()

    // Găsim intersecția razei cu un plan virtual foarte apropiat de el (Z = 1.0)
    // Aducând planul mai aproape, unghiurile devin mult mai abrupte/sensibile
    const targetZ = 1.0
    const distance = (targetZ - state.camera.position.z) / dir.z
    target.copy(state.camera.position).add(dir.multiplyScalar(distance))

    // Amplificăm mișcarea stânga/dreapta pentru o "sensibilitate" ridicată
    // Deoarece în dreapta ecranul se termină repede, exagerăm intenția utilizatorului!
    if (target.x > posX) {
      target.x = posX + (target.x - posX) * 3.5 // Hiper-sensibil în dreapta
    } else {
      target.x = posX + (target.x - posX) * 1.5 // Foarte sensibil în stânga
    }

    if (headRef.current) {
      const currentQuat = headRef.current.quaternion.clone()
      headRef.current.lookAt(target)
      const targetQuat = headRef.current.quaternion.clone()
      headRef.current.quaternion.copy(currentQuat)
      headRef.current.quaternion.slerp(targetQuat, 0.4) // Reflexe fulgerătoare
    }

    if (neckRef.current) {
      const currentQuat = neckRef.current.quaternion.clone()
      neckRef.current.lookAt(target)
      const targetQuat = neckRef.current.quaternion.clone()
      neckRef.current.quaternion.copy(currentQuat)
      neckRef.current.quaternion.slerp(targetQuat, 0.2) // Reflexe fulgerătoare
    }
  })

  // Materiale
  const glossyWhite = {
    color: '#ffffff',
    metalness: 0.8,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  }

  const darkJoint = {
    color: '#111111',
    metalness: 0.9,
    roughness: 0.4
  }

  const cyanGlow = {
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 3,
    toneMapped: false
  }

  return (
    <group ref={groupRef} position={[posX, posY, 0]} scale={[scale, scale, scale]}>
      
      {/* --- TRUNCHI --- */}
      <group position={[0, -1.2, 0]}>
        {/* Baza abdomenului */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.6, 0.5, 0.8, 32]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
        
        {/* Piept (Respiră) */}
        <mesh ref={chestRef} position={[0, 0.4, 0.1]}>
          <boxGeometry args={[1.5, 1.2, 0.9]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
        
        {/* Detaliu Inima/Core (Glow Cyan sub piept) */}
        <mesh position={[0, 0.2, 0.56]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial {...cyanGlow} />
        </mesh>
      </group>

      {/* --- BRAȚE --- */}
      {/* Brațul Stâng */}
      <group ref={leftArmRef} position={[-0.9, -0.6, 0]}>
        {/* Umăr (Articulație) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
        {/* Carcasa Umărului (Armor) */}
        <mesh position={[-0.1, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.6]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
        {/* Braț superior */}
        <mesh position={[-0.1, -0.6, 0]}>
          <capsuleGeometry args={[0.18, 0.7, 16, 16]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
        {/* Antebraț (Ușor flexat în față) */}
        <mesh position={[-0.1, -1.4, 0.2]} rotation={[-0.2, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.8, 16, 16]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
      </group>

      {/* Brațul Drept */}
      <group ref={rightArmRef} position={[0.9, -0.6, 0]}>
        {/* Umăr (Articulație) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
        {/* Carcasa Umărului (Armor) */}
        <mesh position={[0.1, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.6]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
        {/* Braț superior */}
        <mesh position={[0.1, -0.6, 0]}>
          <capsuleGeometry args={[0.18, 0.7, 16, 16]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
        {/* Antebraț (Ușor flexat în față) */}
        <mesh position={[0.1, -1.4, 0.2]} rotation={[-0.2, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.8, 16, 16]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
      </group>

      {/* --- GÂT & CAP --- */}
      <group position={[0, 0, 0]} ref={neckRef}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.5, 16]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
      </group>

      <group position={[0, 0.4, 0]} ref={headRef}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[0.8, 0.9, 1.0]} />
          <meshStandardMaterial {...glossyWhite} />
        </mesh>
        
        <mesh position={[0, 0, 0.41]}>
          <planeGeometry args={[0.65, 0.55]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
        </mesh>

        <mesh position={[-0.2, 0.1, 0.42]}>
          <capsuleGeometry args={[0.03, 0.12, 8, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial {...cyanGlow} />
        </mesh>
        <mesh position={[0.2, 0.1, 0.42]}>
          <capsuleGeometry args={[0.03, 0.12, 8, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial {...cyanGlow} />
        </mesh>

        <mesh position={[-0.43, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
        <mesh position={[0.43, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
      </group>
    </group>
  )
}
