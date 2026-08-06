import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const handleNav = (path, hashId) => {
    setMenuOpen(false)
    if (location.pathname !== path) {
      navigate(path)
      // Small delay to allow the new page to render before scrolling
      if (hashId) {
        setTimeout(() => {
          const el = document.getElementById(hashId)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        window.scrollTo(0, 0)
      }
    } else if (hashId) {
      const el = document.getElementById(hashId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle hash changes on load if arriving from another page
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
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
                <button onClick={() => handleNav('/', null)} className={`hover:text-cyber-cyan transition-colors ${location.pathname === '/' ? 'text-cyber-cyan' : ''}`}>Acasă</button>
                <button onClick={() => handleNav('/modele-3d', null)} className={`hover:text-cyber-cyan transition-colors ${location.pathname === '/modele-3d' ? 'text-cyber-cyan' : ''}`}>Modele 3D</button>
                <button onClick={() => handleNav('/', 'technology')} className="hover:text-cyber-cyan transition-colors">Inovație</button>
                <button onClick={() => handleNav('/', 'applications')} className="hover:text-cyber-cyan transition-colors">Aplicații</button>
                <button onClick={() => handleNav('/', 'contact')} className="hover:text-cyber-cyan transition-colors">Contact</button>
            </nav>

            <div className="hidden sm:flex items-center gap-4">
                <button onClick={() => handleNav('/modele-3d', null)} className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-widest text-navy-950 uppercase transition-all duration-300 bg-cyber-cyan rounded-lg hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] focus:outline-none font-mono">
                    <i className="fa-solid fa-rocket mr-2"></i> EXPLOREAZĂ UMANOIZII
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
                <button onClick={() => handleNav('/', null)} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Acasă</button>
                <Link to="/umanoizi" onClick={() => setMenuOpen(false)} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Modele 3D</Link>
                <button onClick={() => handleNav('/', 'technology')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Inovație</button>
                <button onClick={() => handleNav('/', 'applications')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Aplicații</button>
                <button onClick={() => handleNav('/', 'contact')} className="w-full text-left block text-slate-300 hover:text-cyber-cyan py-1 text-sm">Contact</button>
                
                <Link to="/umanoizi" onClick={() => setMenuOpen(false)} className="w-full mt-4 py-3 flex items-center justify-center bg-cyber-cyan text-navy-950 font-mono font-bold text-xs uppercase rounded-lg">
                    <i className="fa-solid fa-rocket mr-2"></i> EXPLOREAZĂ UMANOIZII
                </Link>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  )
}
