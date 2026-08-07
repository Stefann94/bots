import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 rounded-xl bg-navy-950/80 border border-slate-700/80 text-white text-sm cursor-pointer flex justify-between items-center transition-all hover:border-cyber-cyan/50 focus-within:border-cyber-cyan focus-within:ring-2 focus-within:ring-cyber-cyan/20"
      >
        <span className={value ? 'text-white' : 'text-slate-500'}>
          {value || placeholder}
        </span>
        <i className={`fa-solid fa-chevron-down text-cyber-cyan text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-navy-900 border border-slate-700/80 rounded-xl overflow-hidden z-50 shadow-2xl shadow-cyan-900/20"
          >
            {options.map((option, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`px-5 py-3 text-sm cursor-pointer transition-colors ${
                  value === option 
                    ? 'bg-cyber-cyan/20 text-cyber-cyan font-bold border-l-2 border-cyber-cyan' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-2 border-transparent'
                }`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [model, setModel] = useState('Unitree H1 Bipedal')
  const [timeline, setTimeline] = useState('Imediat (Q1 2026)')

  const modelOptions = [
    'Unitree H1 Bipedal',
    'Unitree G1 Compact',
    'AgiBot Raise A1 / A2',
    'Platformă de Cercetare Custom'
  ]

  const timelineOptions = [
    'Imediat (Q1 2026)',
    '3-6 Luni',
    'Fază de Cercetare & Evaluare'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate network request
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      
      // Hide toast after 3s
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  // Circular Iris Reveal for the container
  const cardVariants = {
    hidden: { clipPath: "circle(0% at 50% 50%)", scale: 0.9, opacity: 0 },
    visible: { 
      clipPath: "circle(150% at 50% 50%)", 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    }
  }

  // Staggered boot-up for form fields
  const fieldVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  }

  return (
    <>
      <section id="about" className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                className="glass-card rounded-3xl p-8 sm:p-12 border border-cyber-cyan/40 shadow-2xl relative overflow-hidden"
              >
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

                  <motion.div variants={fieldVariants} className="text-center mb-8">
                      <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest">ACHIZIȚII ENTERPRISE</span>
                      <h2 className="text-3xl font-bold text-white mt-2">Programează o Demonstrație Live</h2>
                      <p className="text-slate-400 text-sm mt-2">
                          Testează modelele humanoide Unitree și AgiBot la sediul tău sau vizitează hub-urile noastre tehnologice regionale.
                      </p>
                  </motion.div>

                  <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                      <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Nume Complet *</label>
                              <input type="text" required placeholder="Ex: Ion Popescu" className="w-full px-5 py-3.5 rounded-xl bg-navy-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 transition-all placeholder-slate-600" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Email Corporate *</label>
                              <input type="email" required placeholder="contact@compania-ta.ro" className="w-full px-5 py-3.5 rounded-xl bg-navy-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 transition-all placeholder-slate-600" />
                          </div>
                      </motion.div>

                      <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="relative">
                              <label className="block text-sm font-medium text-slate-300 mb-2">Model de Interes Principal</label>
                              <CustomSelect 
                                options={modelOptions}
                                value={model}
                                onChange={setModel}
                              />
                          </div>
                          <div className="relative">
                              <label className="block text-sm font-medium text-slate-300 mb-2">Timeline Implementare</label>
                              <CustomSelect 
                                options={timelineOptions}
                                value={timeline}
                                onChange={setTimeline}
                              />
                          </div>
                      </motion.div>

                      <motion.div variants={fieldVariants}>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Detalii Proiect & Cerințe Implementare</label>
                          <textarea rows="4" placeholder="Specifică mediul de operare, nevoile de încărcătură, integrările software necesare..." className="w-full px-5 py-3.5 rounded-xl bg-navy-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 transition-all placeholder-slate-600 resize-none"></textarea>
                      </motion.div>

                      <motion.button variants={fieldVariants} type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-cyber-cyan to-blue-500 text-navy-950 font-extrabold text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.01] transition-all duration-300 flex justify-center items-center group">
                          {loading ? (
                            <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                          ) : (
                            <span className="flex items-center gap-2">
                              Trimite Solicitare Enterprise <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </span>
                          )}
                      </motion.button>
                  </form>
              </motion.div>
          </div>
      </section>

      {/* Notification Toast */}
      <div className={`fixed bottom-6 right-6 z-50 glass-card border border-cyber-cyan text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 ${success ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <i className="fa-solid fa-circle-check text-cyber-cyan text-xl"></i>
          <div>
              <div className="font-bold text-sm">Cerere Trimisă</div>
              <div className="text-xs text-slate-400">Echipa noastră te va contacta curând.</div>
          </div>
      </div>
    </>
  )
}
