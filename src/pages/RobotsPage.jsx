import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ModelsHumanoidSection from '../components/ModelsHumanoidSection'
import ModelsQuadrupedSection from '../components/ModelsQuadrupedSection'
import ModelsQuadrupedDeepDive from '../components/ModelsQuadrupedDeepDive'
import ModelsQuadruped3D from '../components/ModelsQuadruped3D'
import ModelsAICoreSection from '../components/ModelsAICoreSection'
// --- Variabile de Animație ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

// Sparkle Effect Component (Renderat doar la hover)
const Sparkles = ({ color }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            boxShadow: `0 0 10px ${color}`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            y: [0, -20]
          }}
          transition={{ 
            duration: Math.random() * 1.5 + 0.5, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
        />
      ))}
    </div>
  )
}

export default function RobotsPage() {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [isScrolling, setIsScrolling] = useState(false)
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Re-enable pointer events after scroll animation completes (~1s)
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }

  // Setăm culoarea overlay-ului global (dacă e nevoie)
  let overlayClasses = 'bg-black/40' // Mai puțin întunecat default
  if (hoveredCategory === 'umanoizi') overlayClasses = 'bg-transparent'
  if (hoveredCategory === 'patrupede') overlayClasses = 'bg-transparent'
  if (hoveredCategory === 'ai') overlayClasses = 'bg-transparent'

  return (
    <main className="text-white min-h-screen overflow-x-clip selection:bg-cyber-cyan/30 bg-[#0f1f3d]">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION (INTERACTIVE HUB) - Mai mic, dimensiune de banner */}
      {/* ========================================================= */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden flex pt-16 bg-grid-pattern radial-glow-top">
        
        {/* Conținutul Hero (Cele 3 coloane complet egale, lățime maximă) */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
          
          {/* Coloana 1: Umanoizi */}
          <div 
            onClick={() => scrollToSection('umanoizi')}
            onMouseEnter={() => setHoveredCategory('umanoizi')}
            onMouseLeave={() => setHoveredCategory(null)}
            className="group relative flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden"
          >
            {/* Background Image Specific */}
            <div className={`absolute inset-0 bg-[url('/images/hero_humanoid.png')] bg-cover bg-[center_top_10%] md:bg-[center_top_15%] transition-all duration-700 ease-in-out ${hoveredCategory === 'umanoizi' ? 'grayscale-0' : 'grayscale-[50%]'}`}></div>
            {/* Tint Overlay (are o mică tentă verde default, mai puternică la hover) */}
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredCategory === 'umanoizi' ? 'bg-green-500/40 mix-blend-color' : 'bg-green-500/10 mix-blend-color'}`}></div>
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredCategory === 'umanoizi' ? 'bg-black/20' : 'bg-black/60'}`}></div>

            {hoveredCategory === 'umanoizi' && <Sparkles color="#22c55e" />}
            <div className="text-center transform transition-transform duration-500 group-hover:-translate-y-2 z-10 p-6">
              <i className="fa-solid fa-person-walking text-4xl md:text-6xl mb-4 text-green-500/60 group-hover:text-green-400 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"></i>
              <h2 className="text-2xl md:text-4xl font-black tracking-widest uppercase mb-2 text-white group-hover:text-green-400 transition-colors duration-500">Umanoizi</h2>
              <p className="text-xs font-mono text-green-500/50 group-hover:text-green-400/80 transition-colors">G1 / H1</p>
            </div>
          </div>

          {/* Coloana 2: Patrupede */}
          <div 
            onClick={() => scrollToSection('patrupede')}
            onMouseEnter={() => setHoveredCategory('patrupede')}
            onMouseLeave={() => setHoveredCategory(null)}
            className="group relative flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden"
          >
            {/* Background Image Specific */}
            <div className={`absolute inset-0 bg-[url('/images/hero_core.png')] bg-cover bg-[center_top_30%] md:bg-center transition-all duration-700 ease-in-out ${hoveredCategory === 'patrupede' ? 'grayscale-0' : 'grayscale-[50%]'}`}></div>
            {/* Tint Overlay */}
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredCategory === 'patrupede' ? 'bg-orange-500/40 mix-blend-color' : 'bg-orange-500/10 mix-blend-color'}`}></div>
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredCategory === 'patrupede' ? 'bg-black/20' : 'bg-black/60'}`}></div>

            {hoveredCategory === 'patrupede' && <Sparkles color="#f97316" />}
            <div className="text-center transform transition-transform duration-500 group-hover:-translate-y-2 z-10 p-6">
              <i className="fa-solid fa-dog text-4xl md:text-6xl mb-4 text-orange-500/60 group-hover:text-orange-400 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"></i>
              <h2 className="text-2xl md:text-4xl font-black tracking-widest uppercase mb-2 text-white group-hover:text-orange-400 transition-colors duration-500">Patrupede</h2>
              <p className="text-xs font-mono text-orange-500/50 group-hover:text-orange-400/80 transition-colors">Seria Go2 / B2</p>
            </div>
          </div>

          {/* Coloana 3: AI & Software */}
          <div 
            onClick={() => scrollToSection('ai')}
            onMouseEnter={() => setHoveredCategory('ai')}
            onMouseLeave={() => setHoveredCategory(null)}
            className="group relative flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden"
          >
            {/* Background Image Specific */}
            <div className={`absolute inset-0 bg-[url('/images/hero_quadruped.png')] bg-cover bg-center transition-all duration-700 ease-in-out ${hoveredCategory === 'ai' ? 'grayscale-0' : 'grayscale-[50%]'}`}></div>
            {/* Tint Overlay */}
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredCategory === 'ai' ? 'bg-purple-600/40 mix-blend-color' : 'bg-purple-600/10 mix-blend-color'}`}></div>
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredCategory === 'ai' ? 'bg-black/20' : 'bg-black/60'}`}></div>

            {hoveredCategory === 'ai' && <Sparkles color="#a855f7" />}
            <div className="text-center transform transition-transform duration-500 group-hover:-translate-y-2 z-10 p-6">
              <i className="fa-solid fa-microchip text-4xl md:text-6xl mb-4 text-purple-500/60 group-hover:text-purple-400 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"></i>
              <h2 className="text-2xl md:text-4xl font-black tracking-widest uppercase mb-2 text-white group-hover:text-purple-400 transition-colors duration-500">A.I. Core</h2>
              <p className="text-xs font-mono text-purple-500/50 group-hover:text-purple-400/80 transition-colors">Creierul Digital</p>
            </div>
          </div>

        </div>
      </section>


      {/* 4 Butoane Suprapuse (Stil MintDent) - Acestea raman lipite de Hero */}
      <div className="relative z-30 w-full flex justify-center -mt-16 px-4">
        <div className="flex flex-row bg-[#0b1120]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] divide-x divide-white/5">
          
          {/* Card 1: LiDAR */}
          <div className="p-6 md:px-8 md:py-6 flex flex-col items-center justify-center text-center w-[160px] md:w-[240px] hover:bg-white/5 transition-colors cursor-pointer group">
            <i className="fa-solid fa-satellite-dish text-green-400 text-2xl mb-3 group-hover:scale-110 transition-transform"></i>
            <p className="text-[10px] md:text-xs text-slate-400 font-light leading-tight mb-3">Senzori LIVOX Mid-360<br/>Cartografiere spațială</p>
            <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-green-400 uppercase mt-auto">LiDAR 360°</h4>
          </div>

          {/* Card 2: Actuatoare */}
          <div className="p-6 md:px-8 md:py-6 flex flex-col items-center justify-center text-center w-[160px] md:w-[240px] hover:bg-white/5 transition-colors cursor-pointer group">
            <i className="fa-solid fa-bolt text-orange-400 text-2xl mb-3 group-hover:scale-110 transition-transform"></i>
            <p className="text-[10px] md:text-xs text-slate-400 font-light leading-tight mb-3">Articulații bionice<br/>Recuperare echilibru</p>
            <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-orange-400 uppercase mt-auto">Actuatoare High-Torque</h4>
          </div>

          {/* Card 3: AI Control */}
          <div className="hidden md:flex p-6 md:px-8 md:py-6 flex-col items-center justify-center text-center w-[160px] md:w-[240px] hover:bg-white/5 transition-colors cursor-pointer group">
            <i className="fa-solid fa-brain text-purple-400 text-2xl mb-3 group-hover:scale-110 transition-transform"></i>
            <p className="text-[10px] md:text-xs text-slate-400 font-light leading-tight mb-3">Reinforcement Learning<br/>Navigație autonomă</p>
            <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-purple-400 uppercase mt-auto">Control AI Avansat</h4>
          </div>

          {/* Card 4: Battery */}
          <div className="hidden lg:flex p-6 md:px-8 md:py-6 flex-col items-center justify-center text-center w-[160px] md:w-[240px] hover:bg-white/5 transition-colors cursor-pointer group">
            <i className="fa-solid fa-battery-full text-cyan-400 text-2xl mb-3 group-hover:scale-110 transition-transform"></i>
            <p className="text-[10px] md:text-xs text-slate-400 font-light leading-tight mb-3">Sistem modular plug-in<br/>Operare non-stop</p>
            <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase mt-auto">Baterii Interschimbabile</h4>
          </div>

        </div>
      </div>

      {/* CONTINUT CENTRAL PE FUNDAL INCHIS (Stil Boxed) */}
      <div className={`transition-all duration-300 ${isScrolling ? 'pointer-events-none' : ''}`}>
        <div id="umanoizi" className="scroll-mt-24 max-w-7xl mx-auto bg-black/40 backdrop-blur-md rounded-[40px] border border-white/5 relative z-20 pt-8 pb-10 mt-16 mb-8 shadow-[0_0_50px_rgba(0,0,0,0.3)]">

      {/* ========================================================= */}
      {/* 2. SECȚIUNEA UMANOIZI */}
      {/* ========================================================= */}
      <ModelsHumanoidSection />

      </div> {/* End Continut Central */}

      {/* CONTINUT CENTRAL PATRUPEDE */}
      <div id="patrupede" className="scroll-mt-24 max-w-7xl mx-auto bg-black/40 backdrop-blur-md rounded-[40px] border border-white/5 relative z-20 pt-8 pb-32 mb-10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <ModelsQuadrupedSection />

          {/* DEEP DIVE PATRUPEDE (STICKY SCROLL) */}
          <ModelsQuadrupedDeepDive />

          {/* SHOWCASE 3D INTERACTIV */}
          <ModelsQuadruped3D />
      </div>

      {/* CONTINUT CENTRAL AI CORE (Placeholder for upcoming components) */}
      <div id="ai" className="scroll-mt-24 max-w-7xl mx-auto bg-black/40 backdrop-blur-md rounded-[40px] border border-white/5 relative z-20 pt-8 pb-32 mb-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] min-h-[50vh]">
          <ModelsAICoreSection />
      </div>

      </div> {/* End Pointer Events Wrapper */}

    </main>
  )
}
