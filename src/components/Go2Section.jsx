import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Go2Section() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 overflow-hidden flex items-center bg-black/80">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-navy-950/40 to-black"></div>
      
      {/* Scanning LiDAR Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]">
            <motion.div 
                animate={{ y: ['0vh', '100vh', '0vh'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-full h-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,1)]"
            />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <motion.div style={{ opacity }} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <i className="fa-solid fa-radar text-emerald-500"></i>
            <span>QUADRUPED BIONIC 4D</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Unitree <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">Go2</span>
          </h2>
        </motion.div>

        {/* Z-Pattern Layout */}
        <div className="flex flex-col gap-24 overflow-hidden">
          
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div style={{ x: xLeft }} className="w-full lg:w-1/2 glass-card p-10 rounded-3xl border border-emerald-500/20 bg-navy-950/60 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent group-hover:from-emerald-500/10 transition-colors duration-500"></div>
              <div className="aspect-video flex items-center justify-center">
                <i className="fa-solid fa-dog text-8xl md:text-9xl text-emerald-500/40 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-700 drop-shadow-[0_0_15px_rgba(16,185,129,0)] group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"></i>
              </div>
            </motion.div>
            
            <motion.div style={{ x: xRight }} className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-white border-l-4 border-emerald-500 pl-4">Embodied AI & LiDAR</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Go2 este dotat cu tehnologia 4D LiDAR de recunoaștere ultra-wide, dezvoltată in-house, oferind o percepție spațială revoluționară. Înțelege terenul, evită obstacolele cu precizie milimetrică și interacționează natural prin comenzile vocale AI.
              </p>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <motion.div style={{ x: xRight }} className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-colors bg-navy-950/60 backdrop-blur-md">
                 <i className="fa-solid fa-battery-full text-2xl text-emerald-400 mb-3"></i>
                 <div className="text-2xl font-bold text-white mb-1">8000mAh</div>
                 <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Baterie Long-Life</div>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-colors bg-navy-950/60 backdrop-blur-md">
                 <i className="fa-solid fa-person-running text-2xl text-emerald-400 mb-3"></i>
                 <div className="text-2xl font-bold text-white mb-1">5 m/s</div>
                 <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Viteză de vârf</div>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-colors bg-navy-950/60 backdrop-blur-md">
                 <i className="fa-solid fa-microchip text-2xl text-emerald-400 mb-3"></i>
                 <div className="text-2xl font-bold text-white mb-1">ISS 2.0</div>
                 <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Urmărire laterală</div>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-colors bg-navy-950/60 backdrop-blur-md">
                 <i className="fa-solid fa-weight-scale text-2xl text-emerald-400 mb-3"></i>
                 <div className="text-2xl font-bold text-white mb-1">~15 kg</div>
                 <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Design compact</div>
              </div>
            </motion.div>
            
            <motion.div style={{ x: xLeft }} className="w-full lg:w-1/2 space-y-6 lg:pr-12">
              <h3 className="text-3xl font-bold text-white border-r-4 border-emerald-500 pr-4 text-right">Mobilitate Supremă</h3>
              <p className="text-slate-400 text-lg leading-relaxed text-right">
                Articulațiile sale generează un cuplu impresionant, permițându-i să execute acrobații, să urce scări abrupte și să se redreseze automat după impact. Bateria extinsă îi asigură o operare continuă pe durate record.
              </p>
              <div className="flex justify-end pt-4">
                <button className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest text-emerald-950 uppercase transition-all duration-300 bg-emerald-500 rounded-lg hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] focus:outline-none">
                    Descoperă Detalii Go2
                </button>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
