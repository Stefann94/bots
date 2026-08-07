import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

export default function HumanoidsSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  
  // Parallax transform for intro image (moves slower than scroll)
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  
  // Horizontal gallery transform
  const galleryRef = useRef(null)
  const { scrollYProgress: galleryProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] })
  const xGallery = useTransform(galleryProgress, [0, 1], ["5%", "-30%"])

  return (
    <div ref={containerRef} id="umanoizi" className="w-full bg-black text-white">
      
      {/* 1. Parallax Intro */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black border-t border-white/5">
        <motion.div 
          style={{ y: yParallax }} 
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-[url('/images/humanoid_parallax.webp')] bg-cover bg-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <motion.h2 variants={fadeUpVariant} className="text-green-500 font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Geneză Robotică
          </motion.h2>
          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            După chipul și <br/> asemănarea noastră.
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Unitree G1 și H1 reprezintă apogeul roboticii bipedale. Construiți nu doar pentru a ne asista, ci pentru a naviga și manipula lumea fizică exact așa cum o facem noi.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Bento Grid */}
      <section className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div variants={fadeUpVariant} className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[32px] p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <i className="fa-solid fa-bolt text-8xl text-green-500"></i>
            </div>
            <h3 className="text-5xl font-black mb-2">3.3 m/s</h3>
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase mb-6">Viteză de deplasare</p>
            <p className="text-slate-300 font-light max-w-md">Echipat cu actuatoare ultra-performante ce permit alergare, sărituri și recuperare instantanee a echilibrului în cele mai dure condiții.</p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 hover:bg-white/[0.04] transition-colors flex flex-col justify-between">
            <div>
              <i className="fa-solid fa-battery-full text-green-500 text-3xl mb-4"></i>
              <h3 className="text-3xl font-bold mb-2">Schimbare Rapidă</h3>
            </div>
            <p className="text-slate-400 text-sm font-light">Sistem modular de baterii (9000mAh) interschimbabile on-the-fly, asigurând operare non-stop.</p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 hover:bg-white/[0.04] transition-colors">
             <i className="fa-solid fa-radar text-green-500 text-3xl mb-4"></i>
             <h3 className="text-2xl font-bold mb-2">LiDAR 360°</h3>
             <p className="text-slate-400 text-sm font-light">Cartografierea precisă a spațiului cu senzorii ultra-avansați LIVOX Mid-360 integrați.</p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="md:col-span-2 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-[32px] p-10 relative overflow-hidden">
             <h3 className="text-4xl font-black mb-2 text-green-500">Dexteritate Extremă</h3>
             <p className="text-slate-300 font-light max-w-sm">Mâini capabile să manevreze un ou fără să-l spargă, sau să spargă o nucă cu precizie chirurgicală.</p>
             <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 border border-green-500/30 rounded-full flex items-center justify-center opacity-50">
                <i className="fa-solid fa-hand-sparkles text-6xl text-green-500"></i>
             </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. Sticky Scroll (Deep Dive) */}
      <section className="relative w-full bg-[#0a0a0a]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
            
            {/* Left: Sticky Image */}
            <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center p-6 md:p-12">
               <div className="w-full h-full max-h-[60vh] md:max-h-[70vh] rounded-3xl overflow-hidden relative shadow-2xl shadow-green-500/10">
                  <img src="/images/humanoid_sticky.webp" alt="Humanoid Portrait" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                     <p className="text-green-400 font-mono text-xs tracking-widest uppercase flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Scanare Optică Activată
                     </p>
                  </div>
               </div>
            </div>

            {/* Right: Scrolling Text */}
            <div className="w-full md:w-1/2 py-[30vh] px-6 md:px-12 flex flex-col gap-[50vh]">
               
               <motion.div initial={{ opacity: 0.2, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ margin: "-40% 0px -40% 0px" }}>
                 <i className="fa-solid fa-dna text-green-500 text-3xl mb-4"></i>
                 <h2 className="text-4xl font-bold mb-6 text-white">Anatomie Bionică</h2>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">
                   Fiecare articulație a fost proiectată imitând musculatura și tendoanele umane. Această arhitectură oferă un grad de libertate (DoF) absolut, capabil de mișcări fluide, naturale și o recuperare instantanee a echilibrului în fața oricărui impact.
                 </p>
               </motion.div>

               <motion.div initial={{ opacity: 0.2, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ margin: "-40% 0px -40% 0px" }}>
                 <i className="fa-solid fa-eye text-green-500 text-3xl mb-4"></i>
                 <h2 className="text-4xl font-bold mb-6 text-white">Percepție Spatială</h2>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">
                   Echipați cu radare LiDAR Mid-360 și camere de adâncime, umanoizii noștri percep lumea în 3D cu acuratețe milimetrică. Cartografiază terenul în timp real pentru a anticipa obstacole, scări și a planifica rute complexe fără intervenție umană.
                 </p>
               </motion.div>

               <motion.div initial={{ opacity: 0.2, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ margin: "-40% 0px -40% 0px" }}>
                 <i className="fa-solid fa-brain text-green-500 text-3xl mb-4"></i>
                 <h2 className="text-4xl font-bold mb-6 text-white">Inteligență Autonomă</h2>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">
                   Prin antrenamente masive în medii simulate (Reinforcement Learning), logica de mișcare este generată exclusiv de A.I. Robotul învață singur cum să se ridice dacă a căzut, cum să alerge pe teren accidentat și cum să folosească unelte.
                 </p>
               </motion.div>

            </div>
         </div>
      </section>

      {/* 4. Horizontal Parallax Gallery */}
      <section ref={galleryRef} className="relative w-full py-40 overflow-hidden bg-black border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 mb-16">
           <h2 className="text-4xl md:text-5xl font-black">Tehnologia sub lupă.</h2>
           <p className="text-green-500 font-mono text-sm tracking-widest uppercase mt-4">Inginerie de mare precizie</p>
         </div>
         
         {/* Containerul se mișcă pe X în funcție de scrollY */}
         <motion.div style={{ x: xGallery }} className="flex gap-8 px-6 w-[200vw] md:w-[150vw]">
            
            {/* Image 1 */}
            <div className="w-[85vw] md:w-[700px] h-[300px] md:h-[450px] rounded-3xl overflow-hidden relative shadow-2xl group">
               <img src="/images/humanoid_gallery_1.webp" alt="Joint Detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
               <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                  <p className="text-xs md:text-sm font-mono text-green-400 uppercase tracking-widest">Actuatoare Gen 2</p>
               </div>
            </div>

            {/* Image 2 */}
            <div className="w-[85vw] md:w-[700px] h-[300px] md:h-[450px] rounded-3xl overflow-hidden relative shadow-2xl group">
               <img src="/images/humanoid_gallery_2.webp" alt="Hand Detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
               <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                  <p className="text-xs md:text-sm font-mono text-green-400 uppercase tracking-widest">Senzori Tactili de Forță</p>
               </div>
            </div>

         </motion.div>
      </section>

      {/* 5. H1 Reveal */}
      <section className="relative w-full flex items-center justify-center py-40 bg-gradient-to-b from-black to-red-950 border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-200px" }} variants={staggerContainer} className="text-center z-10 px-6">
           <motion.p variants={fadeUpVariant} className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">
              Forță Industrială
           </motion.p>
           <motion.h2 variants={fadeUpVariant} className="text-6xl md:text-8xl font-black mb-6">
              Unitree H1
           </motion.h2>
           <motion.p variants={fadeUpVariant} className="text-red-200/60 max-w-xl mx-auto text-lg mb-10 font-light">
              Fratele mai mare. Conceput pentru cele mai dure medii industriale logistice, oferind o stabilitate absolută, capacitate de transport și putere masivă.
           </motion.p>
           <motion.div variants={fadeUpVariant}>
              <button className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)]">
                 Descoperă H1
              </button>
           </motion.div>
        </motion.div>
      </section>

    </div>
  )
}
