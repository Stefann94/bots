import { motion } from 'framer-motion'

export default function AgiBotSeries() {
  return (
    <section id="agibot-series" className="py-24 relative bg-navy-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl overflow-hidden border border-cyber-cyan/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
            >
                <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono uppercase mb-4 border border-cyber-cyan/30">
                            <i className="fa-solid fa-microchip"></i> Serie Dedicată: AgiBot Series
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 leading-tight">
                            Robotul Biped AGI de <br />
                            <span className="text-cyber-cyan cyan-glow-text">Nouă Generație</span>
                        </h2>

                        <p className="text-slate-300 text-base mt-6 leading-relaxed">
                            Secțiune dedicată roboților AgiBot A2 și Raise A1. Include capabilități AI avansate pentru manipulare la nivel uman și raționament logic aplicat în medii industriale complexe.
                        </p>
                        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                            Utilizatorul poate naviga fluid între specificațiile de manipulare fină, încărcătură utilă și autonomie de operare.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                                <div className="text-cyber-cyan text-lg font-bold font-mono">12 DoF Hands</div>
                                <div className="text-xs text-slate-400 mt-1">Manipulare fină duală cu feedback tactil</div>
                            </div>
                            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                                <div className="text-cyber-cyan text-lg font-bold font-mono">Zero-Shot AI</div>
                                <div className="text-xs text-slate-400 mt-1">Percepție spațială și auto-învățare automată</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-4">
                        <button className="px-6 py-3 bg-cyber-cyan text-navy-950 font-mono font-bold text-xs uppercase rounded-lg hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                            Solicită Prototip AgiBot
                        </button>
                        <span className="text-xs font-mono text-slate-400">PRODUCȚIE ÎN MASĂ</span>
                    </div>
                </div>

                <div className="lg:col-span-6 relative bg-navy-950 min-h-[400px] flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent z-10"></div>
                    
                    <div className="relative z-0 w-full h-full flex flex-col items-center justify-center text-center">
                        <div className="w-64 h-64 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center relative animate-pulse">
                            <i className="fa-solid fa-robot text-9xl text-cyber-cyan/80 filter drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]"></i>
                            
                            <div className="absolute inset-0 rounded-full border border-dashed border-cyber-cyan/40 animate-spin" style={{ animationDuration: '20s' }}></div>
                        </div>

                        <div className="mt-6 z-20">
                            <div className="text-lg font-bold text-white font-mono">AgiBot Raise A1</div>
                            <div className="text-xs text-cyber-cyan font-mono mt-1">AGI EMBODIED INTELLIGENCE</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  )
}
