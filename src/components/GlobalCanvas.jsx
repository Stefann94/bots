import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useLocation } from 'react-router-dom'
import ParticleSystem from './ParticleSystem'
import ObserverRobot from './ObserverRobot'

export default function GlobalCanvas() {
  const location = useLocation()
  const isModelsPage = location.pathname === '/modele-3d'

  // Dacă suntem pe pagina de modele, nu afișăm stelele globale și robotul,
  // pentru că acolo avem propriul fundal și propriul design.
  if (isModelsPage) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <Canvas 
        style={{ pointerEvents: 'none' }}
        eventSource={document.body}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
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
