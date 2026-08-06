import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HumanoidsPage() {
  const containerRef = useRef(null)
  
  // Track scroll over a huge 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // The scroll indicator will only appear when there's nothing on the screen (the "dark" gaps)
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.48, 0.5, 0.52, 0.98, 1],
    [1, 0,    0,    1,   0,    0,    1]
  )

  // =====================================
  // G1 MODEL ANIMATIONS (0% - 50% scroll)
  // =====================================
  const g1SpotlightOpacity = useTransform(scrollYProgress, [0, 0.05, 0.45, 0.5], [0, 1, 1, 0])
  const g1SpotlightScale = useTransform(scrollYProgress, [0, 0.1], [0.5, 1])
  
  const g1RobotOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.45, 0.5], [0, 1, 1, 0])
  const g1RobotY = useTransform(scrollYProgress, [0, 0.08], [100, 0])

  // F1: Head (10% - 22%)
  const f1Opacity = useTransform(scrollYProgress, [0.1, 0.12, 0.2, 0.22], [0, 1, 1, 0])
  const f1X = useTransform(scrollYProgress, [0.1, 0.12], [-50, 0])
  const f1LineWidth = useTransform(scrollYProgress, [0.1, 0.12], ["0px", "100px"])

  // F2: Hands (22% - 34%)
  const f2Opacity = useTransform(scrollYProgress, [0.22, 0.24, 0.32, 0.34], [0, 1, 1, 0])
  const f2X = useTransform(scrollYProgress, [0.22, 0.24], [50, 0])
  const f2LineWidth = useTransform(scrollYProgress, [0.22, 0.24], ["0px", "100px"])

  // F3: Legs (34% - 46%)
  const f3Opacity = useTransform(scrollYProgress, [0.34, 0.36, 0.44, 0.46], [0, 1, 1, 0])
  const f3X = useTransform(scrollYProgress, [0.34, 0.36], [-50, 0])
  const f3LineWidth = useTransform(scrollYProgress, [0.34, 0.36], ["0px", "100px"])


  // =====================================
  // H1 MODEL ANIMATIONS (50% - 100% scroll)
  // =====================================
  const h1SpotlightOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.95, 1], [0, 1, 1, 0])
  const h1RobotOpacity = useTransform(scrollYProgress, [0.52, 0.58, 0.95, 1], [0, 1, 1, 0])
  const h1RobotY = useTransform(scrollYProgress, [0.5, 0.58], [100, 0])

  // H1 F1: Core (60% - 75%)
  const h1f1Opacity = useTransform(scrollYProgress, [0.6, 0.62, 0.73, 0.75], [0, 1, 1, 0])
  const h1f1X = useTransform(scrollYProgress, [0.6, 0.62], [50, 0])
  const h1f1LineWidth = useTransform(scrollYProgress, [0.6, 0.62], ["0px", "120px"])

  // H1 F2: Legs (75% - 90%)
  const h1f2Opacity = useTransform(scrollYProgress, [0.75, 0.77, 0.88, 0.9], [0, 1, 1, 0])
  const h1f2X = useTransform(scrollYProgress, [0.75, 0.77], [-50, 0])
  const h1f2LineWidth = useTransform(scrollYProgress, [0.75, 0.77], ["0px", "120px"])

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      
      {/* Fixed UI Layer */}
      <div className="fixed top-24 left-4 z-50">
        <Link to="/modele-3d" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-mono text-sm bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <i className="fa-solid fa-arrow-left"></i> Înapoi la Hub
        </Link>
      </div>

      {/* Sticky Container (The "Dark Room") */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* ======================================================== */}
        {/* G1 SPOTLIGHT & ROBOT */}
        {/* ======================================================== */}
        <motion.div style={{ opacity: g1SpotlightOpacity, scale: g1SpotlightScale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
           {/* The actual light beam */}
           <div className="w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-cyan/30 via-cyber-cyan/5 to-transparent rounded-full opacity-60 mix-blend-screen"></div>
        </motion.div>

        <motion.div style={{ opacity: g1RobotOpacity, y: g1RobotY }} className="absolute inset-0 flex items-center justify-center">
            {/* Robot Placeholder Silhouette */}
            <div className="w-[200px] h-[500px] md:w-[250px] md:h-[600px] bg-gradient-to-b from-slate-800 to-black border border-white/5 shadow-2xl rounded-[100px] flex items-center justify-center relative backdrop-blur-sm z-10">
                <i className="fa-solid fa-user-astronaut text-6xl text-cyber-cyan/30"></i>
                <div className="absolute -bottom-10 text-cyber-cyan font-black text-4xl tracking-widest uppercase">G1</div>
            </div>

            {/* F1: Head / Sensors */}
            <motion.div style={{ opacity: f1Opacity, x: f1X }} className="absolute top-[20%] right-[55%] md:right-[60%] flex flex-col items-end z-20">
                <div className="text-right mb-2">
                    <h3 className="text-cyber-cyan font-bold text-xl uppercase">LiDAR 360°</h3>
                    <p className="text-slate-400 font-mono text-xs w-48">Senzor ultra-wide pentru mapare spațială 3D în timp real.</p>
                </div>
                <div className="flex items-center gap-4">
                    <motion.div style={{ width: f1LineWidth }} className="h-[1px] bg-cyber-cyan origin-right"></motion.div>
                    <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>
                </div>
            </motion.div>

            {/* F2: Dexterous Hands */}
            <motion.div style={{ opacity: f2Opacity, x: f2X }} className="absolute top-[40%] left-[55%] md:left-[60%] flex flex-col items-start z-20">
                <div className="text-left mb-2">
                    <h3 className="text-cyber-cyan font-bold text-xl uppercase">Mâini Dextere</h3>
                    <p className="text-slate-400 font-mono text-xs w-48">Control precis al forței, capabile să spargă nuci sau să manipuleze ace.</p>
                </div>
                <div className="flex items-center gap-4 flex-row-reverse">
                    <motion.div style={{ width: f2LineWidth }} className="h-[1px] bg-cyber-cyan origin-left"></motion.div>
                    <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>
                </div>
            </motion.div>

            {/* F3: Legs */}
            <motion.div style={{ opacity: f3Opacity, x: f3X }} className="absolute top-[70%] right-[55%] md:right-[60%] flex flex-col items-end z-20">
                <div className="text-right mb-2">
                    <h3 className="text-cyber-cyan font-bold text-xl uppercase">Articulații Bionice</h3>
                    <p className="text-slate-400 font-mono text-xs w-48">Cuplu de până la 140 N.m per articulație pentru alergare viteză.</p>
                </div>
                <div className="flex items-center gap-4">
                    <motion.div style={{ width: f3LineWidth }} className="h-[1px] bg-cyber-cyan origin-right"></motion.div>
                    <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>
                </div>
            </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* H1 SPOTLIGHT & ROBOT */}
        {/* ======================================================== */}
        <motion.div style={{ opacity: h1SpotlightOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-red-900/5 to-transparent rounded-full opacity-60 mix-blend-screen"></div>
        </motion.div>

        <motion.div style={{ opacity: h1RobotOpacity, y: h1RobotY }} className="absolute inset-0 flex items-center justify-center">
            {/* Robot Placeholder Silhouette (Bigger) */}
            <div className="w-[280px] h-[650px] md:w-[320px] md:h-[750px] bg-gradient-to-b from-slate-900 to-black border border-white/5 shadow-2xl rounded-[40px] flex items-center justify-center relative backdrop-blur-sm z-10">
                <i className="fa-solid fa-robot text-7xl text-red-500/30"></i>
                <div className="absolute -bottom-10 text-red-500 font-black text-5xl tracking-widest uppercase">H1</div>
            </div>

            {/* H1 F1: Core Power */}
            <motion.div style={{ opacity: h1f1Opacity, x: h1f1X }} className="absolute top-[30%] left-[55%] md:left-[60%] flex flex-col items-start z-20">
                <div className="text-left mb-2">
                    <h3 className="text-red-400 font-bold text-2xl uppercase">Forță Brută</h3>
                    <p className="text-slate-400 font-mono text-sm w-64">Construit pentru medii industriale dure. Ridică și manipulează greutăți extreme fără efort.</p>
                </div>
                <div className="flex items-center gap-4 flex-row-reverse">
                    <motion.div style={{ width: h1f1LineWidth }} className="h-[1px] bg-red-500 origin-left"></motion.div>
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
                </div>
            </motion.div>

            {/* H1 F2: Legs */}
            <motion.div style={{ opacity: h1f2Opacity, x: h1f2X }} className="absolute top-[65%] right-[55%] md:right-[60%] flex flex-col items-end z-20">
                <div className="text-right mb-2">
                    <h3 className="text-red-400 font-bold text-2xl uppercase">Stabilitate Absolută</h3>
                    <p className="text-slate-400 font-mono text-sm w-64">Algoritmi AI de ultimă generație asigură echilibrul chiar și când este lovit puternic.</p>
                </div>
                <div className="flex items-center gap-4">
                    <motion.div style={{ width: h1f2LineWidth }} className="h-[1px] bg-red-500 origin-right"></motion.div>
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
                </div>
            </motion.div>
        </motion.div>

        {/* Animated Mouse Scroll Indicator */}
        <motion.div 
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute top-[65%] left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-none"
        >
            <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-2 mb-3 backdrop-blur-sm">
                <motion.div 
                    animate={{ y: [0, 16, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-1.5 h-3 bg-cyber-cyan rounded-full shadow-[0_0_10px_#00f0ff]"
                />
            </div>
            <span className="text-white/50 font-mono text-xs uppercase tracking-widest">Scroll pentru a descoperi</span>
        </motion.div>

      </div>
    </div>
  )
}
