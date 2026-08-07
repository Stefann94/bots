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
                                <div className="text-cyber-cyan text-lg font-bold font-mono">Dexteritate Extremă</div>
                                <div className="text-xs text-slate-400 mt-1">Mâini cu 12 articulații independente</div>
                            </div>
                            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                                <div className="text-cyber-cyan text-lg font-bold font-mono">Sistem AGI Integrat</div>
                                <div className="text-xs text-slate-400 mt-1">Capacitate nativă de adaptare și învățare</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-6 relative bg-navy-950 min-h-[320px] flex items-center justify-center overflow-hidden">
                    <img src="/images/agibot_real.png" alt="AgiBot Raise A1" className="absolute inset-0 w-full h-full object-cover object-top opacity-75 hover:opacity-100 transition-opacity duration-700 mix-blend-lighten" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-950/30 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-transparent to-transparent z-10 pointer-events-none lg:block hidden"></div>
                    
                    <div className="relative z-20 w-full h-full flex flex-col items-center justify-end text-center p-8 pb-12 mt-auto">
                        <div className="text-2xl font-bold text-white font-mono drop-shadow-md">AgiBot Raise A1</div>
                        <div className="text-sm text-cyber-cyan font-mono mt-2 uppercase tracking-widest drop-shadow-md">Inteligență Artificială Generativă</div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  )
}
