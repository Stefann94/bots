import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import NetworkBackground from '../components/NetworkBackground'

const PHRASES = [
  'conexiune securizată · AES-256',
  'inginer de aplicație disponibil',
  'demonstrații live în toată țara',
]

// Linie mono cu efect de tastare, ciclată la infinit
function TypeLine() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = PHRASES[idx]

    if (!deleting && text === full) {
      const hold = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(hold)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIdx((i) => (i + 1) % PHRASES.length)
      return
    }

    const tick = setTimeout(
      () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      deleting ? 28 : 55
    )
    return () => clearTimeout(tick)
  }, [text, deleting, idx])

  return (
    <span className="font-mono text-xs sm:text-sm text-cyber-cyan/80">
      <span className="text-slate-600">&gt;&nbsp;</span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[7px] h-[0.9em] align-middle bg-cyber-cyan ml-1"
      />
    </span>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 bg-[#020617] relative overflow-hidden">
      <NetworkBackground />

      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* ---------------- TITLU ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-4">
        <div className="text-center max-w-3xl mx-auto">

          {/* Badge de status */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-950/60 border border-cyber-cyan/25 backdrop-blur-md mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-cyber-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyber-cyan" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-300">
              Canal de comunicare activ
            </span>
          </motion.div>

          {/* Titlu cu reveal literă cu literă */}
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase mb-6 flex justify-center flex-wrap">
            {'CONTACT'.split('').map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* Linie de tastare */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-6 mb-6"
          >
            <TypeLine />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            Ai un proiect în minte sau dorești o demonstrație live pentru echipamentele noastre?
            Echipa noastră de specialiști este pregătită să îți răspundă.
          </motion.p>
        </div>
      </div>

      {/* ---------------- FORMULAR ---------------- */}
      <div className="relative z-10">
        <Contact />
      </div>
    </main>
  )
}
