import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const environments = [
    { 
        id: 'rubble', 
        label: 'Teren Accidentat', 
        desc: 'Simulare obstacole neregulate și moloz.',
        img: '/images/env_rubble.webp', 
        stats: { trac: '92%', susp: 'Adaptive', mode: 'Off-Road' }, 
        theme: 'from-orange-500/20 to-transparent',
        accent: 'text-orange-500',
        border: 'border-orange-500/50'
    },
    { 
        id: 'snow', 
        label: 'Condiții Extreme', 
        desc: 'Simulare gheață, zăpadă și aderență scăzută.',
        img: '/images/terrain_background.webp', 
        stats: { trac: '85%', susp: 'Stiff', mode: 'Winter' }, 
        theme: 'from-blue-500/20 to-transparent',
        accent: 'text-blue-400',
        border: 'border-blue-400/50'
    },
    { 
        id: 'stairs', 
        label: 'Mediu Industrial', 
        desc: 'Navigare spații înguste, scări și structuri metalice.',
        img: '/images/quad_lidar.webp', 
        stats: { trac: '98%', susp: 'Climbing', mode: 'Inspection' }, 
        theme: 'from-yellow-500/20 to-transparent',
        accent: 'text-yellow-500',
        border: 'border-yellow-500/50'
    },
    { 
        id: 'asphalt', 
        label: 'Pistă de Viteză', 
        desc: 'Suprafață plană pentru accelerație maximă.',
        img: '/images/quad_speed.webp', 
        stats: { trac: '100%', susp: 'Aero', mode: 'Sprint' }, 
        theme: 'from-cyber-cyan/20 to-transparent',
        accent: 'text-cyber-cyan',
        border: 'border-cyber-cyan/50'
    },
]

export default function ModelsQuadrupedEnvironment() {
    const [activeIdx, setActiveIdx] = useState(0)
    const [isShaking, setIsShaking] = useState(false)
    const activeEnv = environments[activeIdx]

    const handleEnvChange = (idx) => {
        if (idx === activeIdx) return;
        setActiveIdx(idx);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
    }

    return (
        <section className="w-full relative z-30 py-32 overflow-hidden">
            
            {/* Titlu Secțiune */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 mb-16 text-center md:text-left">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-4">
                        Simulator Tactic
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                        Environment <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">Matrix</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg font-light">
                        Testează răspunsul suspensiei și algoritmii de echilibru în timp real, supunând robotul la diverse medii virtuale.
                    </p>
                </motion.div>
            </div>

            {/* Layout Principal */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-8">
                
                {/* 1. Consola de Comandă (Stânga) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    {environments.map((env, idx) => {
                        const isActive = idx === activeIdx;
                        return (
                            <button 
                                key={env.id}
                                onClick={() => handleEnvChange(idx)}
                                className={`group relative p-6 text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isActive 
                                        ? `bg-[#0F172A] ${env.border} shadow-[0_0_30px_rgba(0,0,0,0.5)]` 
                                        : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-white/5'
                                }`}
                            >
                                {/* Active Background Glow */}
                                {isActive && (
                                    <div className={`absolute inset-0 bg-gradient-to-r ${env.theme} opacity-50`} />
                                )}

                                <div className="relative z-10">
                                    <div className={`text-xs font-mono tracking-[0.2em] mb-2 uppercase ${isActive ? env.accent : 'text-slate-500'}`}>
                                        Protocol 0{idx + 1}
                                    </div>
                                    <h4 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                        {env.label}
                                    </h4>
                                    <p className={`text-sm font-light transition-colors ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                                        {env.desc}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* 2. Simulatorul (Dreapta) */}
                <div className="w-full lg:w-2/3 relative h-[600px] lg:h-auto rounded-[32px] overflow-hidden border border-white/10 bg-[#020617] shadow-2xl flex items-center justify-center">
                    
                    {/* Camera Shake Wrapper */}
                    <motion.div 
                        className="absolute inset-0 w-full h-full"
                        animate={isShaking ? { x: [-15, 15, -10, 10, -5, 5, 0], y: [-10, 10, -10, 10, -5, 5, 0] } : { x: 0, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={activeEnv.id}
                                src={activeEnv.img}
                                alt={activeEnv.label}
                                initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full h-full object-cover opacity-80"
                            />
                        </AnimatePresence>
                    </motion.div>

                    {/* Glitch Overlay on Shake */}
                    {isShaking && (
                        <div className="absolute inset-0 bg-white/10 mix-blend-overlay animate-pulse" />
                    )}

                    {/* HUD / Statistici */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">Status Sistem</div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full animate-pulse bg-current ${activeEnv.accent}`} />
                                <span className={`text-sm font-bold uppercase ${activeEnv.accent}`}>Online</span>
                            </div>
                        </div>

                        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col gap-3 text-right">
                            <div>
                                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">Aderență (Trac)</div>
                                <div className="text-white font-mono text-lg">{activeEnv.stats.trac}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">Suspensie</div>
                                <div className="text-white font-mono text-lg uppercase">{activeEnv.stats.susp}</div>
                            </div>
                        </div>
                    </div>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.webp')] opacity-20 mix-blend-overlay" />
                    
                    {/* Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                    {/* Numele Mediului Jos */}
                    <div className="absolute bottom-8 left-8 pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeEnv.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h3 className={`text-5xl font-black uppercase tracking-tighter ${activeEnv.accent} drop-shadow-2xl`}>
                                    {activeEnv.mode}
                                </h3>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    )
}
