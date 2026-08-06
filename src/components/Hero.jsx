import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import RobotCanvas from './RobotCanvas'

export default function Hero() {
  const [wireframe, setWireframe] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern radial-glow-top">
          {/* Background Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse-glow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full filter blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Hero Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left pt-6 lg:pt-0"
              >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></span>
                      <span>Concept UI/UX & Web Architecture</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      Unitree & AgiBot <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-sky-300 to-blue-500 cyan-glow-text">
                          Robotică Umanoidă
                      </span>
                  </h1>

                  <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                      Machetă vizuală executivă pentru un site corporate de prezentare de înaltă clasă. Integrează vizualizări 3D interactive în timp real, efecte la scroll, stil dark-navy elegant și interfață futuristă.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                      <a href="#unitree-series" className="w-full sm:w-auto px-8 py-3.5 bg-cyber-cyan text-navy-950 font-bold font-mono text-sm tracking-wider uppercase rounded-xl hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all duration-300 flex items-center justify-center gap-2">
                          <span>Explorează Humanoizii</span>
                          <i className="fa-solid fa-arrow-right"></i>
                      </a>
                      <button onClick={() => setIsVideoModalOpen(true)} className="w-full sm:w-auto px-8 py-3.5 glass-card border border-cyber-cyan/30 text-white font-semibold text-sm rounded-xl hover:bg-slate-800/80 hover:border-cyber-cyan transition-all duration-300 flex items-center justify-center gap-2">
                          <i className="fa-solid fa-circle-play text-cyber-cyan text-base"></i>
                          <span>Vezi în Acțiune</span>
                      </button>
                  </div>
              </motion.div>

              {/* Right 3D Interactive Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-6 z-10 relative"
              >
                  <div className="glass-card rounded-2xl p-2 relative overflow-hidden border border-cyber-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
                      
                      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                          <div className="flex items-center gap-2 px-3 py-1 bg-navy-950/80 rounded border border-cyber-cyan/30 text-[11px] font-mono text-cyber-cyan">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>MODEL: AGIBOT A2-DEXTER</span>
                          </div>
                          <div className="flex items-center gap-2 pointer-events-auto">
                              <button onClick={() => setWireframe(!wireframe)} className={`px-2.5 py-1 ${wireframe ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan' : 'bg-navy-900/90 text-slate-300 border-slate-700'} text-[11px] font-mono rounded border hover:border-cyber-cyan hover:text-cyber-cyan transition-colors`}>
                                  <i className="fa-solid fa-cube mr-1"></i> Mesh
                              </button>
                          </div>
                      </div>

                      <div className="w-full h-[450px] sm:h-[500px] rounded-xl relative cursor-grab active:cursor-grabbing bg-navy-900">
                          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-cyber-cyan"><i className="fa-solid fa-spinner fa-spin text-3xl"></i></div>}>
                            <RobotCanvas wireframe={wireframe} />
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
              </motion.div>
          </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-card max-w-3xl w-full rounded-2xl overflow-hidden border border-cyber-cyan/40 p-4 relative">
                <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="text-xs font-mono text-cyber-cyan mb-2">DEMONSTRAȚIE ROBOTICĂ</div>
                <div className="w-full h-80 sm:h-96 rounded-xl bg-slate-900 flex flex-col items-center justify-center border border-slate-800 relative overflow-hidden">
                    <i className="fa-solid fa-play-circle text-6xl text-cyber-cyan animate-pulse cursor-pointer"></i>
                    <div className="mt-4 font-mono text-slate-300 text-sm">ALERGARE LA VITEZĂ MARE & ASAMBLARE</div>
                    <div className="text-xs text-slate-500 mt-1">4K High-Speed Camera Capture (240 FPS)</div>
                </div>
            </div>
        </div>
      )}
    </>
  )
}
