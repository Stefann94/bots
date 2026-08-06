import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Applications() {
  const [activeTab, setActiveTab] = useState('manufacturing')

  const tabs = [
    { id: 'manufacturing', icon: 'fa-industry', label: 'Producție' },
    { id: 'logistics', icon: 'fa-boxes-packing', label: 'Logistică & Depozite' },
    { id: 'research', icon: 'fa-flask', label: 'Cercetare & Laborator' },
    { id: 'hazardous', icon: 'fa-triangle-exclamation', label: 'Inspecție Medii Periculoase' },
  ]

  const tabContents = {
    manufacturing: {
      title: 'Asamblare Automată de Precizie',
      tag: 'ASAMBLARE',
      desc: 'Humanoizii Unitree & AgiBot se integrează perfect în liniile de asamblare auto alături de personalul uman. Operează unelte, preiau componente și efectuează sarcini QA fără infrastructură fixă.',
      points: [
        'Rată de precizie de 99.8% la instalarea micro-șuruburilor',
        'Operare 24/7 continuă cu schimbare rapidă a bateriei'
      ],
      icon: 'fa-industry',
      facility: 'FACILITY ID: DETROIT-PLANT-04'
    },
    logistics: {
      title: 'Sortare & Paletizare Autonomă',
      tag: 'FULFILLMENT & FREIGHT',
      desc: 'Capabili să ridice încărcături de până la 30kg, navigând pe culoare aglomerate de depozit, încărcând camioane și organizând inventarul greu cu control adaptiv al forței.',
      points: [
        'Integrare nativă completă ROS2 & ERP',
        'Evitarea obstacolelor în zone umane dinamice'
      ],
      icon: 'fa-boxes-packing',
      facility: 'FACILITY ID: LOGISTICS-HUB-FRANKFURT'
    },
    research: {
      title: 'Cercetare Open-Source AI & Robotică',
      tag: 'ACADEMIE & R&D ENTERPRISE',
      desc: 'Acces SDK complet cu API-uri Python și C++, suport de simulare Mujoco și Isaac Gym, permițând cercetătorilor să testeze noi modele RL instantaneu.',
      points: [
        'Pipeline nativ NVIDIA Isaac Sim',
        'API pentru control low-level al cuplului'
      ],
      icon: 'fa-flask',
      facility: 'LAB ID: ETH-ZURICH-ROBOTICS'
    },
    hazardous: {
      title: 'Inspecție la Distanță în Zone de Risc',
      tag: 'INFRASTRUCTURĂ CHIMICĂ & ENERGIE',
      desc: 'Înlocuirea operatorilor umani în zone de risc crescut, centrale nucleare, platforme offshore pentru scanare termică și verificări structurale.',
      points: [
        'Rezistență la praf și apă rating IP67',
        'Variante certificate ATEX anti-explozie'
      ],
      icon: 'fa-triangle-exclamation',
      facility: 'FACILITY ID: OFFSHORE-RIG-NORTH-SEA'
    }
  }

  return (
    <section id="applications" className="py-24 relative bg-navy-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Aplicații Industriale (Enterprise)
                </h2>
                <p className="text-slate-400 text-base mt-4">
                    De la podeaua fabricii până la manipularea materialelor periculoase, platforma noastră înlocuiește infrastructura rigidă cu automatizare adaptivă.
                </p>
            </div>

            <div className="flex justify-center overflow-x-auto gap-2 mb-8 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all border ${
                      activeTab === tab.id 
                        ? 'bg-cyber-cyan text-navy-950 font-bold border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                        : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
                    }`}
                  >
                      <i className={`fa-solid ${tab.icon} mr-2`}></i> {tab.label}
                  </button>
                ))}
            </div>

            <div className="glass-card rounded-2xl p-8 border border-cyber-cyan/20 overflow-hidden">
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
                          <span className="text-xs font-mono text-cyber-cyan uppercase">{tabContents[activeTab].tag}</span>
                          <h3 className="text-2xl font-bold text-white mt-1">{tabContents[activeTab].title}</h3>
                          <p className="text-slate-300 text-sm mt-4 leading-relaxed">
                              {tabContents[activeTab].desc}
                          </p>
                          <ul className="space-y-2 mt-6 text-sm text-slate-400">
                              {tabContents[activeTab].points.map((pt, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <i className="fa-solid fa-circle-check text-cyber-cyan"></i> {pt}
                                </li>
                              ))}
                          </ul>
                      </div>
                      <div className="h-64 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                          <i className={`fa-solid ${tabContents[activeTab].icon} text-8xl text-cyber-cyan/20`}></i>
                          <span className="absolute bottom-4 left-4 text-xs font-mono text-slate-400">{tabContents[activeTab].facility}</span>
                      </div>
                  </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </section>
  )
}
