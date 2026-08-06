import { motion } from 'framer-motion'

export default function RobotSeries() {
  return (
    <section id="unitree-series" className="py-24 relative bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest">
                    FLOTA 2026
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                    Seria Umanoidă Unitree
                </h2>
                <p className="text-slate-400 text-base mt-3">
                    Roboți bipezi cu echilibrare dinamică de mare viteză, proiectați pentru mobilitate agilă, capacitate de transport și adaptabilitate în medii accidentate.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Unitree H1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-2xl p-8 glass-card-hover relative group overflow-hidden"
                >
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-2xl group-hover:bg-cyber-cyan/20 transition-all"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-xs font-mono text-cyber-cyan tracking-wider uppercase">BIPED FULL-SIZE</span>
                            <h3 className="text-2xl font-bold text-white mt-1">Unitree H1 Evolution</h3>
                        </div>
                        <span className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">Flagship</span>
                    </div>

                    <div className="w-full h-56 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center relative overflow-hidden mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fa-solid fa-person text-8xl text-cyber-cyan/20 group-hover:text-cyber-cyan/40 transition-colors"></i>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] font-mono text-slate-400 bg-navy-950/80 p-2 rounded">
                            <span>ÎNĂLȚIME: 180 CM</span>
                            <span>GREUTATE: 47 KG</span>
                            <span>CUPLU: 360 N.m</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                            <div className="text-white font-bold font-mono text-lg">3.3 m/s</div>
                            <div className="text-xs text-slate-400 mt-1">Viteză de Alergare</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                            <div className="text-white font-bold font-mono text-lg">360° LIDAR</div>
                            <div className="text-xs text-slate-400 mt-1">Cartografiere Spațială</div>
                        </div>
                    </div>
                </motion.div>

                {/* Unitree G1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card rounded-2xl p-8 glass-card-hover relative group overflow-hidden"
                >
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-xs font-mono text-sky-400 tracking-wider uppercase">MODEL PRODUCȚIE MASĂ</span>
                            <h3 className="text-2xl font-bold text-white mt-1">Unitree G1 Agent</h3>
                        </div>
                        <span className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">Compact</span>
                    </div>

                    <div className="w-full h-56 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center relative overflow-hidden mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fa-solid fa-child-reaching text-8xl text-sky-400/20 group-hover:text-sky-400/40 transition-colors"></i>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] font-mono text-slate-400 bg-navy-950/80 p-2 rounded">
                            <span>ÎNĂLȚIME: 127 CM</span>
                            <span>GREUTATE: 35 KG</span>
                            <span>DoF: 23-43</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                            <div className="text-white font-bold font-mono text-lg">2 m/s</div>
                            <div className="text-xs text-slate-400 mt-1">Viteză Maximă</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                            <div className="text-white font-bold font-mono text-lg">Force Sense</div>
                            <div className="text-xs text-slate-400 mt-1">Mâini Dexteritate</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  )
}
