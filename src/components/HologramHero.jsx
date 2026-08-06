import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HologramHero() {
  // state to track which hologram is hovered
  const [activeHolo, setActiveHolo] = useState(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // background color mapping based on active hologram
  const getBgColor = () => {
    switch(activeHolo) {
      case 'biped': return 'from-cyber-cyan/60 via-cyber-cyan/20 to-black/90'
      case 'quadruped': return 'from-emerald-500/60 via-emerald-500/20 to-black/90'
      case 'ai': return 'from-purple-500/60 via-purple-500/20 to-black/90'
      default: return 'from-navy-950/40 via-black/50 to-black'
    }
  }

  return (
    <section className="relative w-full pt-32 pb-12 overflow-hidden bg-black">
      
      {/* Ambient reactive background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getBgColor()} transition-colors duration-1000 ease-in-out`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase mb-4">
                  Alege <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-white">Viitorul</span>
              </h1>
              <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto font-mono px-4">Selectează un avatar holografic pentru a iniția scanarea sistemului.</p>
          </motion.div>

          {/* The 3 Holographic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              {/* Biped Pillar */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onMouseEnter={() => setActiveHolo('biped')}
                onMouseLeave={() => setActiveHolo(null)}
                onClick={() => scrollTo('bipeds')}
                className="relative h-[16rem] md:h-[20rem] group cursor-pointer flex flex-col items-center justify-end"
              >
                  {/* The Hologram Box */}
                  <div className={`absolute bottom-20 w-full aspect-square flex flex-col items-center justify-center transition-all duration-700 ease-out ${activeHolo === 'biped' ? 'scale-125 -translate-y-6 md:-translate-y-8' : 'scale-100 opacity-50 blur-[1px]'}`}>
                      <i className="fa-solid fa-person text-[5rem] md:text-[7rem] text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] relative z-10 group-hover:animate-pulse"></i>
                      
                      {/* Holographic light beam from pedestal */}
                      <div className={`absolute bottom-0 w-24 md:w-32 h-48 md:h-64 bg-gradient-to-t from-cyber-cyan/40 to-transparent blur-md transition-opacity duration-500 ${activeHolo === 'biped' ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  
                  {/* The Pedestal Base */}
                  <div className="w-40 md:w-56 h-10 md:h-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-cyan/30 via-cyber-cyan/5 to-transparent rounded-full flex items-center justify-center border border-cyber-cyan/20 group-hover:border-cyber-cyan/60 transition-colors shadow-[0_20px_50px_rgba(0,240,255,0.2)]">
                      <div className="w-20 md:w-32 h-2 md:h-3 bg-cyber-cyan/20 rounded-full blur-[2px] group-hover:bg-cyber-cyan/60 shadow-[0_0_15px_rgba(0,240,255,1)]"></div>
                  </div>
                  <div className="mt-6 text-center h-12">
                      <h3 className="text-white text-base md:text-lg font-bold font-mono tracking-widest uppercase transition-colors group-hover:text-cyber-cyan">Umanoizi</h3>
                      <div className="text-[9px] md:text-[10px] text-slate-500 mt-1 md:mt-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">Agent Biped</div>
                  </div>
              </motion.div>

              {/* Quadruped Pillar */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onMouseEnter={() => setActiveHolo('quadruped')}
                onMouseLeave={() => setActiveHolo(null)}
                onClick={() => scrollTo('quadrupeds')}
                className="relative h-[16rem] md:h-[20rem] group cursor-pointer flex flex-col items-center justify-end"
              >
                  {/* The Hologram Box */}
                  <div className={`absolute bottom-20 w-full aspect-square flex flex-col items-center justify-center transition-all duration-700 ease-out ${activeHolo === 'quadruped' ? 'scale-125 -translate-y-6 md:-translate-y-8' : 'scale-100 opacity-50 blur-[1px]'}`}>
                      <i className="fa-solid fa-dog text-[5rem] md:text-[7rem] text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] relative z-10"></i>
                      
                      {/* Holographic light beam from pedestal */}
                      <div className={`absolute bottom-0 w-24 md:w-32 h-48 md:h-64 bg-gradient-to-t from-emerald-500/40 to-transparent blur-md transition-opacity duration-500 ${activeHolo === 'quadruped' ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  
                  {/* The Pedestal Base */}
                  <div className="w-40 md:w-56 h-10 md:h-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/30 via-emerald-500/5 to-transparent rounded-full flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/60 transition-colors shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                      <div className="w-20 md:w-32 h-2 md:h-3 bg-emerald-500/20 rounded-full blur-[2px] group-hover:bg-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
                  </div>
                  <div className="mt-6 text-center h-12">
                      <h3 className="text-white text-base md:text-lg font-bold font-mono tracking-widest uppercase transition-colors group-hover:text-emerald-400">Quadrupezi</h3>
                      <div className="text-[9px] md:text-[10px] text-slate-500 mt-1 md:mt-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">Unități Tactice</div>
                  </div>
              </motion.div>

              {/* AI Pillar */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onMouseEnter={() => setActiveHolo('ai')}
                onMouseLeave={() => setActiveHolo(null)}
                onClick={() => scrollTo('ai')}
                className="relative h-[16rem] md:h-[20rem] group cursor-pointer flex flex-col items-center justify-end"
              >
                  {/* The Hologram Box */}
                  <div className={`absolute bottom-20 w-full aspect-square flex flex-col items-center justify-center transition-all duration-700 ease-out ${activeHolo === 'ai' ? 'scale-125 -translate-y-6 md:-translate-y-8' : 'scale-100 opacity-50 blur-[1px]'}`}>
                      <i className="fa-solid fa-brain text-[5rem] md:text-[7rem] text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] relative z-10 group-hover:animate-[pulse_1s_ease-in-out_infinite]"></i>
                      
                      {/* Holographic light beam from pedestal */}
                      <div className={`absolute bottom-0 w-24 md:w-32 h-48 md:h-64 bg-gradient-to-t from-purple-500/40 to-transparent blur-md transition-opacity duration-500 ${activeHolo === 'ai' ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  
                  {/* The Pedestal Base */}
                  <div className="w-40 md:w-56 h-10 md:h-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-purple-500/5 to-transparent rounded-full flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/60 transition-colors shadow-[0_20px_50px_rgba(168,85,247,0.2)]">
                      <div className="w-20 md:w-32 h-2 md:h-3 bg-purple-500/20 rounded-full blur-[2px] group-hover:bg-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,1)]"></div>
                  </div>
                  <div className="mt-6 text-center h-12">
                      <h3 className="text-white text-base md:text-lg font-bold font-mono tracking-widest uppercase transition-colors group-hover:text-purple-400">Inteligență</h3>
                      <div className="text-[9px] md:text-[10px] text-slate-500 mt-1 md:mt-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">Embodied AI</div>
                  </div>
              </motion.div>

          </div>
      </div>
    </section>
  )
}
