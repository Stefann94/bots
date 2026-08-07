import { useState, useEffect } from 'react';
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

const TrainingMatrixSection = () => {
    const [iterations, setIterations] = useState(4528190);

    useEffect(() => {
        const interval = setInterval(() => {
            setIterations(prev => prev + Math.floor(Math.random() * 42) + 10);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
    };

    return (
        <div className="w-full mt-32 mb-16 px-4 relative">
            {/* Background Glows for section */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
            
            <motion.div 
                className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex-1 space-y-6">
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                        Evoluție <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyber-cyan drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Sintetică</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed">
                        Înainte să facă primul pas fizic, roboții noștri trăiesc mii de vieți în <strong className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Simulatorul Matrix</strong>. Prin Reinforcement Learning, AI-ul testează miliarde de scenarii de fizică, învățând din greșeli într-un mediu virtual accelerat.
                    </motion.p>
                    <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-xl p-5 inline-block shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden group">
                        {/* Shimmer effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        
                        <div className="flex items-center gap-3 mb-2">
                            <i className="fa-solid fa-vr-cardboard text-cyber-cyan text-lg"></i>
                            <div className="text-xs text-cyber-cyan font-mono uppercase tracking-widest">Mediu Virtual: Isaac Sim</div>
                        </div>
                        <div className="text-slate-300 text-sm">Fizică rigidă 1:1. Simulare fricțiune, gravitație, vânt.</div>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="flex-1 w-full h-[400px] relative rounded-3xl border border-white/10 bg-[#02050A] overflow-hidden group flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.1)]"
                >
                    {/* Glowing Core Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>

                    {/* Grid Background with Fade Mask */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [perspective:1000px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]">
                        <motion.div 
                            className="w-full h-full border-t border-purple-500/40"
                            animate={{ rotateX: [60, 60], y: [0, 40] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    
                    {/* Iteration Counter */}
                    <div className="relative z-10 text-center bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:rounded-2xl before:border before:border-purple-500/20 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500">
                        <div className="flex justify-center mb-3">
                            <i className="fa-solid fa-infinity text-purple-400 text-2xl animate-pulse"></i>
                        </div>
                        <div className="text-purple-300 font-mono text-xs md:text-sm uppercase tracking-widest mb-2 opacity-80">Iterații de Antrenament</div>
                        <div className="font-mono text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            {iterations.toLocaleString()}
                        </div>
                        <div className="text-emerald-400 text-[10px] md:text-xs font-mono mt-4 flex items-center justify-center gap-2 bg-emerald-500/10 py-1.5 px-3 rounded-full border border-emerald-500/20 inline-flex">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#10B981]"></span>
                            REWARD_FUNCTION: OPTIMIZED
                        </div>
                    </div>

                    {/* Edge highlights */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"></div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const SwarmIntelligenceSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
    };

    return (
        <div className="w-full mt-32 mb-16 px-4 relative">
            {/* Background Glows for section */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <motion.div 
                className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex-1 space-y-6">
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                        Swarm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyber-cyan drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">Intelligence</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed">
                        Ce învață un robot, învață toată flota. Conștiința colectivă (Hive Mind) permite partajarea instantanee a hărților 3D, a strategiilor de evitare și a datelor despre mediul înconjurător. 
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed">
                        Dacă un patrupede detectează o prăpastie la etajul 3, toți umanoizii din clădire își ajustează automat rutele. Nu doar hardware. E o <strong className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">minte colectivă</strong>.
                    </motion.p>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="flex-1 w-full h-[400px] relative rounded-3xl border border-white/10 bg-[#030712] overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.1)] group"
                >
                    {/* Hexagon / Dotted Map Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]"></div>
                    
                    {/* Radar Effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border border-emerald-500/30 rounded-full absolute shadow-[0_0_30px_rgba(16,185,129,0.1)_inset]"></div>
                        <div className="w-80 h-80 border border-emerald-500/20 rounded-full absolute border-dashed"></div>
                        <div className="w-[450px] h-[450px] border border-emerald-500/10 rounded-full absolute"></div>
                        
                        {/* Radar Sweep */}
                        <motion.div 
                            className="w-full h-full absolute rounded-full opacity-60 mix-blend-screen"
                            style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 0.4) 98%, rgba(255,255,255,0.8) 100%)' }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    
                    {/* Fleet Nodes */}
                    <div className="relative w-full h-full">
                        {/* Center Node */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            {/* Ripple Effect */}
                            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40"></div>
                            <div className="w-5 h-5 bg-emerald-400 rounded-full shadow-[0_0_20px_#10B981] border-2 border-white"></div>
                            <div className="text-[10px] text-emerald-300 font-mono font-bold absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-emerald-500/30">NEXUS_HUB</div>
                        </div>

                        {/* Node 1 */}
                        <div className="absolute top-[25%] left-[25%] z-10 group-hover:-translate-y-1 transition-transform duration-500">
                            <div className="w-3 h-3 bg-cyber-cyan rounded-full shadow-[0_0_15px_#00F0FF] relative">
                                <div className="absolute inset-0 rounded-full bg-cyber-cyan animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <div className="text-[10px] text-cyber-cyan font-mono absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-1 rounded">U-01</div>
                            <svg className="absolute top-1.5 left-1.5 overflow-visible pointer-events-none">
                                <motion.line x1="0" y1="0" x2="115" y2="85" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" strokeDasharray="4 4"
                                    animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Data packet moving along line */}
                                <motion.circle r="2" fill="#fff" filter="blur(1px)">
                                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 0 L 115 85" />
                                </motion.circle>
                            </svg>
                        </div>

                        {/* Node 2 */}
                        <div className="absolute top-[75%] left-[20%] z-10 group-hover:translate-x-1 transition-transform duration-500">
                            <div className="w-3 h-3 bg-cyber-cyan rounded-full shadow-[0_0_15px_#00F0FF] relative">
                                <div className="absolute inset-0 rounded-full bg-cyber-cyan animate-ping opacity-30" style={{ animationDelay: '0.7s' }}></div>
                            </div>
                            <div className="text-[10px] text-cyber-cyan font-mono absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-1 rounded">Q-04</div>
                            <svg className="absolute top-1.5 left-1.5 overflow-visible pointer-events-none">
                                <motion.line x1="0" y1="0" x2="135" y2="-85" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" strokeDasharray="4 4"
                                    animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.circle r="2" fill="#fff" filter="blur(1px)">
                                    <animateMotion dur="2s" repeatCount="indefinite" path="M 135 -85 L 0 0" />
                                </motion.circle>
                            </svg>
                        </div>
                        
                        {/* Node 3 */}
                        <div className="absolute top-[35%] left-[75%] z-10 group-hover:translate-x-1 transition-transform duration-500">
                            <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_#A855F7] relative">
                                <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-30" style={{ animationDelay: '1.2s' }}></div>
                            </div>
                            <div className="text-[10px] text-purple-400 font-mono absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-1 rounded">U-02</div>
                            <svg className="absolute top-1.5 left-1.5 overflow-visible pointer-events-none">
                                <motion.line x1="0" y1="0" x2="-115" y2="50" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" strokeDasharray="4 4"
                                    animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.circle r="2" fill="#fff" filter="blur(1px)">
                                    <animateMotion dur="1s" repeatCount="indefinite" path="M -115 50 L 0 0" />
                                </motion.circle>
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const AvatarModeSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
    };

    return (
        <div className="w-full mt-32 mb-32 px-4 relative">
            {/* Background Glows for section */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <motion.div 
                className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex-1 space-y-6">
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                        Avatar <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">Mode</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed">
                        Inteligența Artificială gestionează 99% din situații. Pentru excepțiile extreme, lansăm **Avatar Mode**. Operatorii umani se conectează la rețeaua neuronală prin căști VR cu haptic feedback, preluând controlul fizic total al unității.
                    </motion.p>
                    <motion.div variants={itemVariants} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 inline-block shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-2">
                            <i className="fa-solid fa-headset text-red-500 text-lg animate-pulse"></i>
                            <div className="text-xs text-red-400 font-mono uppercase tracking-widest font-bold">Override Uman Activat</div>
                        </div>
                        <div className="text-slate-300 text-sm">Latentă sub 5ms. Sincronizare perfectă om-mașină. Robotul devine o extensie a corpului tău.</div>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="flex-1 w-full h-[400px] relative rounded-3xl border border-white/10 bg-[#02050A] overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.15)] group"
                >
                    {/* VR Lens Distortion Effect */}
                    <div className="absolute inset-0 border-[30px] border-black/80 rounded-[40px] pointer-events-none z-30 shadow-[0_0_100px_black_inset]"></div>
                    
                    {/* Camera Feed Background (Simulated with dark noise and scanlines) */}
                    <div className="absolute inset-0 bg-slate-900 z-0">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4px_4px]"></div>
                    </div>

                    {/* LIVE REC Indicator */}
                    <div className="absolute top-10 left-12 z-20 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#EF4444]"></div>
                        <span className="text-red-500 font-mono text-sm font-bold tracking-widest drop-shadow-[0_0_5px_#EF4444]">REC</span>
                    </div>

                    {/* HUD Battery & Signal */}
                    <div className="absolute top-10 right-12 z-20 flex flex-col items-end gap-1 font-mono text-[10px] text-cyan-400 opacity-80">
                        <div className="flex items-center gap-2">
                            <span>LINK_STR: 99%</span>
                            <div className="flex gap-0.5"><div className="w-1 h-3 bg-cyan-400"></div><div className="w-1 h-3 bg-cyan-400"></div><div className="w-1 h-3 bg-cyan-400"></div><div className="w-1 h-3 bg-cyan-400"></div></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>SYS_PWR: 84%</span>
                            <div className="w-10 h-2 border border-cyan-400 p-[1px]"><div className="w-[84%] h-full bg-cyan-400"></div></div>
                        </div>
                    </div>

                    {/* Center Targeting Reticle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-48 h-48 border border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-32 h-32 border border-dashed border-red-500/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute w-2 h-2 bg-red-500 rounded-full"></div>
                        
                        {/* Crosshairs */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2"></div>
                        
                        {/* Dynamic Target Box */}
                        <motion.div 
                            className="absolute w-12 h-12 border-2 border-cyan-400 opacity-60"
                            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="absolute -top-4 -right-8 text-[8px] text-cyan-400 font-mono bg-black/50 px-1">OBJ_LOCKED</div>
                        </motion.div>
                    </div>

                    {/* Bottom Data Stream */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-8 font-mono text-[10px] text-white/50 text-center">
                        <div>
                            <div className="text-red-400 mb-1">OVERRIDE</div>
                            <div>MANUAL_CTRL</div>
                        </div>
                        <div>
                            <div className="text-cyan-400 mb-1">LATENCY</div>
                            <div>4.2ms</div>
                        </div>
                        <div>
                            <div className="text-emerald-400 mb-1">STABILITY</div>
                            <div>NOMINAL</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
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
                    <div className={`absolute w-48 h-48 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${activeNodeData ? '' : 'bg-white/20'}`} style={{ backgroundColor: activeNodeData ? activeNodeData.color : undefined }}></div>
                    
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

            {/* Evoluție Sintetică (The Matrix) */}
            <TrainingMatrixSection />

            {/* Swarm Intelligence (Hive Mind) */}
            <SwarmIntelligenceSection />
            
            {/* Avatar Mode (Teleoperare VR) */}
            <AvatarModeSection />
            
        </section>
    );
}
