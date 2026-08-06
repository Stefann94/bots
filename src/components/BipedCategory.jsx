import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function BipedCategory() {
  const containerRef = useRef(null)
  
  // Set the container to be 400vh tall to allow for a long scroll duration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Fade in/out the first text block
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0])
  const text1Y = useTransform(scrollYProgress, [0, 0.1, 0.35], [50, 0, -50])

  // Fade in/out the second text block
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0])
  const text2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.65], [50, 0, -50])

  // Fade in/out the third text block
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 1], [0, 1, 1, 0])
  const text3Y = useTransform(scrollYProgress, [0.6, 0.7, 1], [50, 0, -50])

  // The center visual scale/blur effects as you scroll
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])
  const visualGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2])

  return (
    <section id="bipeds" ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Container - this stays fixed on the screen while scrolling through the 400vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/20 via-black to-black"></div>
        
        <motion.div 
          style={{ opacity: visualGlow }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-cyber-cyan/15 rounded-full blur-[100px] pointer-events-none"
        ></motion.div>

        {/* Central Visual (The Robot / Placeholder) */}
        <motion.div style={{ scale: visualScale }} className="relative z-10 w-64 h-64 md:w-96 md:h-96 glass-card rounded-[40px] border border-cyber-cyan/20 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.05)] backdrop-blur-2xl">
           <i className="fa-solid fa-person text-8xl md:text-9xl text-slate-300 drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]"></i>
           <div className="mt-8 text-xs font-mono text-cyber-cyan tracking-widest">BIPED // SERIES</div>
           
           {/* Animated border rings */}
           <div className="absolute inset-[-1px] rounded-[40px] border border-dashed border-cyber-cyan/30 animate-[spin_20s_linear_infinite]"></div>
           <div className="absolute inset-4 rounded-[30px] border border-cyber-cyan/10 animate-[spin_15s_linear_infinite_reverse]"></div>
        </motion.div>

        {/* Left/Right Staggered Text Blocks */}
        
        {/* Block 1: Intro */}
        <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute left-6 md:left-24 top-1/3 max-w-[280px] md:max-w-sm z-20">
            <h3 className="text-cyber-cyan font-mono text-xs md:text-sm mb-2 tracking-widest uppercase">Evoluția Forței de Muncă</h3>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Umanoizi Bipezi</h2>
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                Generația H1 și G1 redefinesc mobilitatea și adaptabilitatea. Construiți pentru a înlocui efortul uman în medii industriale periculoase și repetitive.
            </p>
        </motion.div>

        {/* Block 2: Agility */}
        <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute right-6 md:right-24 top-1/2 max-w-[280px] md:max-w-sm z-20 text-right">
            <h3 className="text-blue-400 font-mono text-xs md:text-sm mb-2 tracking-widest uppercase">Echilibru Dinamic</h3>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Viteză de 3.3 m/s</h2>
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                Motoarele in-house de mare putere generează până la 360Nm cuplu per articulație. Pot alerga, urca scări și redresa corpul instantaneu la impact.
            </p>
        </motion.div>

        {/* Block 3: Dexterity */}
        <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute left-6 md:left-24 bottom-1/4 max-w-[280px] md:max-w-sm z-20">
            <h3 className="text-cyber-cyan font-mono text-xs md:text-sm mb-2 tracking-widest uppercase">Dexteritate Fină</h3>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Manipulare Avansată</h2>
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                Cu până la 43 de grade de libertate și mâna bionică Dex360, acești roboți pot executa sarcini delicate de asamblare, utilizare de unelte și lipire de precizie.
            </p>
        </motion.div>

      </div>
    </section>
  )
}
