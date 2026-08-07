import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import NetworkBackground from '../components/NetworkBackground'

export default function ContactPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <main className="min-h-screen pt-32 pb-16 bg-[#020617] relative overflow-hidden">
      <NetworkBackground />
      
      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
         >
             <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase mb-6">
                 Contact
             </h1>
             <p className="text-slate-400 text-lg leading-relaxed">
                 Ai un proiect în minte sau dorești o demonstrație live pentru echipamentele noastre? Echipa noastră de specialiști este pregătită să îți răspundă.
             </p>
         </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-4">
          <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} className="glass-card p-8 rounded-2xl border border-slate-800 text-center hover:border-cyber-cyan/30 transition-colors">
              <div className="w-16 h-16 mx-auto bg-cyber-cyan/10 rounded-2xl flex items-center justify-center mb-6 border border-cyber-cyan/30">
                  <i className="fa-solid fa-location-dot text-cyber-cyan text-2xl"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-3 tracking-wider uppercase">Sediul Central</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Str. Tehnologiei Nr. 42,<br/>Clădirea Nexus, București</p>
          </motion.div>

          <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} className="glass-card p-8 rounded-2xl border border-slate-800 text-center hover:border-purple-500/30 transition-colors">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30">
                  <i className="fa-solid fa-envelope text-purple-400 text-2xl"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-3 tracking-wider uppercase">Email</h3>
              <p className="text-slate-400 text-sm leading-relaxed">enterprise@nexusbotics.ro<br/>support@nexusbotics.ro</p>
          </motion.div>

          <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} className="glass-card p-8 rounded-2xl border border-slate-800 text-center hover:border-green-500/30 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30">
                  <i className="fa-solid fa-phone text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-3 tracking-wider uppercase">Telefon</h3>
              <p className="text-slate-400 text-sm leading-relaxed">+40 (700) 123 456<br/>Luni - Vineri, 09:00 - 18:00</p>
          </motion.div>
      </div>

      <div className="relative z-10 -mt-12">
         <Contact />
      </div>
    </main>
  )
}
