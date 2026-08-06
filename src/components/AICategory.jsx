import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AICategory() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects for different layers to create huge 3D depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  
  // Nodes moving at vastly different speeds for parallax
  const node1Y = useTransform(scrollYProgress, [0, 1], ["60%", "-60%"])
  const node2Y = useTransform(scrollYProgress, [0, 1], ["120%", "-20%"])
  const node3Y = useTransform(scrollYProgress, [0, 1], ["80%", "-80%"])
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="ai" ref={containerRef} className="relative min-h-[150vh] overflow-hidden flex flex-col justify-center border-t border-blue-900/30">
      
      {/* Deep Background Parallax Layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
         {/* Huge faint icon in the deep background */}
         <i className="fa-solid fa-network-wired text-[40rem] text-blue-500/5 mix-blend-screen animate-pulse-glow"></i>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center pt-32 pb-48">
          
          <motion.div style={{ y: textY, opacity }} className="max-w-4xl mx-auto">
             <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <span className="text-blue-400 font-mono text-xs tracking-widest uppercase"><i className="fa-solid fa-code-branch mr-2"></i>The Brain</span>
             </div>
             
             <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                Embodied <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI</span>
             </h2>
             
             <p className="text-slate-400 text-xl leading-relaxed">
               Hardware-ul impecabil este doar corpul. Adevărata revoluție are loc în cod. Prin modele de învățare bazate pe AI (UnifoLM / AgiBot OS), roboții noștri învață prin imitație și își optimizează continuu abilitățile în lumea fizică.
             </p>
          </motion.div>

          {/* Floating Neural Nodes Field */}
          <div className="mt-32 relative h-[80vh] w-full hidden md:block">
              
              <motion.div style={{ y: node1Y }} className="absolute left-[5%] top-[10%] glass-card p-8 rounded-3xl border border-blue-500/30 text-left bg-navy-950/80 shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-xl w-80">
                 <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-400/20">
                    <i className="fa-solid fa-brain text-3xl text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"></i>
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-3">UnifoLM</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">Arhitectură AI masivă care permite roboților G1 să învețe rapid noi abilități industriale prin simpla imitație a mișcărilor umane.</p>
              </motion.div>

              <motion.div style={{ y: node2Y }} className="absolute right-[5%] bottom-[10%] glass-card p-8 rounded-3xl border border-purple-500/30 text-left bg-navy-950/80 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-xl w-80">
                 <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-400/20">
                    <i className="fa-solid fa-cloud-arrow-up text-3xl text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"></i>
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-3">Cloud Fleet</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">Conectivitate permanentă. Urmărește datele telemetrice, trimite comenzi și orchestrează flotele de roboți de oriunde din lume în timp real.</p>
              </motion.div>
              
              <motion.div style={{ y: node3Y }} className="absolute left-[30%] bottom-[30%] glass-card p-6 rounded-3xl border border-emerald-500/30 text-left bg-navy-950/80 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-xl w-72">
                 <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-400/20">
                    <i className="fa-solid fa-microchip text-2xl text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"></i>
                 </div>
                 <h4 className="text-xl font-bold text-white mb-2">Procesare Edge</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">Decizii luate local, în milisecunde, fără a aștepta cloud-ul. Esențial pentru evitarea obstacolelor la viteze mari.</p>
              </motion.div>

          </div>
      </div>
    </section>
  )
}
