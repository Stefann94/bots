import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ParticleSystem from './ParticleSystem'
import ObserverRobot from './ObserverRobot'

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-navy-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Iluminare de bază */}
        <ambientLight intensity={0.4} />
        
        {/* Lumină direcțională puternică pentru a evidenția robotul */}
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
        
        {/* O lumină ambientală cyan din stânga jos */}
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#00f0ff" />

        <Suspense fallback={null}>
          {/* Environment-ul HDRI oferă reflexiile ultra-realiste pentru materialele lucioase (metalness) */}
          <Environment preset="city" />
          
          {/* Particulele pe tot fundalul */}
          <ParticleSystem />
          
          {/* Robotul fixat în dreapta jos */}
          <ObserverRobot />
        </Suspense>
      </Canvas>
    </div>
  )
}
