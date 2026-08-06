import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function G1Section() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 overflow-hidden flex items-center bg-black/40 border-y border-cyber-cyan/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-cyan/5 via-navy-950/0 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div style={{ opacity }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Visuals */}
          <motion.div style={{ y: y1 }} className="relative aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
            {/* Spinning Holographic Rings */}
            <div className="absolute inset-4 rounded-full border border-cyber-cyan/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-10 rounded-full border border-dashed border-cyber-cyan/30 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="relative w-2/3 h-2/3 glass-card rounded-2xl border border-cyber-cyan/40 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 to-transparent group-hover:from-cyber-cyan/10 transition-colors duration-500"></div>
              <i className="fa-solid fa-robot text-7xl md:text-9xl text-cyber-cyan drop-shadow-[0_0_25px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-transform duration-700"></i>
              <div className="absolute bottom-6 left-6 right-6 h-1 bg-cyber-cyan/20 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-cyan w-1/3 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
            
            {/* Holographic floating elements */}
            <div className="absolute top-10 right-10 glass-card px-4 py-2 rounded-lg text-cyber-cyan font-mono text-xs shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span className="animate-pulse">SYS_OK // 100%</span>
            </div>
            <div className="absolute bottom-10 left-10 glass-card px-4 py-2 rounded-lg text-cyber-cyan font-mono text-xs shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span>DEX360_ACTIVE</span>
            </div>
          </motion.div>

          {/* Right: Specs & Description */}
          <motion.div style={{ y: y2 }} className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan font-mono text-xs mb-4 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
                <span>AGENT UMANOID BIONIC</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Unitree <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-400">G1</span></h2>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl">
                Noul standard al flexibilității și inteligenței integrate. Proiectat cu articulații avansate, mâna bionică Dex360 și o agilitate excepțională, G1 reprezintă avatarul tău perfect pentru cercetare în Embodied AI și manipulare precisă.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5 border border-cyber-cyan/20 rounded-xl hover:border-cyber-cyan/50 transition-colors">
                <div className="text-cyber-cyan font-mono text-xs tracking-wider mb-1">ARTICULAȚII</div>
                <div className="text-3xl font-bold text-white">23-43</div>
                <div className="text-xs text-slate-500 mt-1 uppercase">Grade de libertate</div>
              </div>
              <div className="glass-card p-5 border border-cyber-cyan/20 rounded-xl hover:border-cyber-cyan/50 transition-colors">
                <div className="text-cyber-cyan font-mono text-xs tracking-wider mb-1">VITEZĂ</div>
                <div className="text-3xl font-bold text-white">2 m/s</div>
                <div className="text-xs text-slate-500 mt-1 uppercase">Deplasare rapidă</div>
              </div>
              <div className="glass-card p-5 border border-cyber-cyan/20 rounded-xl hover:border-cyber-cyan/50 transition-colors">
                <div className="text-cyber-cyan font-mono text-xs tracking-wider mb-1">GREUTATE</div>
                <div className="text-3xl font-bold text-white">~35<span className="text-xl text-slate-400">kg</span></div>
                <div className="text-xs text-slate-500 mt-1 uppercase">Design ultra-ușor</div>
              </div>
              <div className="glass-card p-5 border border-cyber-cyan/20 rounded-xl hover:border-cyber-cyan/50 transition-colors">
                <div className="text-cyber-cyan font-mono text-xs tracking-wider mb-1">AI</div>
                <div className="text-3xl font-bold text-white">UnifoLM</div>
                <div className="text-xs text-slate-500 mt-1 uppercase">Învățare prin imitație</div>
              </div>
            </div>

            <button className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-navy-950 uppercase transition-all duration-300 bg-cyber-cyan rounded-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] focus:outline-none w-full sm:w-auto group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Descoperă Detalii G1 <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
