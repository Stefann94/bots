import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function ParticleSystem() {
  const farRef = useRef()
  const midRef = useRef()
  const closeRef = useRef()
  const { viewport } = useThree()

  // Referință internă pentru a obține o animație fluidă
  const currentScroll = useRef(0)

  // Asigurăm acoperirea totală a ecranului pe orice monitor (inclusiv UltraWide)
  // Lățime = lățimea viewport-ului 3D * 1.5, Înălțime = viewport * 1.5, Adâncime = 15
  const particleSpread = [Math.max(viewport.width * 1.5, 30), Math.max(viewport.height * 1.5, 20), 15]

  useFrame((state, delta) => {
    // Netezim scroll-ul cu o funcție de Lerp
    currentScroll.current = THREE.MathUtils.lerp(
      currentScroll.current, 
      window.scrollY, 
      delta * 3
    )

    // În loc să le mișcăm sus-jos (efect de ploaie), le mutăm pe axa Z.
    // Când dai scroll, te deplasezi "prin" ele (efect de adâncime / travel).
    if (farRef.current) {
      farRef.current.position.z = -10 + currentScroll.current * 0.003
    }
    
    if (midRef.current) {
      midRef.current.position.z = -5 + currentScroll.current * 0.008
    }

    if (closeRef.current) {
      // Stratul din față va depăși camera când dai scroll, dând un efect 3D masiv
      closeRef.current.position.z = 1 + currentScroll.current * 0.015
    }
  })

  return (
    <>
      {/* Strat îndepărtat (dens și opacitate mică) */}
      <group ref={farRef} position={[0, 0, -10]}>
        <Sparkles 
          count={200} 
          scale={particleSpread} 
          size={3} 
          speed={0.1} 
          opacity={0.15} 
          color="#00f0ff" 
        />
      </group>

      {/* Strat intermediar */}
      <group ref={midRef} position={[0, 0, -5]}>
        <Sparkles 
          count={100} 
          scale={particleSpread} 
          size={5} 
          speed={0.15} 
          opacity={0.3} 
          color="#7dd3fc" 
        />
      </group>

      {/* Strat apropiat */}
      <group ref={closeRef} position={[0, 0, 1]}>
        <Sparkles 
          count={40} 
          scale={particleSpread} 
          size={8} 
          speed={0.2} 
          opacity={0.5} 
          color="#ffffff" 
        />
      </group>
    </>
  )
}
