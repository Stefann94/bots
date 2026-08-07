import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedTitle = ({ text, className }) => {
    const words = text.split(" ");
    return (
        <motion.h3 
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                hidden: {}
            }}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block mr-3 overflow-hidden">
                    <motion.span 
                        className="inline-block"
                        variants={{
                            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                            hidden: { opacity: 0, y: 20, filter: 'blur(10px)' }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.h3>
    );
};

const AnimatedDescription = ({ text, className }) => {
    const words = text.split(" ");
    return (
        <motion.p 
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.015, delayChildren: 0.25 } },
                hidden: {}
            }}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block mr-[0.3em]">
                    <motion.span 
                        className="inline-block"
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 5 }
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.p>
    );
};

export default function ModelsQuadrupedSection() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: "speed",
            title: "Viteză Extremă",
            subtitle: "4.7 m/s Max",
            icon: "fa-bolt",
            desc: "Performanță explozivă propulsată de actuatoare ultra-lightweight. Aleargă, sare și recuperează echilibrul instantaneu după un impact sever.",
            img: "/images/quad_1.png"
        },
        {
            id: "lidar",
            title: "Vedere Spațială 4D",
            subtitle: "LiDAR Mapping",
            icon: "fa-satellite-dish",
            desc: "Senzorii LIVOX Mid-360 acoperă fiecare unghi mort, creând hărți point-cloud în timp real pentru navigație autonomă perfectă, chiar și în întuneric total.",
            img: "/images/quad_2.png"
        },
        {
            id: "terrain",
            title: "Teren Imposibil",
            subtitle: "Off-Road AI",
            icon: "fa-mountain",
            desc: "Scări, moloz, pietre alunecoase? Niciun obstacol nu îl oprește. Algoritmii MPC corectează postura și calculează forța pe fiecare picior la nivel de milisecundă.",
            img: "/images/quad_3.png"
        },
        {
            id: "battery",
            title: "Anduranță Supremă",
            subtitle: "Certificare IP68",
            icon: "fa-shield-halved",
            desc: "Complet sigilat împotriva apei și prafului. Funcționează impecabil în ploaie torențială, furtuni de praf și medii industriale toxice.",
            img: "/images/quad_4.png"
        }
    ]

    return (
        <section className="relative w-full py-16 px-4 sm:px-6 lg:px-12">
            
            {/* Header text */}
            <div className="text-center mb-16 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
                        Seria B2 & Go2
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                        Agilitate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Absolută</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Construiți pentru a domina mediile ostile. Patrupedele Unitree combină viteza explozivă cu inteligența tactică de a naviga cele mai complexe topografii din lume.
                    </p>
                </motion.div>
            </div>

            {/* Interactive Tabs Container */}
            <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10">
                
                {/* Left Side: Tabs */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    {tabs.map((tab, index) => {
                        const isActive = activeTab === index;
                        return (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(index)}
                                className={`text-left p-6 rounded-3xl transition-all duration-500 border backdrop-blur-md flex items-center gap-5 group outline-none
                                    ${isActive 
                                        ? 'bg-cyber-cyan/10 border-cyber-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]' 
                                        : 'bg-[#060D1F]/50 border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                                    }
                                `}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-lg
                                    ${isActive ? 'bg-cyber-cyan text-[#020617] shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-110' : 'bg-white/5 text-slate-500 group-hover:text-slate-300 group-hover:bg-white/10'}
                                `}>
                                    <i className={`fa-solid ${tab.icon} text-xl`}></i>
                                </div>
                                <div>
                                    <h4 className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                        {tab.title}
                                    </h4>
                                    <div className={`text-xs font-mono tracking-widest uppercase mt-1 transition-colors duration-300 ${isActive ? 'text-cyber-cyan' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                        {tab.subtitle}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Right Side: Image and Content Display */}
                <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[600px] rounded-[40px] overflow-hidden bg-[#020617] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            {/* Background Image */}
                            <motion.img 
                                src={tabs[activeTab].img} 
                                alt={tabs[activeTab].title} 
                                className="w-full h-full object-cover opacity-90"
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 6, ease: "easeOut" }}
                            />
                            
                            {/* Multiple Gradients for perfect text readability and dramatic effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 to-transparent"></div>
                            
                            {/* Overlay Text */}
                            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-10">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AnimatedTitle 
                                        text={tabs[activeTab].title} 
                                        className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg"
                                    />
                                    <AnimatedDescription 
                                        text={tabs[activeTab].desc} 
                                        className="text-slate-300 text-base md:text-lg font-light leading-relaxed drop-shadow-md max-w-2xl border-l-2 border-cyber-cyan pl-4"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
            </div>
        </section>
    )
}
