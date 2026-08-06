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

  // Asigurăm o "cutie" extrem de înaltă pe axa Y (40 unități) pentru ca
  // particulele să nu se termine niciodată, oricât de adânc ai da scroll (600vh+).
  const particleSpread = [Math.max(viewport.width * 1.5, 30), 40, 15]

  useFrame((state, delta) => {
    // Netezim scroll-ul cu o funcție de Lerp
    currentScroll.current = THREE.MathUtils.lerp(
      currentScroll.current, 
      window.scrollY, 
      delta * 4 // Viteza de răspuns a parallax-ului
    )

    // Efect de Parallax pur pe axa Y. Când dai scroll în jos (pagină),
    // particulele urcă (pozitiv pe Y). Straturile din față urcă mai repede.
    if (farRef.current) {
      farRef.current.position.y = currentScroll.current * 0.0008
    }
    
    if (midRef.current) {
      midRef.current.position.y = currentScroll.current * 0.002
    }

    if (closeRef.current) {
      closeRef.current.position.y = currentScroll.current * 0.004
    }
  })

  return (
    <>
      {/* Strat îndepărtat (dens și opacitate mică) */}
      <group ref={farRef} position={[0, 0, -10]}>
        <Sparkles 
          count={800} 
          scale={particleSpread} 
          size={4.5} 
          speed={0.1} 
          opacity={0.25} 
          color="#00f0ff" 
        />
      </group>

      {/* Strat intermediar */}
      <group ref={midRef} position={[0, 0, -5]}>
        <Sparkles 
          count={300} 
          scale={particleSpread} 
          size={7.5} 
          speed={0.15} 
          opacity={0.45} 
          color="#7dd3fc" 
        />
      </group>

      {/* Strat apropiat (particule mari, mișcare rapidă la scroll) */}
      <group ref={closeRef} position={[0, 0, 1]}>
        <Sparkles 
          count={100} 
          scale={particleSpread} 
          size={12} 
          speed={0.2} 
          opacity={0.65} 
          color="#ffffff" 
        />
      </group>
    </>
  )
}
