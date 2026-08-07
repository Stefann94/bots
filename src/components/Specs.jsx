import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

function Counter({ to, duration }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false })
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    if (isInView) {
      // Delay so it syncs with the container opening animation
      const timeout = setTimeout(() => {
        animate(count, to, { duration: duration, ease: "easeOut" })
      }, 500)
      return () => clearTimeout(timeout)
    } else {
      count.set(0)
    }
  }, [isInView, to, duration, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
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

  // Containerul se deschide de la centru spre exterior
  const containerVariants = {
    hidden: { opacity: 0, clipPath: "inset(0% 50% 0% 50%)" },
    visible: { 
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.15,
            delayChildren: 0.4
        }
    }
  }

  // Fiecare element intră ca un "Glitch/Skew" cybernetic
  const itemVariants = {
    hidden: { opacity: 0, x: 60, skewX: -25 },
    visible: { 
        opacity: 1, 
        x: 0, 
        skewX: 0,
        transition: { type: "spring", stiffness: 120, damping: 12 }
    }
  }

  return (
    <section id="specs" className="py-24 relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-950 pointer-events-none"></div> 
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              variants={containerVariants}
              className="glass-card rounded-3xl p-10 border border-cyber-cyan/30 radial-glow-center relative z-10 shadow-2xl shadow-cyan-900/10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
                    {specs.map((spec, index) => (
                      <motion.div variants={itemVariants} key={index} className="flex flex-col items-center justify-center space-y-3 group">
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
                      </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
  )
}
