import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    {
      title: 'Locomoție Dinamică',
      desc: 'Controler pe bază de Reinforcement Learning pentru echilibru dinamic pe teren accidentat, scări și suprafețe alunecoase.',
      icon: 'fa-person-walking',
      color: 'cyber-cyan'
    },
    {
      title: 'Viziune Spațială AI',
      desc: 'Cartografiere 3D NeRF și SLAM în timp real, propulsată de senzori de adâncime multi-cameră și LiDAR solid-state.',
      icon: 'fa-eye',
      color: 'cyan-400'
    },
    {
      title: 'Manipulare Dexteră',
      desc: 'Senzori tactili de înaltă sensibilitate cu feedback de cuplu și forță, asamblare la nivel micro și manipulare fragilă.',
      icon: 'fa-hand-holding-cube',
      color: 'blue-400'
    },
    {
      title: 'Motor Neural Edge',
      desc: 'Procesare hardware 275 TOPS on-board pentru planificare traiectorii zero-latency și execuție vocală.',
      icon: 'fa-brain',
      color: 'indigo-400'
    }
  ]

  return (
    <section id="technology" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
                <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest">INOVAȚII CORE</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                    Arhitectură de Subsisteme Avansată
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2">
                    Fuziune software-hardware integrată ce oferă agilitate, precizie și autonomie cognitivă fără precedent.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`glass-card rounded-2xl p-6 glass-card-hover border-t-2 ${
                      item.color === 'cyber-cyan' ? 'border-t-cyber-cyan' :
                      item.color === 'cyan-400' ? 'border-t-cyan-400' :
                      item.color === 'blue-400' ? 'border-t-blue-400' : 'border-t-indigo-400'
                    }`}
                  >
                      <div className={`w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/40 flex items-center justify-center text-${item.color} text-xl mb-4`}>
                          <i className={`fa-solid ${item.icon}`}></i>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          {item.desc}
                      </p>
                  </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}
