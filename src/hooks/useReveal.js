import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Dezvăluire la scroll, fără tremurat.
 *
 * PROBLEMA
 * `whileInView` cu `once: false` folosește același prag și la intrare, și la
 * ieșire. Când elementul se oprește exact pe prag, animația îl mișcă câteva
 * zeci de pixeli, mișcarea îl scoate înapoi din zona de declanșare, animația
 * se inversează, elementul reintră... și tot așa. Se vede ca un tremurat
 * sus-jos, cu scroll-ul oprit. Măsurat pe Home: sărituri de 9-12px, cu 4
 * schimbări de direcție în mai puțin de două secunde.
 *
 * SOLUȚIA
 * Histerezis, adică două praguri diferite:
 *   - se APRINDE la pragul obișnuit (același ca înainte, deci intrarea arată
 *     identic)
 *   - se STINGE abia când elementul a ieșit COMPLET din ecran
 *
 * Între cele două praguri nu mai există nicio buclă de reacție: orice ar face
 * animația cu poziția elementului, nu mai poate să se auto-oprească.
 * Reluarea animației la revenirea pe secțiune rămâne neschimbată.
 *
 * Se folosește exact ca perechea whileInView + viewport:
 *   const [ref, stare] = useReveal({ amount: 0.2 })
 *   <motion.div ref={ref} initial="hidden" animate={stare} variants={...}>
 *
 * Al treilea element întors e aceeași stare ca boolean, pentru componentele
 * care nu merg pe variante ci decid singure ce animează:
 *   const [ref, , vizibil] = useReveal({ amount: 0.3 })
 */
export function useReveal(optiuni) {
  const ref = useRef(null)

  // Pragul de intrare: exact opțiunile pe care le avea `viewport`.
  const laPrag = useInView(ref, optiuni)
  // Pragul de ieșire: orice fărâmă din element încă vizibilă.
  const oriceParte = useInView(ref, { amount: 'some' })

  const [vizibil, setVizibil] = useState(false)

  useEffect(() => {
    if (laPrag) setVizibil(true)
    else if (!oriceParte) setVizibil(false)
  }, [laPrag, oriceParte])

  return [ref, vizibil ? 'visible' : 'hidden', vizibil]
}
