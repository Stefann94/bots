import { motion } from 'framer-motion'

export default function AgiBotSeries() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  }

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } 
    }
  }

  return (
    <section id="agibot-series" className="py-24 relative border-t border-slate-800 overflow-hidden">
        <div className="relative z-[20] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: 2000 }}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={containerVariants}
              className="glass-card rounded-3xl overflow-hidden border border-cyber-cyan/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl transform-gpu"
            >
                <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between z-20">
                    <motion.div variants={containerVariants}>
                        <motion.h2 variants={textVariants} className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 leading-tight">
                            Robotul Biped AGI de <br />
                            <span className="text-cyber-cyan cyan-glow-text">Nouă Generație</span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-slate-300 text-base mt-6 leading-relaxed">
                            Secțiune dedicată roboților AgiBot A2 și Raise A1. Include capabilități AI avansate pentru manipulare la nivel uman și raționament logic aplicat în medii industriale complexe.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-slate-400 text-sm mt-3 leading-relaxed">
                            Utilizatorul poate naviga fluid între specificațiile de manipulare fină, încărcătură utilă și autonomie de operare.
                        </motion.p>

                        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <motion.div variants={itemVariants} className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 group hover:border-cyber-cyan/40 transition-colors">
                                <div className="text-cyber-cyan text-lg font-bold font-mono group-hover:scale-105 transition-transform origin-left">Dexteritate Extremă</div>
                                <div className="text-xs text-slate-400 mt-1">Mâini cu 12 articulații independente</div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 group hover:border-cyber-cyan/40 transition-colors">
                                <div className="text-cyber-cyan text-lg font-bold font-mono group-hover:scale-105 transition-transform origin-left">Sistem AGI Integrat</div>
                                <div className="text-xs text-slate-400 mt-1">Capacitate nativă de adaptare și învățare</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div variants={imageContainerVariants} className="lg:col-span-6 relative bg-navy-950 min-h-[400px] flex items-center justify-center overflow-hidden group">
                    <img src="/images/agibot_real.webp" alt="AgiBot Raise A1" className="absolute inset-0 w-full h-full object-cover object-top opacity-75 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] mix-blend-lighten group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-950/30 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-transparent to-transparent z-10 pointer-events-none lg:block hidden"></div>
                    
                    <motion.div variants={itemVariants} className="relative z-20 w-full h-full flex flex-col items-center justify-end text-center p-8 pb-12 mt-auto">
                        <div className="text-2xl font-bold text-white font-mono drop-shadow-md">AgiBot Raise A1</div>
                        <div className="text-sm text-cyber-cyan font-mono mt-2 uppercase tracking-widest drop-shadow-md">Inteligență Artificială Generativă</div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    </section>
  )
}
