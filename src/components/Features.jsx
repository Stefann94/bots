import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    {
      title: 'Locomoție Dinamică',
      desc: 'Sistem de echilibru bazat pe algoritmi avansați care permit deplasarea stabilă pe teren accidentat, scări sau suprafețe neregulate, reacționând instantaneu la perturbații.',
      icon: 'fa-person-walking',
      color: 'cyber-cyan'
    },
    {
      title: 'Percepție Spațială',
      desc: 'Cartografiere 3D în timp real a mediului folosind camere de adâncime și senzori LiDAR. Robotul recunoaște obstacolele și își calculează singur cel mai sigur traseu.',
      icon: 'fa-eye',
      color: 'cyan-400'
    },
    {
      title: 'Manipulare Dexteră',
      desc: 'Mâini bionice dotate cu senzori de forță, capabile să manipuleze obiecte fragile fără a le sparge și să folosească unelte umane standard cu precizie milimetrică.',
      icon: 'fa-hand-holding',
      color: 'blue-400'
    },
    {
      title: 'Procesare Locală',
      desc: 'Capacitate de procesare integrată direct în corpul robotului, permițând luarea deciziilor și procesarea comenzilor vocale în fracțiuni de secundă, fără conexiune la internet.',
      icon: 'fa-brain',
      color: 'indigo-400'
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 60, damping: 14 } 
    }
  }

  // Mecanic, swing-down effect (ca o trapă care cade) - Fără blur
  const cardVariants = {
    hidden: { 
        opacity: 0, 
        rotateX: -90, 
        transformOrigin: "top",
        y: -20
    },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      y: 0,
      transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 12,
          mass: 1.2
      } 
    }
  }

  return (
    <section id="technology" className="py-24 relative overflow-hidden">
        <motion.div 
            className="relative z-[20] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{ perspective: 1500 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30% 0px -15% 0px" }}
            variants={containerVariants}
        >
            <motion.div variants={textVariants} className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                    Arhitectură de Subsisteme Avansată
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2">
                    Fuziune software-hardware integrată ce oferă agilitate, precizie și autonomie cognitivă fără precedent.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={cardVariants}
                    className={`glass-card rounded-2xl p-6 glass-card-hover border-t-2 border-b-2 transform-gpu ${
                      item.color === 'cyber-cyan' ? 'border-t-cyber-cyan border-b-cyber-cyan' :
                      item.color === 'cyan-400' ? 'border-t-cyan-400 border-b-cyan-400' :
                      item.color === 'blue-400' ? 'border-t-blue-400 border-b-blue-400' : 'border-t-indigo-400 border-b-indigo-400'
                    }`}
                  >
                      <div className={`w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/40 flex items-center justify-center text-${item.color} text-xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                          <i className={`fa-solid ${item.icon}`}></i>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          {item.desc}
                      </p>
                  </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
  )
}
