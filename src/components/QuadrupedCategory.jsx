import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function QuadrupedCategory() {
  const containerRef = useRef(null)
  
  // Make container tall enough to allow significant scrolling (400vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Move the entire track horizontally. We move from 0% to -66% so that the last element reaches the left side
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"])
  
  // Fade in the first text block when you arrive at this section
  const initialOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <section id="quadrupeds" ref={containerRef} className="relative h-[400vh]">
      
      {/* Sticky container that stays on screen while scrolling vertically */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden border-y border-emerald-500/20">
        
        {/* Abstract Topographic/Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9811a_1px,transparent_1px),linear-gradient(to_bottom,#10b9811a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

        {/* The Horizontal Track */}
        <motion.div 
          style={{ x }} 
          className="flex h-full items-center relative z-10 w-[300vw]"
        >
           {/* Scene 1: Intro Quadruped */}
           <div className="w-[100vw] px-10 md:px-[10vw] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
               <motion.div style={{ opacity: initialOpacity }} className="w-64 h-64 md:w-96 md:h-96 glass-card rounded-[40px] border border-emerald-500/30 flex flex-col items-center justify-center flex-shrink-0 bg-navy-950/80 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                  <i className="fa-solid fa-dog text-8xl md:text-9xl text-emerald-100 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"></i>
                  <div className="mt-8 text-xs font-mono text-emerald-500 tracking-widest">QUADRUPED // SERIES</div>
               </motion.div>
               <motion.div style={{ opacity: initialOpacity }} className="max-w-xl">
                  <h3 className="text-emerald-500 font-mono text-sm mb-2 tracking-widest uppercase">Manevrabilitate Supremă</h3>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Câini Bionici All-Terrain</h2>
                  <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                    Nicio suprafață nu este prea dificilă. Seria de roboți quadrupezi este construită pentru stabilitate absolută, adaptându-se instantaneu la pietre, scări sau suprafețe alunecoase.
                  </p>
               </motion.div>
           </div>
           
           {/* Scene 2: 4D LiDAR & Sensors */}
           <div className="w-[100vw] px-10 md:px-[10vw] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
               <div className="max-w-xl order-2 md:order-1 text-right">
                  <h3 className="text-teal-400 font-mono text-sm mb-2 tracking-widest uppercase">Percepție Senzorială</h3>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Vedere LiDAR 4D</h2>
                  <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                    Sistemul de recunoaștere spațială ultra-wide detectează obstacolele în fracțiuni de secundă, permițând maparea 3D a mediului înconjurător și o navigație complet autonomă, chiar și în întuneric total.
                  </p>
               </div>
               <div className="w-64 h-64 md:w-96 md:h-96 glass-card rounded-[40px] border border-teal-500/30 flex flex-col items-center justify-center flex-shrink-0 bg-navy-950/80 order-1 md:order-2 relative overflow-hidden">
                  <i className="fa-solid fa-radar text-8xl md:text-9xl text-teal-100 drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]"></i>
                  {/* Scanning laser effect */}
                  <div className="absolute top-0 w-full h-1 bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,1)] animate-[scan_2s_linear_infinite_alternate]"></div>
               </div>
           </div>

           {/* Scene 3: Autonomy & Battery */}
           <div className="w-[100vw] px-10 md:px-[10vw] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
               <div className="w-64 h-64 md:w-96 md:h-96 glass-card rounded-[40px] border border-blue-500/30 flex flex-col items-center justify-center flex-shrink-0 bg-navy-950/80 relative">
                  <i className="fa-solid fa-battery-full text-8xl md:text-9xl text-blue-100 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"></i>
                  {/* Charging pulse */}
                  <div className="absolute inset-0 rounded-[40px] border-2 border-blue-400/50 animate-ping opacity-20"></div>
               </div>
               <div className="max-w-xl">
                  <h3 className="text-blue-400 font-mono text-sm mb-2 tracking-widest uppercase">Inspecție Continuă</h3>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Autonomie Extinsă</h2>
                  <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
                    Cu baterii integrate de mare capacitate (până la 8000mAh), quadrupezii pot efectua runde lungi de inspecție industrială sau patrulare, întorcându-se automat la stația de încărcare.
                  </p>
                  
                  <button className="px-8 py-3 bg-emerald-500 text-navy-950 font-bold font-mono tracking-widest rounded hover:bg-white hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all uppercase text-sm">
                     Vezi Specificații Go2
                  </button>
               </div>
           </div>

        </motion.div>
      </div>
    </section>
  )
}
