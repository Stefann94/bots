import Hero from '../components/Hero'
import RobotSeries from '../components/RobotSeries'
import AgiBotSeries from '../components/AgiBotSeries'
import Features from '../components/Features'
import Applications from '../components/Applications'
import Specs from '../components/Specs'
import ContactRadar from '../components/ContactRadar'
import Contact from '../components/Contact'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Home() {
  const containerRef = useRef(null)
  
  // Urmărim progresul de scroll pentru containerul de sub Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Efect subtil de parallax pentru fundal. Mutăm pe un range mai mic și folosim un div mai mare
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  
  // Scoatem fade-ul complet de la final ca să nu mai dispară grid-ul jos
  const opacityGrid = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0.4, 0.4])

  return (
    <main className="relative">
      {/* Hero secțiunea trece la z-[5] astfel încât robotul (z-10) să fie PESTE Hero și PESTE grid-ul acestuia */}
      <div className="bg-grid-pattern relative z-[5]">
        <Hero />
      </div>
      
      {/* Container pentru restul paginii, fără z-index fixat pentru a lăsa straturile să se suprapună global */}
      <div className="relative">
        
        {/* Fundal Serios și Semi-Interactiv la Scroll (z-[5], sub robotul cu z-10) */}
        <div ref={containerRef} className="absolute inset-0 z-[5] bg-navy-950/95 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-slate-800/60 backdrop-blur-xl pointer-events-none">
          <motion.div 
            className="absolute -inset-[20%]"
            style={{ y: backgroundY }}
          >
            {/* Grid elegant, foarte subtil */}
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
                opacity: opacityGrid
              }}
            />
            
            {/* Lumini ambientale (Orbs) difuze pentru profunzime */}
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-[40%] right-[10%] w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[150px] mix-blend-screen" />
            <div className="absolute bottom-[20%] left-[25%] w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[130px] mix-blend-screen" />
            
            {/* Linii verticale tech (gen circuite/arhitectură de sistem) */}
            <div className="absolute left-[20%] -top-[10%] -bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent" />
            <div className="absolute right-[20%] -top-[10%] -bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
          </motion.div>
          
          {/* Overlay de noise pentru un aspect premium (fin) */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        {/* Conținutul paginii - Fiecare componentă își va gestiona propriul z-index intern */}
        <div className="relative">
          <RobotSeries />
          <AgiBotSeries />
          <Features />
          <Applications />
          <Specs />
          {/* Rețea operațională (radar + ceas live), chiar înainte de formular */}
          <section className="relative py-24">
            <ContactRadar />
          </section>
          <Contact />
        </div>
      </div>
    </main>
  )
}

