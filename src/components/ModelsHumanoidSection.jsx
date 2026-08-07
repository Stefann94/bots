import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Animație specifică pentru Cardul 1 (Kinematic) - Un overlay tip grilă matematică animată
const KinematicGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700">
    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:20px_20px] animate-[slide_10s_linear_infinite]"></div>
    <style>{`
      @keyframes slide {
        from { background-position: 0 0; }
        to { background-position: 20px 20px; }
      }
    `}</style>
  </div>
)

// Animație specifică pentru Cardul 2 (Dexterity) - Inele holografice 3D
const HolographicRings = () => (
  <div className="absolute -right-10 -top-10 w-64 h-64 pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity duration-1000 flex items-center justify-center">
    <div className="absolute w-full h-full border border-purple-500/50 rounded-full animate-[spin_8s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(20deg)' }}></div>
    <div className="absolute w-3/4 h-3/4 border border-purple-400/60 rounded-full animate-[spin_6s_linear_infinite_reverse]" style={{ transform: 'rotateX(70deg) rotateY(-20deg)' }}></div>
    <div className="absolute w-1/2 h-1/2 border border-purple-300/80 rounded-full animate-[spin_4s_linear_infinite]" style={{ transform: 'rotateX(80deg) rotateY(10deg)' }}></div>
    <div className="absolute w-2 h-2 bg-purple-200 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)] animate-ping"></div>
  </div>
)

// Animație specifică pentru Cardul 4 (Baterie) - Linii de curent și bara de încărcare
const PowerFlow = () => {
  const [charge, setCharge] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCharge(prev => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animated power lines connecting */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-blue-500/10">
        <motion.div 
          className="h-full w-1/4 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          animate={{ x: ['400%', '-100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        />
      </div>
      {/* Dynamic Charge Bar */}
      <div className="absolute bottom-4 left-8 right-8 h-1 bg-navy-900 rounded overflow-hidden border border-blue-900/50">
        <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] transition-all duration-75" style={{ width: `${charge}%` }}></div>
      </div>
    </div>
  )
}

// Animație specifică pentru Cardul 3 (Radar) - Cercuri orbitale continue
const OrbitalRings = () => (
  <motion.div 
    className="absolute -bottom-32 -right-32 flex items-center justify-center pointer-events-none z-0 overflow-hidden w-[500px] h-[500px] opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
    animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="absolute w-[80%] h-[80%] border border-cyber-cyan/20 rounded-full animate-[spin_20s_linear_infinite]">
      <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyber-cyan rounded-full shadow-[0_0_20px_rgba(0,240,255,0.9)] -translate-x-1/2 -translate-y-1/2"></div>
    </div>
    <div className="absolute w-[60%] h-[60%] border border-cyber-cyan/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateX(20deg) rotateY(20deg)' }}>
      <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-cyber-cyan/90 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.7)] -translate-x-1/2 translate-y-1/2"></div>
    </div>
    <div className="absolute w-[40%] h-[40%] border border-dashed border-cyber-cyan/40 rounded-full animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(-20deg) rotateY(-20deg)' }}>
      <div className="absolute top-1/2 right-0 w-2 h-2 bg-cyber-cyan/70 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)] translate-x-1/2 -translate-y-1/2"></div>
    </div>
    <div className="absolute w-[15%] h-[15%] bg-cyber-cyan/10 rounded-full animate-pulse shadow-[0_0_50px_rgba(0,240,255,0.3)]"></div>
  </motion.div>
)

// Card individual pentru Anatomia Holografică
const BlueprintCard = ({ title, text, align = 'left', delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`relative z-20 flex flex-col ${align === 'left' ? 'md:items-end md:text-right text-left items-start' : 'items-start text-left'}`}
  >
    {/* Data Line (Laser) conectat la robot */}
    <div className={`absolute top-1/2 -translate-y-1/2 ${align === 'left' ? '-right-12' : '-left-12'} w-3 h-3 bg-cyber-cyan rounded-full shadow-[0_0_15px_rgba(0,240,255,1)] hidden md:block`}>
        <div className="absolute inset-0 bg-cyber-cyan rounded-full animate-ping opacity-50"></div>
        {/* Animated Beam */}
        <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] ${align === 'left' ? 'bg-gradient-to-r from-cyber-cyan to-transparent left-full' : 'bg-gradient-to-l from-cyber-cyan to-transparent right-full'} w-32 lg:w-48 opacity-40 overflow-hidden`}>
             <motion.div 
                className="h-full w-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
                animate={{ x: align === 'left' ? ['-100%', '200%'] : ['100%', '-200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
             />
        </div>
    </div>

    {/* Caseta de text */}
    <div className="bg-[#060D1F]/80 backdrop-blur-md p-6 rounded-2xl border border-cyber-cyan/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] max-w-sm hover:border-cyber-cyan/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] transition-all duration-500 group">
        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
    </div>
  </motion.div>
)

export default function ModelsHumanoidSection() {
  return (
    <section id="umanoizi" className="py-24 relative">
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Section Header */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-6 mb-16 relative"
           >
               <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                   <div className="absolute inset-0 rounded-2xl border border-dashed border-cyber-cyan/40 animate-[spin_10s_linear_infinite]"></div>
                   <div className="absolute inset-2 rounded-xl border border-cyber-cyan/20 animate-[spin_5s_linear_infinite_reverse]"></div>
                   <i className="fa-solid fa-person-walking text-3xl relative z-10 animate-pulse-glow"></i>
               </div>
               <div>
                   <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase relative inline-block">
                       Generația Umanoidă
                       <motion.span 
                         className="absolute -right-4 top-0 w-2 h-2 bg-cyber-cyan rounded-full shadow-[0_0_10px_rgba(0,240,255,1)]"
                         animate={{ opacity: [1, 0, 1] }}
                         transition={{ duration: 1, repeat: Infinity }}
                       />
                   </h2>
                   <div className="text-sm font-mono text-cyber-cyan tracking-[0.2em] mt-2 flex items-center gap-2">
                       <span className="w-8 h-[1px] bg-cyber-cyan/50 block"></span>
                       VIITORUL FORȚEI DE MUNCĂ
                   </div>
               </div>
           </motion.div>

           {/* Bento Grid */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
               
               {/* 1. KINEMATIC BOX (Agility) */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: false, amount: 0.25 }}
                 transition={{ duration: 0.6 }}
                 className="md:col-span-8 h-[500px] glass-card rounded-[32px] p-2 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)] border-emerald-500/20 hover:border-emerald-500/50 transition-colors duration-500 bg-[#132247]/40"
               >
                   <KinematicGrid />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-transparent z-10"></div>
                   
                   {/* Background Image */}
                   <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                       <div className="absolute inset-0 bg-[url('/images/humanoid_parallax.png')] bg-cover bg-[center_top_-50px] group-hover:scale-110 transition-transform duration-[2s] ease-out"></div>
                       <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay"></div>
                   </div>

                   <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
                       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#060D1F]/80 border border-emerald-500/40 backdrop-blur-md">
                           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                           <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Sistem Kinematic Bionic</span>
                       </div>
                   </div>

                   <div className="absolute bottom-8 left-8 right-8 z-20">
                       <h3 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">Echilibru Dinamic Absolut.</h3>
                       <p className="text-slate-300 text-lg max-w-xl font-light drop-shadow-md leading-relaxed bg-[#060D1F]/60 p-4 rounded-xl border border-emerald-500/10 backdrop-blur-sm">
                           Capacitatea de a rezista la impacturi laterale severe, de a naviga scări abrupte și de a se redresa autonom. Propulsați de motoare in-house cu densitate de cuplu ultra-înaltă, humanoizii sfidează limitele gravitației și terenului accidentat.
                       </p>
                   </div>
               </motion.div>

               {/* 2. DEXTERITY BOX */}
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: false, amount: 0.25 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="md:col-span-4 h-[500px] glass-card rounded-[32px] p-4 relative overflow-hidden group border-purple-500/20 hover:border-purple-500/50 bg-[#132247]/40 flex flex-col"
               >
                   <HolographicRings />
                   
                   <div className="w-full h-[45%] rounded-[24px] overflow-hidden relative border border-purple-500/10 shrink-0 mb-4 z-10">
                       <div className="absolute inset-0 bg-[url('/images/humanoid_gallery_2.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-[2s]"></div>
                   </div>
                   
                   <div className="flex flex-col flex-grow justify-between z-10 px-2 pb-2">
                       <div>
                           <div className="flex items-center justify-between mb-3">
                               <h4 className="text-2xl font-bold text-white">Manipulare Haptică</h4>
                               <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center relative group-hover:bg-purple-500/30 transition-colors shrink-0 ml-2">
                                   <i className="fa-solid fa-hand-sparkles text-purple-400"></i>
                               </div>
                           </div>
                           
                           <p className="text-slate-400 text-sm leading-relaxed">
                               Mâinile bionice integrează senzori de feedback tactil pe fiecare falangă. Robotul simte greutatea și textura, putând să țină un ou fără să-l spargă sau să opereze bormașini industriale.
                           </p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-3 mt-4">
                           <div className="bg-[#060D1F]/80 border border-purple-500/20 p-3 rounded-xl hover:border-purple-400 transition-colors">
                               <div className="text-purple-400 font-mono text-lg font-bold">43 DoF</div>
                               <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Articulații Complexe</div>
                           </div>
                           <div className="bg-[#060D1F]/80 border border-purple-500/20 p-3 rounded-xl hover:border-purple-400 transition-colors">
                               <div className="text-purple-400 font-mono text-lg font-bold">120 Nm</div>
                               <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Cuplu Forță Brută</div>
                           </div>
                       </div>
                   </div>
               </motion.div>

               {/* 3. RADAR BOX */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: false, amount: 0.25 }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 className="md:col-span-5 h-[350px] glass-card rounded-[32px] p-8 relative overflow-hidden group border-cyber-cyan/20 hover:border-cyber-cyan/50 flex flex-col bg-[#132247]/40"
               >
                   <div className="relative z-20">
                       <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-4">
                           Percepție Ultra-Senzorială
                       </div>
                       <h4 className="text-3xl font-black text-white mb-2">Conștientizare Spațială 360°</h4>
                       <p className="text-slate-400 text-sm max-w-sm leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                           Fuziunea dintre unitatea LiDAR LIVOX Mid-360 și camerele de adâncime creează o hartă point-cloud detaliată la milimetru. Robotul nu doar vede obstacolele, ci anticipează traiectoria acestora în timp real.
                       </p>
                   </div>
                   
                   <OrbitalRings />
               </motion.div>

               {/* 4. MODULAR BATTERY BOX */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: false, amount: 0.25 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="md:col-span-7 h-[350px] glass-card rounded-[32px] p-2 relative overflow-hidden group border-blue-500/20 hover:border-blue-500/50 flex flex-col md:flex-row bg-[#132247]/40"
               >
                   <PowerFlow />
                   
                   <div className="w-full md:w-5/12 h-48 md:h-full rounded-[24px] overflow-hidden relative z-10 border border-blue-500/20">
                       <div className="absolute inset-0 bg-[url('/images/humanoid_gallery_1.png')] bg-cover bg-[center_left_-80px] group-hover:scale-110 transition-transform duration-[2s]"></div>
                       <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                   </div>
                   
                   <div className="w-full md:w-7/12 p-8 flex flex-col justify-center relative z-10">
                       <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-6 relative group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
                           <i className="fa-solid fa-bolt text-blue-400 text-xl animate-pulse"></i>
                       </div>
                       <h4 className="text-2xl font-bold text-white mb-3">Autonomie și Reziliență</h4>
                       <p className="text-slate-400 text-sm leading-relaxed mb-6">
                           Industria nu doarme, iar roboții noștri nici atât. Bateriile de mare capacitate de 9000mAh oferă anduranță maximă, iar arhitectura "Hot-Swap" permite schimbarea acumulatorului fără a întrerupe procesele cognitive de asamblare.
                       </p>
                       <div className="flex items-center gap-4 text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                           <span className="flex items-center gap-2 bg-[#060D1F]/80 px-3 py-1.5 rounded-full border border-blue-500/30"><i className="fa-solid fa-rotate"></i> ZERO DOWNTIME</span>
                       </div>
                   </div>
               </motion.div>

           </div>

           {/* ========================================================= */}
           {/* HOLOGRAM ANATOMY CHAPTER */}
           {/* ========================================================= */}
           <div className="mt-40 mb-20 relative">
               {/* Titlu Mini-Capitol */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-center mb-24 relative z-20"
               >
                   <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                       Anatomie <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">Digitală</span>
                   </h2>
                   <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                       Sistemul nervos central și algoritmii decizionali care transformă hardware-ul mecanic într-o entitate complet autonomă.
                   </p>
               </motion.div>

               {/* Grid-ul cu Holograma în centru */}
               <div className="relative min-h-[800px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
                  
                  {/* Holograma Centrală (Fundal Vizual pe Mobile, Centrat pe Desktop) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 md:opacity-100 z-0 overflow-hidden">
                      <motion.div 
                        className="relative h-[800px] w-auto"
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                         <img 
                           src="/images/humanoid_parallax.png" 
                           alt="Hologramă Umanoid"
                           className="h-full object-contain filter hue-rotate-180 saturate-[1.5] brightness-125 drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]" 
                         />
                         {/* Scanline overlay pentru efect de hologramă */}
                         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_6px] mix-blend-overlay"></div>
                      </motion.div>
                  </div>

                  {/* Coloana Stângă */}
                  <div className="flex flex-col gap-12 md:gap-40 relative z-20 w-full md:w-1/3">
                     <BlueprintCard 
                        align="left"
                        delay={0.1}
                        title="Reinforcement Learning" 
                        text="Agilitatea umanoidă nu este programată mecanic. Robotul învață să meargă în simulatoare fizice, efectuând milioane de iterații virtuale și antrenându-și rețelele neurale înainte de a face primul pas în lumea reală." 
                     />
                     <BlueprintCard 
                        align="left"
                        delay={0.3}
                        title="Viziune Stereoscopică Semantică" 
                        text="Procesează date video 4K în timp real pentru a identifica adâncimea, textura și natura obiectelor din jur, permițând interacțiuni hiper-precise și sigure alături de personalul uman." 
                     />
                  </div>

                  {/* Coloana Dreaptă */}
                  <div className="flex flex-col gap-12 md:gap-40 relative z-20 w-full md:w-1/3 mt-12 md:mt-32">
                     <BlueprintCard 
                        align="right"
                        delay={0.2}
                        title="Model Predictive Control (MPC)" 
                        text="Creierul calculează continuu viitorul imediat. Robotul știe exact cum se va schimba centrul său de greutate în următoarele secunde, ajustându-și forța și postura proactiv, nu doar reactiv." 
                     />
                     <BlueprintCard 
                        align="right"
                        delay={0.4}
                        title="Procesare Edge AI On-Board" 
                        text="Arhitectură de calcul integrată direct în trunchiul robotului. Ia decizii critice de navigație, echilibru și manipulare haptică în microsecunde, cu zero dependență de latența rețelelor cloud." 
                     />
                  </div>

               </div>
           </div>

       </div>
    </section>
  )
}
