import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Counter({ to, duration }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = to / (duration * 60)
    
    const tick = () => {
      start += step
      if (start < to) {
        setCount(Math.ceil(start))
        requestAnimationFrame(tick)
      } else {
        setCount(to)
      }
    }
    
    requestAnimationFrame(tick)
  }, [to, duration])

  return <>{count}</>
}

export default function Specs() {
  const specs = [
    {
      icon: 'fa-robot',
      value: 43,
      suffix: '+',
      label: 'Articulații Active'
    },
    {
      icon: 'fa-microchip',
      value: 275,
      suffix: ' TOPS',
      label: 'Procesare AI Edge'
    },
    {
      icon: 'fa-battery-full',
      value: 4,
      suffix: ' ORE',
      label: 'Autonomie Continuă'
    },
    {
      icon: 'fa-weight-hanging',
      value: 30,
      suffix: ' KG',
      label: 'Sarcină Utilă'
    }
  ]

  return (
    <section id="specs" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-10 border border-cyber-cyan/30 radial-glow-center relative z-10 shadow-2xl shadow-cyan-900/10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center"
                >
                    {specs.map((spec, index) => (
                      <div key={index} className="flex flex-col items-center justify-center space-y-3 group">
                          <i className={`fa-solid ${spec.icon} text-cyber-cyan/40 text-3xl mb-2 group-hover:text-cyber-cyan transition-colors duration-300`}></i>
                          
                          <div className="flex items-baseline justify-center gap-1">
                              <span className="text-4xl sm:text-5xl font-black font-mono text-cyber-cyan cyan-glow-text tracking-tighter">
                                  <Counter to={spec.value} duration={2} />
                              </span>
                              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400/80">
                                  {spec.suffix}
                              </span>
                          </div>
                          
                          <div className="text-xs sm:text-sm font-mono text-slate-300 uppercase tracking-widest font-semibold">
                              {spec.label}
                          </div>
                      </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
  )
}
