import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

// Variabile de animație generale (pentru a fi folosite la scroll)
const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

export default function HumanoidsPage() {
  const containerRef = useRef(null)
  
  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen overflow-hidden selection:bg-cyber-cyan/30">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Grand Entrance) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center pt-20">
        
        {/* Buton Înapoi */}
        <div className="absolute top-24 left-4 z-50">
          <a href="/modele-3d" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-mono text-sm bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <i className="fa-solid fa-arrow-left"></i> Înapoi la Modele 3D
          </a>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-20 text-center flex flex-col items-center"
        >
          <motion.h2 variants={fadeUpVariant} className="text-cyber-cyan font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Unitree G1
          </motion.h2>
          <motion.h1 variants={fadeUpVariant} className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            Viitorul este <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">Biped.</span>
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="text-slate-400 max-w-lg text-lg md:text-xl font-light">
            O capodoperă a ingineriei robotice. Construit pentru a trăi și munci alături de noi.
          </motion.p>
        </motion.div>

        {/* 2D Image Placeholder (Hero Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 w-[400px] md:w-[600px] h-[500px] md:h-[700px] flex items-end justify-center"
        >
          {/* Aici va veni imaginea 2D (.png transparent) */}
          <div className="w-full h-[80%] bg-gradient-to-t from-cyber-cyan/20 to-transparent rounded-t-full relative flex items-center justify-center overflow-hidden border-t border-cyber-cyan/10">
             <i className="fa-solid fa-robot text-9xl text-cyber-cyan/20"></i>
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-cyan/10 via-transparent to-transparent"></div>
          </div>
        </motion.div>
        
        {/* Glow din spate */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. BENTO GRID SECTION (Specs) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Card 1: Viteză (Col-span-2) */}
          <motion.div variants={fadeUpVariant} className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[32px] p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <i className="fa-solid fa-bolt text-8xl text-cyber-cyan"></i>
            </div>
            <h3 className="text-5xl font-black mb-2">3.3 m/s</h3>
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase mb-6">Viteză de deplasare</p>
            <p className="text-slate-300 font-light max-w-md">Echipat cu actuatoare ultra-performante ce permit alergare, sărituri și recuperare instantanee a echilibrului în orice condiții.</p>
          </motion.div>

          {/* Card 2: Baterie */}
          <motion.div variants={fadeUpVariant} className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 hover:bg-white/[0.04] transition-colors flex flex-col justify-between">
            <div>
              <i className="fa-solid fa-battery-full text-cyber-cyan text-3xl mb-4"></i>
              <h3 className="text-3xl font-bold mb-2">Schimbare Rapidă</h3>
            </div>
            <p className="text-slate-400 text-sm font-light">Sistem modular de baterii (9000mAh) interschimbabile on-the-fly pentru o funcționare non-stop.</p>
          </motion.div>

          {/* Card 3: LiDAR */}
          <motion.div variants={fadeUpVariant} className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 hover:bg-white/[0.04] transition-colors">
             <i className="fa-solid fa-radar text-cyber-cyan text-3xl mb-4"></i>
             <h3 className="text-2xl font-bold mb-2">LiDAR 360°</h3>
             <p className="text-slate-400 text-sm font-light">Cartografierea precisă a spațiului cu senzori Mid-360 integrați direct în craniu.</p>
          </motion.div>

          {/* Card 4: Maini Dextere (Col-span-2) */}
          <motion.div variants={fadeUpVariant} className="md:col-span-2 bg-gradient-to-br from-cyber-cyan/10 to-transparent border border-cyber-cyan/20 rounded-[32px] p-10 relative overflow-hidden">
             <h3 className="text-4xl font-black mb-2 text-cyber-cyan">Dexteritate Extremă</h3>
             <p className="text-slate-300 font-light max-w-sm">Mâini capabile să manevreze un ou fără să-l spargă, sau să spargă o nucă cu precizie chirurgicală.</p>
             
             {/* Abstract Hand Placeholder */}
             <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 border border-cyber-cyan/30 rounded-full flex items-center justify-center opacity-50">
                <i className="fa-solid fa-hand-sparkles text-6xl text-cyber-cyan"></i>
             </div>
          </motion.div>

        </motion.div>
      </section>


      {/* ------------------------------------------------------------- */}
      {/* 3. STICKY SCROLL SECTION (Deep Dive) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
            
            {/* Partea stângă: Imaginea Sticky */}
            <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center p-12">
               <div className="w-full h-full max-h-[600px] bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden relative flex items-center justify-center">
                  <span className="text-white/20 font-mono text-sm uppercase tracking-widest absolute top-4 left-4">Sistem Central</span>
                  <i className="fa-solid fa-microchip text-9xl text-slate-700"></i>
                  {/* Poți pune imagine cu robotul aici */}
               </div>
            </div>

            {/* Partea dreaptă: Text care curge (Paragrafe) */}
            <div className="w-full md:w-1/2 py-[50vh] px-6 md:px-12 flex flex-col gap-[50vh]">
               
               <motion.div initial={{ opacity: 0.2 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ margin: "-40%" }}>
                 <h2 className="text-4xl font-bold mb-4">Învățare prin Inteligență Artificială</h2>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">Unitree G1 nu este doar programat. Este antrenat în medii de simulare masive, folosind Reinforcement Learning. Învață să meargă, să se ridice și să reacționeze la mediul înconjurător prin mii de ore de simulare comprimată.</p>
               </motion.div>

               <motion.div initial={{ opacity: 0.2 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ margin: "-40%" }}>
                 <h2 className="text-4xl font-bold mb-4">Construit să reziste</h2>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">Cablajul este ascuns pe interior, protejat complet de mediul extern. Articulațiile au un cuplu uimitor care absoarbe șocurile și impacturile severe fără a afecta integritatea sistemului.</p>
               </motion.div>

               <motion.div initial={{ opacity: 0.2 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ margin: "-40%" }}>
                 <h2 className="text-4xl font-bold mb-4">Open Source Ready</h2>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">Oferă suport complet pentru medii de cercetare și dezvoltare secundară, facilitând integrarea cu algoritmii tăi personalizați prin API-uri robuste.</p>
               </motion.div>

            </div>
         </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. GALERIE PARALLAX */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full py-32 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-16">
           <h2 className="text-4xl font-black">Proiectat pentru Perfecțiune.</h2>
         </div>
         
         <div className="flex gap-6 px-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
            {/* Imagine 1 */}
            <div className="min-w-[80vw] md:min-w-[60vw] h-[500px] bg-slate-900 rounded-3xl snap-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-1000 flex items-center justify-center">
                  <span className="text-white/20 font-mono">Imagine Detaliu 1</span>
               </div>
            </div>
            {/* Imagine 2 */}
            <div className="min-w-[80vw] md:min-w-[60vw] h-[500px] bg-slate-900 rounded-3xl snap-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-1000 flex items-center justify-center">
                  <span className="text-white/20 font-mono">Imagine Detaliu 2</span>
               </div>
            </div>
         </div>
      </section>


      {/* ------------------------------------------------------------- */}
      {/* 5. H1 REVEAL SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-32 bg-gradient-to-b from-black to-red-950">
         <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-200px" }}
            variants={staggerContainer}
            className="text-center z-10 px-6"
         >
            <motion.p variants={fadeUpVariant} className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">Forță Industrială</motion.p>
            <motion.h2 variants={fadeUpVariant} className="text-6xl md:text-8xl font-black mb-6">Unitree H1</motion.h2>
            <motion.p variants={fadeUpVariant} className="text-red-200/60 max-w-xl mx-auto text-lg mb-10">
               Fratele mai mare. Conceput pentru cele mai dure medii industriale, oferind stabilitate absolută și putere masivă.
            </motion.p>
            
            <motion.div variants={fadeUpVariant}>
               <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold transition-colors">
                 Descoperă H1
               </button>
            </motion.div>
         </motion.div>

         {/* Abstract H1 Background Element */}
         <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none opacity-20">
            <div className="w-[400px] h-[600px] border-t border-x border-red-500/30 rounded-t-[100px] flex items-center justify-center bg-red-500/5 backdrop-blur-3xl">
               <i className="fa-solid fa-robot text-9xl text-red-500/20"></i>
            </div>
         </div>
      </section>

    </main>
  )
}
