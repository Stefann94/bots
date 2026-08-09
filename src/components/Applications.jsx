import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

export default function Applications() {
  // Același prag ca înainte, fără bucla care producea tremuratul la margine.
  const [refSectiune, stareSectiune] = useReveal({ margin: '-20% 0px -20% 0px' })

  const [activeTab, setActiveTab] = useState('manufacturing')
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  const tabs = [
    { id: 'manufacturing', icon: 'fa-industry', label: 'Producție' },
    { id: 'logistics', icon: 'fa-boxes-packing', label: 'Logistică & Depozite' },
    { id: 'research', icon: 'fa-flask', label: 'Cercetare & Laborator' },
    { id: 'hazardous', icon: 'fa-triangle-exclamation', label: 'Inspecție Medii Periculoase' },
  ]
  const tabIds = tabs.map(t => t.id)

  useEffect(() => {
    if (isHovered) return

    const intervalTime = 50 // ms
    const totalTime = 4000 // 4 seconds
    const increment = (intervalTime / totalTime) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const currentIndex = tabIds.indexOf(activeTab)
          const nextIndex = (currentIndex + 1) % tabIds.length
          setActiveTab(tabIds[nextIndex])
          return 0
        }
        return prev + increment
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [activeTab, isHovered, tabIds])

  const handleTabClick = (id) => {
    setActiveTab(id)
    setProgress(0)
  }

  const tabContents = {
    manufacturing: {
      title: 'Asamblare Automată de Precizie',
      desc: 'Roboții noștri se integrează perfect în liniile de producție existente, lucrând în siguranță alături de angajați. Pot opera unelte standard, manipula piese complexe și efectua controlul calității (QA) fără a necesita modificări ale infrastructurii din fabrică.',
      points: [
        'Precizie de 99.8% la manipularea și fixarea componentelor de mici dimensiuni.',
        'Eficiență maximă prin operare continuă 24/7 și sisteme de schimbare rapidă a bateriei.'
      ],
      image: '/images/fabrica.webp'
    },
    logistics: {
      title: 'Logistică & Sortare Autonomă',
      desc: 'Optimizarea depozitelor devine extrem de simplă. Bipedezii pot prelua, sorta și muta pachete grele de până la 30kg. Navighează autonom printre rafturi și evită dinamic stivuitoarele sau personalul uman.',
      points: [
        'Integrare software directă cu sistemele existente de management (WMS / ERP).',
        'Senzori avansați pentru evitarea obstacolelor în medii extrem de aglomerate.'
      ],
      image: '/images/logistica.webp'
    },
    research: {
      title: 'Platformă Avansată pentru Cercetare',
      desc: 'Oferim acces complet la hardware pentru laboratoare și universități. Prin SDK-ul nostru deschis, cercetătorii pot testa direct pe robot noi algoritmi de Inteligență Artificială, Machine Learning sau locomoție.',
      points: [
        'Compatibilitate nativă cu mediile de simulare NVIDIA Isaac Sim și Mujoco.',
        'Control direct (low-level) al cuplului pentru fiecare articulație în parte.'
      ],
      image: '/images/cercetare.webp'
    },
    hazardous: {
      title: 'Inspecție în Medii Periculoase',
      desc: 'Protejăm viețile umane trimițând roboți în mediile cu risc extrem (centrale nucleare, platforme offshore, rafinării). Aceștia pot efectua scanări termice, citi contoare sau verifica scurgeri de gaze toxice.',
      points: [
        'Construcție robustă, complet sigilată la apă și praf (Standard IP67).',
        'Versiuni speciale certificate împotriva exploziilor pentru industria chimică.'
      ],
      image: '/images/inspectii.webp'
    }
  }

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25
      }
    }
  }

  // Scanner Wipe Effect for Title
  const titleScanner = {
    hidden: { opacity: 0, clipPath: "inset(0% 50% 0% 50%)", scale: 0.95 },
    visible: { 
      opacity: 1, 
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } 
    }
  }

  const tabsFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  // Vertical Laser Scanner Wipe for the Main Card
  const cardScanner = {
    hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", scale: 1.05 },
    visible: { 
      opacity: 1, 
      clipPath: "inset(0% 0% 0% 0%)", 
      scale: 1,
      transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } 
    }
  }

  return (
    <section id="applications" className="py-24 relative">
        <motion.div 
            className="relative z-[20] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial="hidden"
            ref={refSectiune}
            animate={stareSectiune}
            variants={sectionVariants}
        >
            <motion.div variants={titleScanner} className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Aplicații Industriale (Enterprise)
                </h2>
                <p className="text-slate-400 text-base mt-4">
                    De la podeaua fabricii până la manipularea materialelor periculoase, platforma noastră înlocuiește infrastructura rigidă cu automatizare adaptivă.
                </p>
            </motion.div>

            <motion.div variants={tabsFade} className="flex justify-center overflow-x-auto gap-2 mb-8 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all border ${
                      activeTab === tab.id 
                        ? 'bg-cyber-cyan text-navy-950 font-bold border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                        : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
                    }`}
                  >
                      <i className={`fa-solid ${tab.icon} mr-2`}></i> {tab.label}
                  </button>
                ))}
            </motion.div>

            <motion.div 
              variants={cardScanner}
              className="glass-card rounded-2xl p-8 border border-cyber-cyan/20 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  >
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-4">{tabContents[activeTab].title}</h3>
                          <p className="text-slate-300 text-sm leading-relaxed">
                              {tabContents[activeTab].desc}
                          </p>
                          <ul className="space-y-3 mt-6 text-sm text-slate-400">
                              {tabContents[activeTab].points.map((pt, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <i className="fa-solid fa-check text-cyber-cyan mt-1"></i> 
                                  <span>{pt}</span>
                                </li>
                              ))}
                          </ul>
                      </div>
                      <div className="h-72 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                          <img 
                            src={tabContents[activeTab].image} 
                            alt={tabContents[activeTab].title} 
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-80 mix-blend-lighten"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                      </div>
                  </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Pagination / Progress Bars */}
            <motion.div variants={tabsFade} className="flex justify-center items-center gap-3 mt-8">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <div 
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id)}
                          className="h-1.5 w-12 sm:w-16 rounded-full bg-slate-800 overflow-hidden cursor-pointer"
                        >
                            <div 
                              className="h-full bg-cyber-cyan transition-all duration-75 ease-linear"
                              style={{ 
                                width: isActive ? `${progress}%` : '0%',
                              }}
                            ></div>
                        </div>
                    )
                })}
            </motion.div>
        </motion.div>
    </section>
  )
}
