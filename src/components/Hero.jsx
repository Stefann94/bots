import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RobotCanvas from './RobotCanvas'

export default function Hero() {
  const [robotColor, setRobotColor] = useState('#ffffff')
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)
  const [isInfoExpanded, setIsInfoExpanded] = useState(false)

  const colors = [
    { name: 'Glossy White', value: '#ffffff' },
    { name: 'Sky Blue', value: '#0ea5e9' },
    { name: 'Crimson Red', value: '#dc2626' },
    { name: 'Neon Gold', value: '#fbbf24' },
    { name: 'Toxic Green', value: '#10b981' },
    { name: 'Deep Sapphire', value: '#2563eb' },
    { name: 'Amethyst Purple', value: '#8b5cf6' },
    { name: 'Sunset Orange', value: '#f97316' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  }

  const infoText = "Unitree G1 Industrial represents the pinnacle of autonomous robotics. Equipped with advanced neural processing, 3D LiDAR, and unparalleled agility, it is designed to seamlessly integrate into high-risk industrial environments, research facilities, and complex automation workflows."
  const words = infoText.split(" ")

  const infoContainerVariants = {
    hidden: { height: 0, opacity: 0, marginTop: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      marginTop: 48, // mt-12
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.04, delayChildren: 0.4 }
    },
    exit: { 
      height: 0, 
      opacity: 0, 
      marginTop: 0,
      transition: { duration: 0.4, ease: "easeInOut" } 
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Easing cinematic (Expo Out)
      }
    }
  }

  return (
    <>
      <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern radial-glow-top">
          {/* Background Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse-glow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full filter blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Hero Content */}
                <motion.div 
                  className="relative w-full lg:col-span-6 flex flex-col justify-center gap-6 lg:gap-8 text-center lg:text-left z-10 pt-6 lg:pt-0"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  {/* Floating ambient blur OVER the text (Top Left constrained) */}
                  <motion.div 
                    animate={{ 
                      x: [-10, 40, -10], 
                      y: [-10, 40, -10],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -top-10 -left-10 w-40 h-40 sm:w-56 sm:h-56 bg-cyber-cyan/20 blur-[60px] rounded-full pointer-events-none z-20 mix-blend-screen"
                  />

                  <motion.div variants={itemVariants} className="flex justify-center lg:justify-start relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></span>
                        <span>NEXT-GEN AUTOMATION</span>
                    </div>
                  </motion.div>

                  <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      Viitorul Autonom. <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-sky-300 to-blue-500 cyan-glow-text">
                          Roboți Umanoizi Avansați
                      </span>
                  </motion.h1>

                  <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                      Descoperă noua generație de humanoizi bipezi, proiectați pentru industrie și cercetare. Mai agili, mai inteligenți și pregătiți să automatizeze cele mai complexe task-uri ale lumii moderne.
                  </motion.p>

                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                      <button className="group relative w-full sm:w-auto px-8 py-3.5 bg-cyber-cyan text-navy-950 text-sm font-bold tracking-widest uppercase rounded-md overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                              Explorează Umanoizii <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      </button>
                      
                      <button 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="group flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                      >
                          <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center bg-slate-900/50 group-hover:border-cyber-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                              <i className="fa-solid fa-play text-xs text-cyber-cyan ml-0.5"></i>
                          </div>
                          <span>Vezi în Acțiune</span>
                      </button>
                  </motion.div>
              </motion.div>

                {/* Right 3D Interactive Container */}
                <div className="lg:col-span-6 relative z-[110] w-full">
                  {/* Floating ambient blur (Background behind the card) */}
                  <motion.div 
                    animate={{ 
                      x: [20, -30, 20], 
                      y: [20, -30, 20],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 9, 
                      ease: "easeInOut",
                      delay: 1 
                    }}
                    className="absolute -bottom-20 -right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/15 blur-[80px] rounded-full pointer-events-none -z-10"
                  />
                  
                  <div className="glass-card rounded-2xl p-2 relative overflow-hidden border border-cyber-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] z-[110]">
                      
                      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                          <div className="flex items-center gap-2 px-3 py-1 bg-navy-950/80 rounded border border-cyber-cyan/30 text-[11px] font-mono text-cyber-cyan">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>MODEL: UNITREE G1 INDUSTRIAL</span>
                          </div>
                          
                          <div className="relative pointer-events-auto">
                              {/* Butonul principal care deschide dropdown-ul */}
                              <button 
                                onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
                                className="flex items-center gap-2 bg-navy-950/80 px-3 py-1.5 rounded border border-slate-700 hover:border-cyber-cyan transition-colors"
                              >
                                <span className="text-[10px] text-slate-400 font-mono">VOPSEA:</span>
                                <span className="w-3 h-3 rounded-full border border-slate-500 shadow-[0_0_5px_rgba(0,0,0,0.5)]" style={{ backgroundColor: robotColor }}></span>
                                <i className={`fa-solid fa-chevron-down text-[10px] text-slate-500 transition-transform ${isColorMenuOpen ? 'rotate-180' : ''}`}></i>
                              </button>

                              {/* Meniul Dropdown (Grid cu culori) */}
                              {isColorMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-navy-950/95 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-md z-50 grid grid-cols-4 gap-3 animate-in fade-in zoom-in duration-200">
                                  {colors.map(c => (
                                    <button 
                                      key={c.value}
                                      onClick={() => { setRobotColor(c.value); setIsColorMenuOpen(false); }}
                                      className={`w-6 h-6 mx-auto rounded-full border-2 transition-all hover:scale-125 ${robotColor === c.value ? 'border-cyber-cyan scale-125 shadow-[0_0_12px_rgba(0,240,255,0.6)]' : 'border-slate-600'}`}
                                      style={{ backgroundColor: c.value }}
                                      title={c.name}
                                    />
                                  ))}
                                </div>
                              )}
                          </div>
                      </div>

                      <div className="w-full h-[450px] sm:h-[500px] rounded-xl relative cursor-grab active:cursor-grabbing bg-[#07132a]">
                          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-cyber-cyan"><i className="fa-solid fa-spinner fa-spin text-3xl"></i></div>}>
                            <RobotCanvas robotColor={robotColor} />
                          </Suspense>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-between items-center gap-2 pointer-events-none text-[11px] font-mono text-slate-400 bg-navy-950/80 p-2.5 rounded-lg border border-slate-800">
                          <div className="flex items-center gap-4">
                              <span>ROT: <span className="text-cyber-cyan">AUTO</span></span>
                              <span>SENSORS: <span className="text-emerald-400">ONLINE</span></span>
                          </div>
                          <div>POWER: <span className="text-cyber-cyan">98%</span></div>
                      </div>
                  </div>

                  {/* Buton "View More About Unitree" adăugat sub chenar */}
                  <div className="mt-6 w-full flex justify-start">
                      <button 
                        onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                        className={`group relative px-6 py-3 bg-navy-950/50 backdrop-blur-sm border ${isInfoExpanded ? 'border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border-cyber-cyan/40'} text-cyber-cyan text-xs font-mono font-bold tracking-widest uppercase rounded-lg overflow-hidden transition-all hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]`}
                      >
                          <div className="flex items-center gap-3">
                              <span>VIEW MORE ABOUT UNITREE</span>
                              <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
                          </div>
                      </button>
                  </div>
              </div>
          </div>

          {/* Animated Info Section Below Hero */}
          <AnimatePresence>
            {isInfoExpanded && (
              <motion.div
                variants={infoContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-4xl mx-auto px-4 overflow-hidden"
              >
                <div className="glass-card rounded-2xl p-8 md:p-12 border border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.1)] relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"></div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <i className="fa-solid fa-microchip text-cyber-cyan animate-pulse"></i>
                    <h3 className="text-white font-mono text-lg tracking-widest uppercase">System Specifications</h3>
                  </div>
                  
                  <div className="flex flex-wrap text-slate-300 font-light leading-relaxed text-lg md:text-xl">
                    {words.map((word, i) => (
                      <motion.span key={i} variants={wordVariants} className="mr-2 mb-2 inline-block">
                        {word}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="mt-8 pt-6 border-t border-slate-700/50 grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {[
                      { label: "TORQUE", val: "120 Nm" },
                      { label: "PAYLOAD", val: "35 KG" },
                      { label: "LATENCY", val: "< 5ms" },
                      { label: "UPTIME", val: "24/7" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-cyber-cyan font-mono text-xs mb-1">{stat.label}</div>
                        <div className="text-white font-bold tracking-wider">{stat.val}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-5xl aspect-video glass-card rounded-2xl overflow-hidden ring-1 ring-cyber-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-navy-950/80 rounded-full flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:bg-slate-800 transition-colors border border-slate-700 hover:border-cyber-cyan"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
            
            <div className="w-full h-full flex flex-col items-center justify-center bg-navy-900">
              <i className="fa-solid fa-robot text-6xl text-cyber-cyan/30 mb-4 animate-pulse"></i>
              <p className="text-cyber-cyan font-mono text-sm tracking-widest">VIDEO FEED STREAMING OFFLINE</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
