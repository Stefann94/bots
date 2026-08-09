import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

// Cât stă aprins fiecare oraș înainte să treacă la următorul
const CYCLE_MS = 4000

// Secvența de pornire: fasciculul face un tur, iar fiecare oraș se aprinde
// exact când trece peste el.
const ACQ_START = 0.35 // când începe achiziția, după ce scopul s-a deschis
const ACQ_SPAN = 2.1 // cât durează turul complet

// Unghiul orașului față de ora 12, în sensul acelor de ceas. Dă ordinea
// în care fasciculul îl întâlnește.
function sweepAngle(x, y) {
  const dx = x - 50
  const dy = y - 50
  if (dx === 0 && dy === 0) return 0
  return (((Math.atan2(dx, -dy) * 180) / Math.PI) + 360) % 360
}

// Orașele: alimentează și blip-urile de pe radar, și lista din dreapta.
// x/y sunt procente în interiorul radarului, București e în centru.
// Doar București + Cluj + Timișoara sunt hub-uri (vezi textul: „trei hub-uri”).
const CITIES = [
  { name: 'București', role: 'HQ · Showroom & Service', load: 100, x: 50, y: 50, main: true },
  { name: 'Cluj-Napoca', role: 'Hub tehnic regional', load: 72, x: 28, y: 32 },
  { name: 'Timișoara', role: 'Hub tehnic regional', load: 58, x: 18, y: 55 },
  { name: 'Brașov', role: 'Punct de service', load: 64, x: 47, y: 35 },
  { name: 'Sibiu', role: 'Punct de service', load: 52, x: 34, y: 44 },
  { name: 'Constanța', role: 'Punct de service', load: 47, x: 78, y: 62 },
  { name: 'Craiova', role: 'Punct de service', load: 44, x: 32, y: 70 },
  { name: 'Galați', role: 'Punct de service', load: 41, x: 73, y: 44 },
  { name: 'Piatra Neamț', role: 'Punct de service', load: 39, x: 67, y: 28 },
  { name: 'Oradea', role: 'Punct de service', load: 36, x: 17, y: 36 },
  // `acq` = momentul în care fasciculul ajunge la oraș, deci când se aprinde
].map((c) => ({ ...c, acq: ACQ_START + (sweepAngle(c.x, c.y) / 360) * ACQ_SPAN }))

// Fiecare element din coloana de text urcă scurt la intrare
const INFO_ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

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
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [booted, setBooted] = useState(false)

  const listRef = useRef(null)
  const itemRefs = useRef([])
  const rootRef = useRef(null)
  // `amount` = cât din card trebuie să fie vizibil ca să pornească secvența.
  // Prag pe procent, nu pe pixeli: se comportă la fel și la coborâre, și la
  // urcare, fără margini separate sus/jos. La 30% ai trecut de prima parte a
  // chenarului, deci mai ai de derulat cât rulează animația.
  // `once` lipsește intenționat (implicit false): secvența se reia de fiecare
  // dată când revii la secțiune, din orice direcție.
  const inView = useInView(rootRef, { amount: 0.3 })

  useEffect(() => {
    const id = setInterval(() => setState(getBucharestState()), 1000)
    return () => clearInterval(id)
  }, [])

  // Secvența de achiziție rulează la fiecare intrare în ecran. La ieșire
  // resetăm, ca reintrarea să reia turul de la capăt, cu București aprins
  // primul, nu din orașul unde rămăsese rotația.
  useEffect(() => {
    if (!inView) {
      setBooted(false)
      setActive(0)
      return
    }
    const id = setTimeout(() => setBooted(true), (ACQ_START + ACQ_SPAN) * 1000)
    return () => clearTimeout(id)
  }, [inView])

  // Rotește orașul activ la fiecare 4s, dar abia după ce toate orașele s-au
  // aprins. Se repornește de la zero ori de câte ori se schimbă `active`,
  // deci un hover reia numărătoarea de la acel oraș.
  useEffect(() => {
    if (!booted || hovered) return
    const id = setTimeout(() => setActive((i) => (i + 1) % CITIES.length), CYCLE_MS)
    return () => clearTimeout(id)
  }, [active, hovered, booted])

  // Ține orașul activ vizibil în lista cu scroll (mișcă doar containerul,
  // niciodată pagina).
  useEffect(() => {
    const box = listRef.current
    const el = itemRefs.current[active]
    if (!box || !el) return
    // Masurat prin rect-uri, nu prin offsetTop: offsetTop se raporteaza la
    // primul stramos pozitionat, care aici nu e containerul listei.
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
    const bottom = top + el.offsetHeight
    if (top < box.scrollTop) {
      box.scrollTo({ top, behavior: 'smooth' })
    } else if (bottom > box.scrollTop + box.clientHeight) {
      box.scrollTo({ top: bottom - box.clientHeight, behavior: 'smooth' })
    }
  }, [active])

  const focusCity = (i) => {
    setHovered(true)
    setActive(i)
  }

  // Întârzierile compun secvența doar la intrare. La ieșire trebuie să se
  // stingă repede și deodată, altfel un punct cu delay 2,4s ar rămâne aprins
  // după ce ai plecat, iar la revenire secvența ar porni dintr-o stare murdară.
  const seq = (t) => (inView ? t : { duration: 0.25, ease: 'easeOut' })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        ref={rootRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-3xl border border-cyber-cyan/20 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden relative"
      >
        <div className="absolute -left-32 -top-32 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />

        {/* ---------------- RADAR ---------------- */}
        {/* Scopul se deschide circular din centru, ca un ecran care pornește */}
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          animate={inView
            ? { clipPath: 'circle(100% at 50% 50%)', opacity: 1 }
            : { clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[420px] mx-auto aspect-square"
        >
          {/* Inele concentrice */}
          {[100, 74, 48, 22].map((size, i, arr) => (
            <motion.div
              key={size}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              // Array-ul începe cu inelul mare, deci inversăm indexul ca
              // inelele să se desfacă dinspre centru spre exterior.
              transition={seq({ delay: 0.1 + (arr.length - 1 - i) * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] })}
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
            initial={{ opacity: 0 }}
            animate={{ rotate: 360, opacity: inView ? 1 : 0 }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.9, delay: 0.25 },
            }}
          />

          {/* Blip-uri */}
          {CITIES.map((city, i) => {
            const isActive = i === active
            // Orașele din dreapta radarului primesc eticheta în stânga,
            // ca să nu iasă din card.
            const flip = city.x > 58

            return (
              <div
                key={city.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
              >
                <motion.div
                  className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  // Ușor overshoot: punctul „se fixează”, nu doar apare
                  transition={seq({ delay: city.acq, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] })}
                  onMouseEnter={() => focusCity(i)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <span className="relative flex items-center justify-center">
                    <motion.span
                      className={`block rounded-full ${city.main ? 'w-3 h-3 bg-cyber-cyan' : 'w-2 h-2 bg-cyber-ice'}`}
                      style={{ boxShadow: '0 0 12px rgba(0,240,255,0.9)' }}
                      // Doar puls de scalare, fara oscilatie de opacitate:
                      // cu 10 puncte, clipitul devenea deranjant.
                      animate={{ scale: isActive ? [1, 1.8, 1] : [1, 1.4, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: city.acq, ease: 'easeInOut' }}
                    />
                    {/* Undă care se propagă din blip. Porneste si se termina la
                        opacitate 0: altfel, la reluarea buclei, inelul reapare
                        brusc exact peste punct si citeste ca un flash alb. */}
                    <motion.span
                      className="absolute inset-0 rounded-full border border-cyber-cyan/60"
                      animate={{ scale: [1, 2.5, 4], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: city.acq, ease: 'easeOut' }}
                    />
                    {/* Reticul de achiziție: se strânge o singură dată peste
                        punct, în momentul în care fasciculul îl prinde. */}
                    <motion.span
                      className="absolute inset-0 rounded-full border border-cyber-cyan"
                      initial={{ scale: 3.4, opacity: 0 }}
                      animate={inView
                        ? { scale: [3.4, 1], opacity: [0, 0.9, 0] }
                        : { scale: 3.4, opacity: 0 }}
                      transition={seq({ delay: city.acq, duration: 0.55, ease: 'easeOut' })}
                    />
                    {/* Halou care marchează orașul activ */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          // Curba blanda: [0.16,1,0.3,1] consuma aproape tot
                          // fade-ul in primele 20% si haloul pocnea vizibil
                          // la fiecare schimbare de oras.
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className="absolute -inset-2 rounded-full border border-cyber-cyan/70"
                          style={{ boxShadow: '0 0 16px rgba(0,240,255,0.45)' }}
                        />
                      )}
                    </AnimatePresence>
                  </span>

                  {/* Eticheta: una singură pe radar, a orașului activ */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: flip ? 6 : -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: flip ? 6 : -6 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono text-cyber-cyan pointer-events-none ${
                          flip ? 'right-full mr-1 text-right' : 'left-full ml-1'
                        }`}
                        style={{ textShadow: '0 0 10px rgba(0,240,255,0.6)' }}
                      >
                        {city.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )
          })}

          {/* Coordonate decorative */}
          <span className="absolute top-0 left-0 text-[9px] font-mono text-slate-600">44.43°N</span>
          <span className="absolute bottom-0 right-0 text-[9px] font-mono text-slate-600">26.10°E</span>
        </motion.div>

        {/* ---------------- INFO ---------------- */}
        {/* Intră eșalonat, cât timp radarul își face turul */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
          }}
        >
          <motion.span variants={INFO_ITEM} className="block text-[11px] font-mono uppercase tracking-[0.25em] text-cyber-cyan">Rețea operațională</motion.span>
          <motion.h2 variants={INFO_ITEM} className="text-3xl md:text-4xl font-black text-white mt-3 mb-5 tracking-tight">
            Suport local, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">acoperire națională</span>
          </motion.h2>
          <motion.p variants={INFO_ITEM} className="text-slate-400 leading-relaxed mb-8">
            Echipele noastre de service intervin din trei hub-uri regionale, cu piese de schimb pe stoc și
            timp de deplasare sub 24h în majoritatea județelor.
          </motion.p>

          {/* Status live + ceas */}
          <motion.div variants={INFO_ITEM} className="flex flex-wrap items-center gap-4 mb-8">
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
          </motion.div>

          {/* Lista orașelor: 3 vizibile, restul la scroll */}
          <motion.div
            variants={INFO_ITEM}
            ref={listRef}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.35) transparent' }}
            className="max-h-[8.25rem] overflow-y-auto pr-3 space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-slate-800/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyber-cyan/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyber-cyan/60"
          >
            {CITIES.map((city, i) => {
              const isActive = i === active

              return (
                <div key={city.name} ref={(el) => { itemRefs.current[i] = el }}>
                  <div className="flex justify-between items-baseline mb-2 gap-3">
                    <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-cyber-cyan' : 'text-white'}`}>
                      {city.name}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-cyber-cyan/70' : 'text-slate-500'}`}>
                      {city.role}
                    </span>
                  </div>
                  <div className="h-[3px] w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${city.load}%` } : { width: 0 }}
                      transition={seq({ duration: 1.2, delay: 0.75 + i * 0.05, ease: [0.16, 1, 0.3, 1] })}
                      className="h-full bg-gradient-to-r from-cyber-cyan to-blue-500 rounded-full transition-shadow duration-300"
                      style={isActive ? { boxShadow: '0 0 10px rgba(0,240,255,0.7)' } : undefined}
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
