import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleScroll = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 rounded-lg bg-navy-900 border border-cyber-cyan/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:border-cyber-cyan transition-all duration-300">
                    <i className="fa-solid fa-robot text-cyber-cyan text-lg"></i>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-cyan rounded-full animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-cyan rounded-full"></span>
                </div>
                <div>
                    <span className="font-extrabold text-lg tracking-wider text-white">NEXUS<span className="text-cyber-cyan">BOTICS</span></span>
                    <span className="block text-[10px] font-mono text-slate-400 tracking-widest uppercase">Platformă Unitree & AgiBot</span>
                </div>
            </a>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                <div 
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button className="flex items-center gap-1.5 hover:text-cyber-cyan transition-colors py-2" aria-label="Produse">
                        Produse <i className="fa-solid fa-chevron-down text-[10px] text-cyber-cyan"></i>
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-64 pt-2"
                        >
                            <div className="glass-card rounded-xl p-3 border border-cyber-cyan/30 shadow-2xl">
                                <button onClick={() => handleScroll('unitree-series')} className="w-full text-left flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/60 transition-colors">
                                    <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyber-cyan text-xs">
                                        <i className="fa-solid fa-bolt"></i>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">Humanoizi Unitree</div>
                                        <div className="text-xs text-slate-400">Seriile Bipede H1, G1</div>
                                    </div>
                                </button>
                                <button onClick={() => handleScroll('agibot-series')} className="w-full text-left flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/60 transition-colors mt-1">
                                    <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 text-xs">
                                        <i className="fa-solid fa-brain"></i>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">Seria AGI Bot</div>
                                        <div className="text-xs text-slate-400">Raise A1, A2 Enterprise</div>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
                <button onClick={() => handleScroll('technology')} className="hover:text-cyber-cyan transition-colors">Tehnologie</button>
                <button onClick={() => handleScroll('applications')} className="hover:text-cyber-cyan transition-colors">Aplicații</button>
                <button onClick={() => handleScroll('specs')} className="hover:text-cyber-cyan transition-colors">Performanță</button>
                <button onClick={() => handleScroll('about')} className="hover:text-cyber-cyan transition-colors">Despre Noi</button>
            </nav>

            <div className="hidden sm:flex items-center gap-4">
                <button onClick={() => handleScroll('about')} className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold tracking-wider text-navy-950 uppercase transition-all duration-300 bg-cyber-cyan rounded-lg hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] focus:outline-none font-mono">
                    <i className="fa-solid fa-headset mr-2"></i> Solicită Demo
                </button>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-300 hover:text-cyber-cyan p-2" aria-label="Menu">
                <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card border-t border-slate-800/80 px-6 py-4 space-y-3 overflow-hidden"
            >
                <button onClick={() => handleScroll('unitree-series')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Seria Unitree</button>
                <button onClick={() => handleScroll('agibot-series')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Seria AGI Bot</button>
                <button onClick={() => handleScroll('technology')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Tehnologie</button>
                <button onClick={() => handleScroll('applications')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Aplicații</button>
                <button onClick={() => handleScroll('specs')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Specificații Performanță</button>
                <button onClick={() => handleScroll('about')} className="w-full mt-2 py-2.5 bg-cyber-cyan text-navy-950 font-mono font-bold text-xs uppercase rounded-lg">
                    Solicită Demo / Vânzări
                </button>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  )
}
