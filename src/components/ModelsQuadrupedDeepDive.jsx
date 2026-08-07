import { motion } from 'framer-motion'

const features = [
    {
        tag: "AMPRENTĂ 4D",
        title: "LIVOX Mid-360 LiDAR",
        desc: "Sistem omnidirecțional de mapare care generează o replică digitală a mediului, detectând obstacole de la firul ierbii până la 50 de metri distanță.",
        img: "/images/dd_lidar.png",
        bullets: [
            "Câmp vizual sferic 360° x 59°",
            "Milioane de puncte procesate pe secundă",
            "Imunitate totală la întuneric beznă"
        ]
    },
    {
        tag: "INTELIGENȚĂ NEURALĂ",
        title: "Procesor AI Core",
        desc: "Creierul central care analizează datele senzoriale și calculează traiectoria și echilibrul pentru fiecare picior în parte, la nivel de milisecundă.",
        img: "/images/dd_cpu.png",
        bullets: [
            "Peste 30 Trilioane de Operații pe secundă",
            "Învățare prin Reinforcement Learning",
            "Corecție instantanee a posturii"
        ]
    },
    {
        tag: "BIOMECANICĂ TITAN-CARBON",
        title: "Actuatoare 120Nm",
        desc: "Motoare electrice ultra-ușoare dezvoltate in-house, capabile să elibereze explozii masive de putere pentru sărituri și transportul de sarcini grele.",
        img: "/images/dd_actuator.png",
        bullets: [
            "Densitate record a puterii raportat la masă",
            "Răcire activă integrată cu cupru",
            "Rezistență extremă la forțele de impact"
        ]
    },
    {
        tag: "INSPECȚIE INDUSTRIALĂ",
        title: "Sistem Dual Vision",
        desc: "Robotul este echipat cu camere termale și optice suprapuse pentru a depista scurgeri de gaz, supraîncălziri sau pentru misiuni de salvare.",
        img: "/images/dd_thermal.png",
        bullets: [
            "Detecție termică de înaltă rezoluție",
            "Streaming video 4K live către operator",
            "Zoom optic fără pierdere de calitate"
        ]
    }
]

export default function ModelsQuadrupedDeepDive() {
    return (
        <section className="w-full relative z-30">
            
            {/* Intro Titlu */}
            <div className="w-full text-center py-20 bg-transparent border-y border-white/5">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-6">
                        Anatomie Digitală
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                        Tehnologie de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Precizie</span>
                    </h2>
                </motion.div>
            </div>

            {/* Deep Dive Sticky Sections (Pinned Card Layout) */}
            <div className="w-full px-4 md:px-10 pb-32 max-w-7xl mx-auto">
                {features.map((feature, idx) => {
                    const isEven = idx % 2 === 0;
                    
                    return (
                        <div key={idx} className="relative h-[120vh] w-full mb-32">
                            
                            {/* The Pinned Image Card (Smaller & Aligned) */}
                            <div className="sticky top-[25vh] w-full flex pointer-events-none">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    viewport={{ once: false, amount: 0.4 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`relative h-[50vh] w-full lg:w-[55%] overflow-hidden rounded-[30px] shadow-[0_0_50px_rgba(0,240,255,0.1)] border border-cyber-cyan/20 bg-[#020617] pointer-events-auto ${isEven ? 'mr-auto' : 'ml-auto'}`}
                                >
                                    <img 
                                        src={feature.img} 
                                        alt={feature.title}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    {/* Gradient subtil pentru contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                                </motion.div>
                            </div>

                            {/* The Scrolling Text Box Container */}
                            <div className={`absolute inset-0 pointer-events-none flex flex-col justify-center px-4 lg:px-0 ${isEven ? 'items-end' : 'items-start'}`}>
                                
                                {/* Fereastra de sticlă - Overlapping */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`pointer-events-auto w-full max-w-2xl bg-[#0B1221]/95 backdrop-blur-2xl border border-cyber-cyan/30 p-10 md:p-12 rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.9)] ${isEven ? 'lg:-translate-x-12' : 'lg:translate-x-12'} z-10 relative overflow-hidden group`}
                                >
                                    {/* Un mic accent luminos ambiental în casetă */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="text-cyber-cyan text-sm font-mono uppercase tracking-[0.2em] mb-4">
                                        {feature.tag}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                                        {feature.desc}
                                    </p>
                                    
                                    <ul className="space-y-4">
                                        {feature.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start text-slate-300 font-light text-base">
                                                <span className="text-cyber-cyan mr-4 font-mono">→</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                                
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
