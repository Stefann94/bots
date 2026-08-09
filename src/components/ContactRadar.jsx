import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Blip-urile de pe radar (poziții procentuale + etichete)
const BLIPS = [
  { x: 50, y: 50, label: 'București · HQ', main: true, delay: 0 },
  { x: 28, y: 32, label: 'Cluj-Napoca', main: false, delay: 0.6 },
  { x: 72, y: 38, label: 'Iași', main: false, delay: 1.2 },
  { x: 38, y: 72, label: 'Timișoara', main: false, delay: 1.8 },
  { x: 66, y: 66, label: 'Constanța', main: false, delay: 2.4 },
]

const HUBS = [
  { city: 'București', role: 'HQ · Showroom & Service', load: 100 },
  { city: 'Cluj-Napoca', role: 'Hub tehnic regional', load: 72 },
  { city: 'Timișoara', role: 'Hub tehnic regional', load: 58 },
]

// Ora locală din București + dacă programul e deschis (L-V, 09:00-18:00)
function getBucharestState() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Bucharest',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (type) => parts.find((p) => p.type === type)?.value ?? '00'
  const hour = Number(get('hour')) % 24
  const weekday = get('weekday')
  const isWeekday = !['Sat', 'Sun'].includes(weekday)

  return {
    time: `${String(hour).padStart(2, '0')}:${get('minute')}:${get('second')}`,
    isOpen: isWeekday && hour >= 9 && hour < 18,
  }
}

export default function ContactRadar() {
  const [state, setState] = useState(getBucharestState)

  useEffect(() => {
    const id = setInterval(() => setState(getBucharestState()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-3xl border border-cyber-cyan/20 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden relative"
      >
        <div className="absolute -left-32 -top-32 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />

        {/* ---------------- RADAR ---------------- */}
        <div className="relative w-full max-w-[420px] mx-auto aspect-square">
          {/* Inele concentrice */}
          {[100, 74, 48, 22].map((size, i) => (
            <motion.div
              key={size}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-cyan/20"
              style={{ width: `${size}%`, height: `${size}%` }}
            />
          ))}

          {/* Crosshair */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent" />

          {/* Fascicul care baleiază continuu */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(0,240,255,0.35) 0deg, rgba(0,240,255,0.06) 30deg, transparent 60deg, transparent 360deg)',
              maskImage: 'radial-gradient(circle, black 0%, black 50%, transparent 50%)',
              WebkitMaskImage: 'radial-gradient(circle, black 0%, black 50%, transparent 50%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Blip-uri */}
          {BLIPS.map((blip) => (
            <div
              key={blip.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
            >
              <motion.span
                className={`block rounded-full ${blip.main ? 'w-3 h-3 bg-cyber-cyan' : 'w-2 h-2 bg-cyber-ice'}`}
                style={{ boxShadow: '0 0 12px rgba(0,240,255,0.9)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: blip.delay, ease: 'easeInOut' }}
              />
              {/* Undă care se propagă din blip */}
              <motion.span
                className="absolute inset-0 rounded-full border border-cyber-cyan/60"
                animate={{ scale: [1, 4], opacity: [0.7, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: blip.delay, ease: 'easeOut' }}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono text-cyber-cyan/0 group-hover:text-cyber-cyan/90 transition-colors duration-300">
                {blip.label}
              </span>
            </div>
          ))}

          {/* Coordonate decorative */}
          <span className="absolute top-0 left-0 text-[9px] font-mono text-slate-600">44.43°N</span>
          <span className="absolute bottom-0 right-0 text-[9px] font-mono text-slate-600">26.10°E</span>
        </div>

        {/* ---------------- INFO ---------------- */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyber-cyan">Rețea operațională</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-5 tracking-tight">
            Suport local, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">acoperire națională</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Echipele noastre de service intervin din trei hub-uri regionale, cu piese de schimb pe stoc și
            timp de deplasare sub 24h în majoritatea județelor.
          </p>

          {/* Status live + ceas */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-navy-950/80 border border-slate-700">
              <span className="relative flex w-2.5 h-2.5">
                <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${state.isOpen ? 'bg-green-400' : 'bg-orange-400'}`} />
                <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${state.isOpen ? 'bg-green-400' : 'bg-orange-400'}`} />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                {state.isOpen ? 'Program deschis' : 'În afara programului'}
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-full bg-navy-950/80 border border-slate-700 flex items-center gap-2.5">
              <i className="fa-regular fa-clock text-cyber-cyan text-xs"></i>
              <span className="text-xs font-mono tracking-widest text-white tabular-nums">{state.time}</span>
              <span className="text-[10px] font-mono text-slate-500">BUCUREȘTI</span>
            </div>
          </div>

          {/* Hub-uri cu bare de încărcare animate */}
          <div className="space-y-4">
            {HUBS.map((hub, i) => (
              <motion.div
                key={hub.city}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="group"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-bold text-white">{hub.city}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{hub.role}</span>
                </div>
                <div className="h-[3px] w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${hub.load}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-cyber-cyan to-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
