import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeuralNode = ({ x, y, icon, label, color, isActive, onHover, onLeave, delay = 0 }) => (
    <motion.div
        className="absolute z-20 flex flex-col items-center justify-center cursor-pointer group"
        style={{ left: x, top: y, x: '-50%', y: '-50%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay, type: "spring" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
    >
        {/* Glow behind node */}
        <motion.div 
            className={`absolute w-24 h-24 rounded-full blur-xl opacity-30 ${isActive ? 'opacity-70 scale-150' : 'group-hover:opacity-50'} transition-all duration-500`}
            style={{ backgroundColor: color }}
            animate={{ scale: isActive ? [1.2, 1.5, 1.2] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Node Body */}
        <div 
            className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all duration-500 ${isActive ? 'border-white bg-[#060D1F]/90 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'border-white/20 bg-[#060D1F]/50 hover:border-white/50'}`}
            style={{ borderColor: isActive ? color : undefined }}
        >
            <i className={`fa-solid ${icon} text-2xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
            
            {/* Spinning Ring */}
            {isActive && (
                <div className="absolute inset-[-8px] rounded-full border border-dashed border-white/50 animate-[spin_4s_linear_infinite]" style={{ borderColor: color }}></div>
            )}
        </div>

        {/* Node Label */}
        <div className={`mt-3 font-mono text-sm tracking-widest uppercase font-bold transition-all duration-300 ${isActive ? 'text-white drop-shadow-md' : 'text-slate-500 group-hover:text-slate-300'}`}>
            {label}
        </div>
    </motion.div>
);

const SynapticLine = ({ startX, startY, endX, endY, isActive, color }) => {
    // Generate an SVG path (a slight curve for a more organic look)
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 - 50; // Curve upwards slightly
    const path = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
            <motion.path
                d={path}
                fill="transparent"
                stroke={isActive ? color : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isActive ? 3 : 1}
                strokeDasharray={isActive ? "none" : "5, 5"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="transition-colors duration-500"
            />
            {/* Animated dot moving along the path */}
            {isActive && (
                <motion.circle r="3" fill="#fff" filter="blur(1px)">
                    <animateMotion dur="2s" repeatCount="indefinite" path={path} />
                </motion.circle>
            )}
        </svg>
    );
};

export default function ModelsAICoreSection() {
    const [activeNode, setActiveNode] = useState(null);

    const nodes = [
        {
            id: 'vision',
            label: "Viziune LiDAR",
            icon: "fa-satellite-dish",
            color: "#00F0FF", // Cyber Cyan
            pos: { x: "15%", y: "30%" },
            lineStart: { x: 150, y: 150 }, // Approximation for line start (relative to container)
            title: "Reconstrucție Spațială 4D",
            desc: "Camerele de adâncime și senzorii LiDAR ultra-wide generează în timp real un Point Cloud dens. Robotul nu doar vede obstacolele, ci le anticipează traiectoria fizică și calculează distanțele cu precizie milimetrică în medii fără lumină."
        },
        {
            id: 'brain',
            label: "Procesare LLM",
            icon: "fa-brain",
            color: "#A855F7", // Purple
            pos: { x: "85%", y: "30%" },
            lineStart: { x: 850, y: 150 },
            title: "Inteligență Conversațională",
            desc: "Integrare nativă cu modele LLM on-edge. Robotul ascultă comenzi vocale naturale în medii zgomotoase, le interpretează semantic și generează secvențe logice de acțiuni fără a necesita conexiune la un server cloud extern."
        },
        {
            id: 'locomotion',
            label: "Echilibru MPC",
            icon: "fa-person-running",
            color: "#10B981", // Emerald
            pos: { x: "50%", y: "90%" },
            lineStart: { x: 500, y: 450 },
            title: "Model Predictive Control",
            desc: "Creierul motor calculează proactiv centrul de masă la fiecare 1ms. Prin algoritmi complecși de fizică non-liniară, robotul își ajustează forța articulațiilor pentru a rezista la impacturi laterale severe și a naviga terenuri imposibile."
        }
    ];

    const activeNodeData = nodes.find(n => n.id === activeNode);

    return (
        <section className="relative w-full py-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
            {/* Titlu Secțiune */}
            <div className="text-center mb-8 relative z-30">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                        Nexus Brain
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                        Sistem <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyber-cyan drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">Neuronal</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Arhitectura AI descentralizată care dă viață roboților. Trei nuclee de procesare distincte fuzionate într-o singură conștiință digitală.
                    </p>
                </motion.div>
            </div>

            {/* Neural Sphere Container */}
            <div className="relative w-full max-w-5xl mx-auto h-[600px] mt-10">
                
                {/* Linii Sinaptice Centrale (SVG) */}
                {/* Nota: Coordonatele sunt vizibile pe Desktop. Pe mobile vom ascunde svg-ul pt claritate */}
                <div className="absolute inset-0 hidden md:block">
                    {/* Linia Viziune - Core */}
                    <SynapticLine startX={150} startY={180} endX={500} endY={300} isActive={activeNode === 'vision'} color="#00F0FF" />
                    {/* Linia LLM - Core */}
                    <SynapticLine startX={850} startY={180} endX={500} endY={300} isActive={activeNode === 'brain'} color="#A855F7" />
                    {/* Linia Locomotion - Core */}
                    <SynapticLine startX={500} startY={540} endX={500} endY={300} isActive={activeNode === 'locomotion'} color="#10B981" />
                </div>

                {/* Central Nexus Core */}
                <motion.div 
                    className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Pulsing Aura */}
                    <div className={`absolute w-64 h-64 rounded-full blur-[80px] opacity-40 transition-colors duration-1000 ${activeNodeData ? '' : 'bg-white/20'}`} style={{ backgroundColor: activeNodeData ? activeNodeData.color : undefined }}></div>
                    
                    {/* The Core Orb */}
                    <div className="relative w-40 h-40 rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-br from-[#060D1F] to-[#132247] shadow-[inset_0_0_50px_rgba(255,255,255,0.1)]"></div>
                        <div className="absolute inset-2 rounded-full border border-dashed border-white/30 animate-[spin_12s_linear_infinite]"></div>
                        <div className="absolute inset-6 rounded-full border border-dotted border-white/10 animate-[spin_8s_linear_infinite_reverse]"></div>
                        <i className={`fa-solid fa-microchip text-5xl relative z-10 transition-colors duration-700 ${activeNodeData ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : 'text-slate-400'}`}></i>
                    </div>
                </motion.div>

                {/* Satellite Nodes */}
                {nodes.map((node, i) => (
                    <NeuralNode 
                        key={node.id}
                        x={node.pos.x}
                        y={node.pos.y}
                        icon={node.icon}
                        label={node.label}
                        color={node.color}
                        isActive={activeNode === node.id}
                        onHover={() => setActiveNode(node.id)}
                        onLeave={() => setActiveNode(null)}
                        delay={0.2 + (i * 0.2)}
                    />
                ))}

                {/* Info Panel (Apare la Hover Peste Miezul Central) */}
                <AnimatePresence>
                    {activeNodeData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-96 bg-[#060D1F]/90 backdrop-blur-xl border-t border-b p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-none"
                            style={{ borderColor: activeNodeData.color }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeNodeData.color}20`, border: `1px solid ${activeNodeData.color}40` }}>
                                    <i className={`fa-solid ${activeNodeData.icon} text-2xl`} style={{ color: activeNodeData.color }}></i>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white leading-tight">{activeNodeData.title}</h4>
                                </div>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {activeNodeData.desc}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
            
            {/* Mobile Helper Text */}
            <div className="mt-8 text-center text-slate-500 text-sm font-mono flex items-center justify-center gap-2">
                <i className="fa-solid fa-hand-pointer animate-bounce"></i> Atinge nodurile pentru detalii
            </div>
        </section>
    );
}
