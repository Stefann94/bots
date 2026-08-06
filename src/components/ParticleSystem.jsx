import { Sparkles, Float } from '@react-three/drei'

export default function ParticleSystem() {
  return (
    <>
      {/* Strat îndepărtat (dens și opacitate mică) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sparkles 
          count={150} 
          scale={20} 
          size={3} 
          speed={0.3} 
          opacity={0.15} 
          color="#00f0ff" 
          position={[0, 0, -4]}
        />
      </Float>

      {/* Strat intermediar */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Sparkles 
          count={80} 
          scale={15} 
          size={5} 
          speed={0.4} 
          opacity={0.3} 
          color="#7dd3fc" 
          position={[0, 0, 0]}
        />
      </Float>

      {/* Strat apropiat (particule mai puține dar mai mari, efect bokeh profund) */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <Sparkles 
          count={40} 
          scale={10} 
          size={8} 
          speed={0.6} 
          opacity={0.6} 
          color="#ffffff" 
          position={[0, 0, 3.5]}
        />
      </Float>
    </>
  )
}
