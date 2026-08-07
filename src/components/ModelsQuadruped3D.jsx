import { useState } from 'react'
import { motion } from 'framer-motion'
import QuadrupedCanvas from './QuadrupedCanvas'

export default function ModelsQuadruped3D() {
    const [robotColor, setRobotColor] = useState('#ffffff')
    const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)

    const colors = [
        { name: 'Glossy White', value: '#ffffff' },
        { name: 'Sky Blue', value: '#0ea5e9' },
        { name: 'Crimson Red', value: '#dc2626' },
        { name: 'Neon Gold', value: '#fbbf24' },
        { name: 'Toxic Green', value: '#10b981' },
        { name: 'Deep Sapphire', value: '#2563eb' },
        { name: 'Amethyst Purple', value: '#8b5cf6' },
        { name: 'Sunset Orange', value: '#f97316' }
    ]

    return (
        <section className="w-full relative z-30 py-20 overflow-hidden">
            {/* Intro Titlu - Despărțitor de Capitol */}
            <div className="w-full text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-6">
                        Configurator Tactic 3D
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 leading-tight">
                        Personalizează <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Flota</span>
                    </h2>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* 1. Left Text Section (Glass Card) */}
                <div className="lg:col-span-4 flex flex-col justify-center z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full bg-[#0B1221]/95 backdrop-blur-2xl border border-cyber-cyan/30 p-8 md:p-10 rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.9)] overflow-hidden group"
                    >
                        {/* Ambient Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center gap-3 mb-6">
                            <i className="fa-solid fa-layer-group text-cyber-cyan animate-pulse text-xl"></i>
                            <h3 className="text-white font-mono text-lg tracking-widest uppercase">Specificații Blindaj</h3>
                        </div>
                        
                        <p className="text-slate-300 font-light text-base mb-8 leading-relaxed">
                            Fiecare misiune are propriile cerințe de camuflaj și vizibilitate. 
                            Interacționează cu modelul tridimensional pentru a analiza blindajul și alege 
                            vopseaua industrială potrivită pentru următoarea implementare tactică.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4 text-sm text-slate-300 bg-navy-950/80 border border-slate-700 p-3 rounded-xl hover:border-cyber-cyan/50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/30">
                                    <i className="fa-solid fa-hand-pointer text-cyber-cyan text-xs"></i>
                                </div>
                                <span className="font-mono tracking-wider">TRAGE = ROTIRE 360°</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-300 bg-navy-950/80 border border-slate-700 p-3 rounded-xl hover:border-cyber-cyan/50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/30">
                                    <i className="fa-solid fa-magnifying-glass text-cyber-cyan text-xs"></i>
                                </div>
                                <span className="font-mono tracking-wider">SCROLL = ZOOM OPTIC</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Right 3D Interactive Container */}
                <div className="lg:col-span-8 relative z-[110] w-full">
                    {/* Floating ambient blur */}
                    <div className="absolute -bottom-20 -right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/15 blur-[80px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
                    
                    <div className="glass-card rounded-2xl p-2 relative overflow-hidden border border-cyber-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] z-[110]">
                        
                        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                            <div className="flex items-center gap-2 px-3 py-1 bg-navy-950/80 rounded border border-cyber-cyan/30 text-[11px] font-mono text-cyber-cyan backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>MODEL: UNITREE B2 INDUSTRIAL</span>
                            </div>
                            
                            <div className="relative pointer-events-auto">
                                {/* Butonul principal care deschide dropdown-ul */}
                                <button 
                                    onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
                                    className="flex items-center gap-2 bg-navy-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-slate-700 hover:border-cyber-cyan transition-colors"
                                >
                                    <span className="text-[10px] text-slate-400 font-mono">VOPSEA:</span>
                                    <span className="w-3 h-3 rounded-full border border-slate-500 shadow-[0_0_5px_rgba(0,0,0,0.5)]" style={{ backgroundColor: robotColor }}></span>
                                    <i className={`fa-solid fa-chevron-down text-[10px] text-slate-500 transition-transform ${isColorMenuOpen ? 'rotate-180' : ''}`}></i>
                                </button>

                                {/* Meniul Dropdown (Grid cu culori) */}
                                {isColorMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-navy-950/95 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-md z-50 grid grid-cols-4 gap-3 animate-in fade-in zoom-in duration-200">
                                        {colors.map(c => (
                                            <button 
                                                key={c.value}
                                                onClick={() => { setRobotColor(c.value); setIsColorMenuOpen(false); }}
                                                className={`w-6 h-6 mx-auto rounded-full border-2 transition-all hover:scale-125 ${robotColor === c.value ? 'border-cyber-cyan scale-125 shadow-[0_0_12px_rgba(0,240,255,0.6)]' : 'border-slate-600'}`}
                                                style={{ backgroundColor: c.value }}
                                                title={c.name}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full h-[500px] sm:h-[600px] rounded-xl relative cursor-grab active:cursor-grabbing bg-[#07132a]">
                            <QuadrupedCanvas robotColor={robotColor} />
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-between items-center gap-2 pointer-events-none text-[11px] font-mono text-slate-400 bg-navy-950/80 backdrop-blur-md p-2.5 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-4">
                                <span>ROT: <span className="text-cyber-cyan">MANUAL</span></span>
                                <span>LIDAR: <span className="text-emerald-400">ONLINE</span></span>
                            </div>
                            <div>BATTERY: <span className="text-cyber-cyan">100%</span></div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
