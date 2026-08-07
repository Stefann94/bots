import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Verificăm dacă site-ul a mai fost încărcat în sesiunea curentă (ca să nu deranjăm la fiecare refresh)
    const hasLoaded = sessionStorage.getItem('nexus_booted')
    
    if (hasLoaded) {
      setLoading(false)
      return
    }

    let isMounted = true;
    let imagesAreReady = false;

    // Pozele esențiale și masive (Hero & Home)
    const criticalImages = [
      '/images/hero_humanoid.webp',
      '/images/hero_quadruped.webp',
      '/images/hero_core.webp',
      '/images/h1_real.webp',
      '/images/g1_real.webp',
      '/images/agibot_real.webp'
    ];

    // Le încărcăm forțat în memorie
    Promise.all(criticalImages.map(src => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Mergem mai departe chiar dacă una pică
      });
    })).then(() => {
      imagesAreReady = true;
    });

    // Timeout de siguranță de max 10 secunde (în caz de net foarte slab)
    const timeout = setTimeout(() => {
      imagesAreReady = true;
    }, 10000);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (imagesAreReady) {
          clearInterval(interval);
          clearTimeout(timeout);
          setTimeout(() => {
            if (isMounted) {
              setLoading(false);
              sessionStorage.setItem('nexus_booted', 'true');
            }
          }, 400); // Pauză scurtă la 100% înainte să dispară
          return 100;
        }

        // Creștem treptat progresul, dar ne blocăm la 99% dacă pozele nu sunt gata
        const nextProgress = prev + Math.floor(Math.random() * 8) + 2;
        return nextProgress >= 99 ? 99 : nextProgress;
      })
    }, 200)

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] bg-[#020617] flex flex-col items-center justify-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-cyan/10 via-[#020617] to-[#020617]"></div>
          
          <div className="relative z-10 w-64 md:w-96 px-4">
            {/* Logo sau Icon central (opțional, dar arată bine) */}
            <div className="flex justify-center mb-10">
              <div className="relative w-16 h-16 rounded-xl bg-navy-900 border border-cyber-cyan/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                  <i className="fa-solid fa-robot text-cyber-cyan text-3xl"></i>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-cyan rounded-full animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-cyan rounded-full"></span>
              </div>
            </div>

            <div className="flex justify-between text-xs font-mono text-cyber-cyan mb-2 uppercase tracking-widest">
              <span>System Boot</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            
            <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,1)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>

            <div className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest h-4 text-center">
              {progress < 30 && "Initializing Core Neural Network..."}
              {progress >= 30 && progress < 70 && "Loading High-Res Visual Assets..."}
              {progress >= 70 && progress < 99 && "Establishing Nexus Connection..."}
              {progress >= 99 && "System Ready."}
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
            <i className="fa-solid fa-microchip text-slate-500 animate-pulse"></i>
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Nexus OS v2.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
