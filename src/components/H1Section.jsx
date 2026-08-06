import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function H1Section() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 overflow-hidden flex items-center justify-center bg-black/60 border-b border-red-900/20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-navy-950/20 to-black"></div>
      
      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
        <h1 className="text-[25vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>H1</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center">
        
        <motion.div style={{ opacity }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs mb-4 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <i className="fa-solid fa-fire text-red-500"></i>
            <span>FORȚĂ BRUTĂ & VITEZĂ</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase">
            Unitree <span className="text-red-500 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">H1</span>
          </h2>
        </motion.div>

        <motion.div style={{ scale }} className="relative mx-auto w-full max-w-4xl aspect-[4/3] md:aspect-[21/9] flex items-center justify-center mb-16">
            
            {/* Central focal point */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-red-600/15 rounded-full filter blur-[70px] animate-pulse"></div>
            </div>

            <div className="relative z-10 glass-card p-12 rounded-3xl border border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.15)] group flex items-center justify-center hover:border-red-500/60 transition-all duration-500 bg-navy-950/60 backdrop-blur-xl">
              <i className="fa-solid fa-microchip text-8xl md:text-9xl text-slate-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] group-hover:text-red-400 transition-colors duration-500"></i>
            </div>
            
            {/* Orbiting Stats */}
            <div className="absolute left-0 md:-left-8 top-1/4 glass-card px-5 py-3 rounded-xl border border-red-500/20 animate-[bounce_4s_infinite] bg-navy-950/80 backdrop-blur-md">
               <div className="text-red-400 font-mono text-[10px] tracking-widest mb-1">VITEZĂ RECORD</div>
               <div className="text-2xl font-bold text-white">3.3 <span className="text-sm text-slate-400">m/s</span></div>
            </div>
            
            <div className="absolute right-0 md:-right-8 bottom-1/4 glass-card px-5 py-3 rounded-xl border border-red-500/20 animate-[bounce_4s_infinite_0.5s] bg-navy-950/80 backdrop-blur-md">
               <div className="text-red-400 font-mono text-[10px] tracking-widest mb-1">CUPLU MAXIM</div>
               <div className="text-2xl font-bold text-white">360 <span className="text-sm text-slate-400">Nm</span></div>
            </div>
        </motion.div>

        <motion.div style={{ opacity }} className="max-w-2xl mx-auto space-y-10">
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            H1 este primul robot biped de uz general din lume care oferă performanțe dinamice la superlativ. Construit pentru a domina orice teren cu putere absolută, flexibilitate de top și o viteză care sparge recorduri.
          </p>
          
          <button className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] focus:outline-none group overflow-hidden border border-red-400/50">
              <span className="relative z-10 flex items-center gap-2">
                Descoperă Forța H1 <i className="fa-solid fa-bolt group-hover:text-yellow-400 transition-colors"></i>
              </span>
          </button>
        </motion.div>

      </div>
    </section>
  )
}
