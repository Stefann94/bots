import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function RobotSeries() {
  const [flippedH1, setFlippedH1] = useState(false)
  const [flippedG1, setFlippedG1] = useState(false)

  return (
    <section id="unitree-series" className="py-24 relative bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Seria Umanoidă Unitree
                </h2>
                <p className="text-slate-400 text-base mt-3">
                    Roboți bipezi cu echilibrare dinamică de mare viteză, proiectați pentru mobilitate agilă, capacitate de transport și adaptabilitate în medii accidentate.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Unitree H1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{ perspective: 1000 }}
                  className="h-full min-h-[520px]"
                >
                    <AnimatePresence mode="wait">
                        {!flippedH1 ? (
                            <motion.div
                                key="front"
                                initial={{ rotateY: 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="glass-card rounded-2xl p-8 glass-card-hover relative group overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-2xl group-hover:bg-cyber-cyan/20 transition-all"></div>
                                
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white">Unitree H1 Evolution</h3>
                                </div>

                                <div className="w-full h-56 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center relative overflow-hidden mb-6 shrink-0">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img src="/images/h1_real.png" alt="Unitree H1" className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-lighten" />
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] font-mono text-slate-400 bg-navy-950/80 p-2 rounded">
                                        <span>ÎNĂLȚIME: 180 CM</span>
                                        <span>GREUTATE: 47 KG</span>
                                        <span>CUPLU: 360 N.m</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <div className="text-white font-bold font-mono text-lg">3.3 m/s</div>
                                        <div className="text-xs text-slate-400 mt-1">Viteză maximă de deplasare</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <div className="text-white font-bold font-mono text-lg">Senzor LiDAR 3D</div>
                                        <div className="text-xs text-slate-400 mt-1">Recunoaștere spațială la 360°</div>
                                    </div>
                                </div>

                                <div className="mt-auto flex justify-center">
                                    <button onClick={() => setFlippedH1(true)} className="px-6 py-2 rounded-full border border-cyber-cyan/30 text-cyber-cyan text-sm font-mono hover:bg-cyber-cyan/10 transition-colors w-full sm:w-auto">
                                        Citește mai mult
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="back"
                                initial={{ rotateY: -90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="glass-card rounded-2xl p-8 glass-card-hover relative group overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-2xl group-hover:bg-cyber-cyan/20 transition-all"></div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white">Unitree H1 - Detalii Tehnice</h3>
                                </div>
                                <div className="flex-1 text-slate-300 space-y-4 text-sm">
                                    <p>• <strong>Motorizare de Top:</strong> Articulațiile dezvoltă un cuplu impresionant de 360 N.m, permițând manevre acrobatice și o stabilitate excepțională pe teren accidentat.</p>
                                    <p>• <strong>Autonomie Extinsă:</strong> Bateria interschimbabilă de 864Wh suportă schimbare rapidă, asigurând o durată lungă de operare în misiuni critice.</p>
                                    <p>• <strong>Navigație Inteligentă:</strong> Combinația dintre LiDAR-ul 3D și camerele de adâncime creează o hartă precisă a mediului în timp real, permițând evitarea obstacolelor automat.</p>
                                    <p>• <strong>Echilibru Dinamic:</strong> Algoritmii avansați de Inteligență Artificială permit menținerea echilibrului perfect chiar și la impacturi fizice puternice externe.</p>
                                </div>
                                <div className="mt-auto flex justify-center pt-6">
                                    <button onClick={() => setFlippedH1(false)} className="px-6 py-2 rounded-full border border-slate-600 text-slate-300 text-sm font-mono hover:bg-slate-700 transition-colors w-full sm:w-auto">
                                        Înapoi
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Unitree G1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ perspective: 1000 }}
                  className="h-full min-h-[520px]"
                >
                    <AnimatePresence mode="wait">
                        {!flippedG1 ? (
                            <motion.div
                                key="front"
                                initial={{ rotateY: 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="glass-card rounded-2xl p-8 glass-card-hover relative group overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white">Unitree G1 Agent</h3>
                                </div>

                                <div className="w-full h-56 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center relative overflow-hidden mb-6 shrink-0">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img src="/images/g1_real.png" alt="Unitree G1" className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-lighten" />
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] font-mono text-slate-400 bg-navy-950/80 p-2 rounded">
                                        <span>ÎNĂLȚIME: 127 CM</span>
                                        <span>GREUTATE: 35 KG</span>
                                        <span>ARTICULAȚII: 23-43</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <div className="text-white font-bold font-mono text-lg">2 m/s</div>
                                        <div className="text-xs text-slate-400 mt-1">Viteză de deplasare</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <div className="text-white font-bold font-mono text-lg">Control Tactil</div>
                                        <div className="text-xs text-slate-400 mt-1">Precizie și forță controlată</div>
                                    </div>
                                </div>

                                <div className="mt-auto flex justify-center">
                                    <button onClick={() => setFlippedG1(true)} className="px-6 py-2 rounded-full border border-sky-400/30 text-sky-400 text-sm font-mono hover:bg-sky-400/10 transition-colors w-full sm:w-auto">
                                        Citește mai mult
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="back"
                                initial={{ rotateY: -90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="glass-card rounded-2xl p-8 glass-card-hover relative group overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white">Unitree G1 - Detalii Tehnice</h3>
                                </div>
                                <div className="flex-1 text-slate-300 space-y-4 text-sm">
                                    <p>• <strong>Design Compact:</strong> Greutatea redusă de doar 35kg și structura flexibilă îl fac ideal pentru operarea în spații interioare complexe și laboratoare.</p>
                                    <p>• <strong>Dexteritate Umană:</strong> Mâinile bionice cu control precis al forței permit manipularea obiectelor delicate (cum ar fi spargerea unui ou sau prinderea unui pahar).</p>
                                    <p>• <strong>Creier Inteligent (AI):</strong> Funcționează bazat pe rețele neurale de Imitation Learning și Reinforcement Learning, învățând noi mișcări în medii simulate.</p>
                                    <p>• <strong>Pliere Flexibilă:</strong> Poate fi pliat într-o formă extrem de compactă, făcându-l ușor de transportat și depozitat.</p>
                                </div>
                                <div className="mt-auto flex justify-center pt-6">
                                    <button onClick={() => setFlippedG1(false)} className="px-6 py-2 rounded-full border border-slate-600 text-slate-300 text-sm font-mono hover:bg-slate-700 transition-colors w-full sm:w-auto">
                                        Înapoi
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    </section>
  )
}
