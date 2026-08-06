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
  return (
    <section id="specs" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-10 border border-cyber-cyan/30 radial-glow-center relative z-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    <div className="space-y-2">
                        <div className="text-4xl sm:text-5xl font-black font-mono text-cyber-cyan cyan-glow-text">
                            <Counter to={43} duration={2} />
                        </div>
                        <div className="text-xs font-mono text-slate-300 uppercase tracking-widest">Grade de Libertate (DoF)</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-4xl sm:text-5xl font-black font-mono text-cyber-cyan cyan-glow-text">
                            <Counter to={275} duration={2} />
                        </div>
                        <div className="text-xs font-mono text-slate-300 uppercase tracking-widest">TOPS Procesare Neurală</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-4xl sm:text-5xl font-black font-mono text-cyber-cyan cyan-glow-text">
                            <Counter to={4} duration={2} />
                        </div>
                        <div className="text-xs font-mono text-slate-300 uppercase tracking-widest">Ore Autonomie (Baterie Swap)</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-4xl sm:text-5xl font-black font-mono text-cyber-cyan cyan-glow-text">
                            <Counter to={30} duration={2} />
                        </div>
                        <div className="text-xs font-mono text-slate-300 uppercase tracking-widest">KG Încărcătură Max. (Payload)</div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  )
}
