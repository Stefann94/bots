import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function ObserverRobot() {
  const groupRef = useRef()
  const headRef = useRef()
  const neckRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const chestRef = useRef()
  const buttonRef = useRef()
  const eyesRef = useRef()
  
  const flyTrigger = useRef(false)
  const flyStartTime = useRef(null)
  
  // Materialele care se aprind la hover. Le mutăm direct, fără state React:
  // un setState pe pointermove ar re-randa arborele la fiecare mișcare.
  const discMatRef = useRef()
  const bezelMatRef = useRef()
  const hovering = useRef(false)

  // Toate obiectele three.js sunt alocate o singură dată. Înainte se creau
  // un Vector3 la fiecare render si încă unul plus patru Quaternion-uri
  // în FIECARE cadru - 300+ obiecte pe secundă date la garbage collector,
  // exact ce produce micro-blocaje.
  const tmp = useMemo(() => ({
    target: new THREE.Vector3(),
    mouse: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    qFrom: new THREE.Quaternion(),
    qTo: new THREE.Quaternion(),
    hitC: new THREE.Vector3(),
    hitX: new THREE.Vector3(),
    hitY: new THREE.Vector3(),
  }), [])
  const { viewport } = useThree()

  const isMobile = viewport.width < 5
  
  // Calculăm un scale dinamic: mic pe laptopuri (0.45), puțin mai mare pe ecrane ultrawide (max 0.75)
  const scale = isMobile ? 0 : Math.min(0.75, Math.max(0.45, viewport.width * 0.06))
  
  // Îl poziționăm dinamic, păstrând o margine ("padding") proporțională cu mărimea lui
  const posX = (viewport.width / 2) - (scale * 1.8)
  const posY = -(viewport.height / 2) + (scale * 1.6)

  // Folosim un listener nativ pe window pentru a garanta tracking-ul,
  // indiferent de pointerEvents="none" pe Canvas.
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (e) => {
      // Normalizăm coordonatele la -1 -> 1
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    
    // Folosim exact starea calculată în useFrame: altfel butonul s-ar putea
    // aprinde după o regulă și accepta click-ul după alta.
    const handleClick = () => {
      if (isMobile || !hovering.current) return
      flyTrigger.current = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('click', handleClick)
    }
  }, [isMobile])

  useFrame((state) => {
    if (isMobile) return

    const t = state.clock.elapsedTime

    // 0. Animația de zbor la click
    if (flyTrigger.current) {
      flyStartTime.current = t
      flyTrigger.current = false
    }

    let extraY = 0
    if (flyStartTime.current !== null) {
      const flyDuration = 2.5 // Durata totală a zborului
      const elapsed = t - flyStartTime.current
      if (elapsed < flyDuration) {
        const progress = elapsed / flyDuration
        
        // Prima jumătate: accelerează în sus (0 la +20)
        if (progress < 0.5) {
          const p = progress * 2 // de la 0 la 1
          extraY = p * p * p * 20
        } 
        // A doua jumătate: vine de jos (-20 la 0) decelărând
        else {
          const p = (progress - 0.5) * 2 - 1 // de la -1 la 0
          extraY = (p * p * p) * 20
        }
        
        // Tilt pe spate constant care revine ușor la 0
        if (groupRef.current) {
          groupRef.current.rotation.x = -Math.sin(progress * Math.PI) * 0.5
        }
      } else {
        flyStartTime.current = null
        if (groupRef.current) groupRef.current.rotation.x = 0
      }
    }

    // 1. Efectul de respirație (Mișcare Sus-Jos a întregului corp)
    const breathOffset = Math.sin(t * 2.5) * 0.08
    if (groupRef.current) {
      groupRef.current.position.y = posY + breathOffset + extraY
    }

    // 2. Extinderea pieptului (Respirație)
    if (chestRef.current) {
      // Amplitudine Z redusă de la 0.05: suprafața pieptului se mișca destul
      // cât să înghită și să scoată la loc butonul și fantele, ceea ce citea
      // ca o animație pe piept.
      chestRef.current.scale.z = 1 + Math.sin(t * 2.5) * 0.02
      chestRef.current.scale.x = 1 + Math.sin(t * 2.5) * 0.02
    }

    // 3. Mișcarea brațelor (Sincronizată cu respirația)
    if (leftArmRef.current && rightArmRef.current) {
      // Rotire ușoară din umeri
      leftArmRef.current.rotation.z = Math.sin(t * 2.5) * 0.05 + 0.1
      leftArmRef.current.rotation.x = Math.sin(t * 1.25) * 0.1
      
      rightArmRef.current.rotation.z = -Math.sin(t * 2.5) * 0.05 - 0.1
      rightArmRef.current.rotation.x = Math.sin(t * 1.25) * 0.1
    }

    // 4. Tracking Cursor pentru Cap (Sistem geometric precis - Intersecție Raycast)
    // Calculăm vectorul de direcție de la cameră prin poziția mouse-ului
    const { target, mouse, dir, qFrom, qTo } = tmp
    mouse.set(pointer.current.x, pointer.current.y, 0.5).unproject(state.camera)
    dir.copy(mouse).sub(state.camera.position).normalize()

    // Găsim intersecția razei cu un plan virtual foarte apropiat de el (Z = 1.0)
    // Aducând planul mai aproape, unghiurile devin mult mai abrupte/sensibile
    const targetZ = 1.0
    const distance = (targetZ - state.camera.position.z) / dir.z
    target.copy(state.camera.position).add(dir.multiplyScalar(distance))

    // Amplificăm mișcarea stânga/dreapta pentru o "sensibilitate" ridicată
    // Deoarece în dreapta ecranul se termină repede, exagerăm intenția utilizatorului!
    if (target.x > posX) {
      target.x = posX + (target.x - posX) * 3.5 // Hiper-sensibil în dreapta
    } else {
      target.x = posX + (target.x - posX) * 1.5 // Foarte sensibil în stânga
    }

    // Acelasi rezultat ca înainte, dar fără .clone(): reutilizăm două
    // quaternion-uri preallocate.
    if (headRef.current) {
      qFrom.copy(headRef.current.quaternion)
      headRef.current.lookAt(target)
      qTo.copy(headRef.current.quaternion)
      headRef.current.quaternion.copy(qFrom).slerp(qTo, 0.4) // Reflexe fulgerătoare
    }

    if (neckRef.current) {
      qFrom.copy(neckRef.current.quaternion)
      neckRef.current.lookAt(target)
      qTo.copy(neckRef.current.quaternion)
      neckRef.current.quaternion.copy(qFrom).slerp(qTo, 0.2) // Reflexe fulgerătoare
    }
    
    // 5. Butonul se aprinde la hover, în loc să pulseze singur la 3 secunde.
    // Mutăm direct emissiveIntensity pe material: fără state, fără re-render.
    if (discMatRef.current) {
      const tinta = hovering.current ? 2.8 : 0.55
      const cur = discMatRef.current.emissiveIntensity
      if (Math.abs(cur - tinta) > 0.005) {
        discMatRef.current.emissiveIntensity = cur + (tinta - cur) * 0.18
        if (bezelMatRef.current) {
          bezelMatRef.current.emissiveIntensity = discMatRef.current.emissiveIntensity * 0.42
        }
      }
    }
    
    // 5b. Clipit: scurt, rar, cu o a doua clipire ocazională - static, ochii
    // aprinși continuu citesc ca un ecran, nu ca o privire.
    if (eyesRef.current) {
      const cycle = t % 4.2
      let deschidere = 1
      if (cycle < 0.13) deschidere = Math.abs(Math.cos((cycle / 0.13) * Math.PI))
      else if (cycle > 0.24 && cycle < 0.37) deschidere = Math.abs(Math.cos(((cycle - 0.24) / 0.13) * Math.PI))
      eyesRef.current.scale.y = Math.max(0.06, deschidere)
    }

    // 6. Hover fără raycast: proiectăm centrul butonului pe ecran și comparăm
    // distanța până la cursor. Trei proiecții de vector pe cadru, față de o
    // traversare completă de geometrie.
    // Rulează în FIECARE cadru intenționat: robotul respiră, deci butonul
    // urcă și coboară singur. Dacă am verifica doar la mișcarea mouse-ului,
    // starea ar rămâne veche când butonul ajunge sub un cursor nemișcat.
    if (buttonRef.current) {
      const { hitC, hitX, hitY } = tmp
      buttonRef.current.getWorldPosition(hitC)
      // Puțin peste bizou: butonul desenat are ~28px pe ecran, prea puțin
      // pentru o țintă de click confortabilă.
      const raza = 0.27 * scale
      hitX.set(hitC.x + raza, hitC.y, hitC.z)
      hitY.set(hitC.x, hitC.y + raza, hitC.z)
      hitC.project(state.camera)
      hitX.project(state.camera)
      hitY.project(state.camera)

      // Raze separate pe X și Y: ecranul e mai lat decât înalt, deci un cerc
      // în lume devine elipsă în coordonate normalizate.
      const rx = Math.abs(hitX.x - hitC.x)
      const ry = Math.abs(hitY.y - hitC.y)
      const dx = (pointer.current.x - hitC.x) / (rx || 1)
      const dy = (pointer.current.y - hitC.y) / (ry || 1)
      const peButon = dx * dx + dy * dy <= 1

      if (peButon !== hovering.current) {
        hovering.current = peButon
        // Scriem în DOM doar la schimbarea stării, nu continuu.
        document.body.style.cursor = peButon ? 'pointer' : ''
      }
    }
  })

  // Materiale.
  // Carcasa albă e plastic lăcuit, nu metal: un robot alb real (Ameca, EVE)
  // e dielectric. metalness mare pe alb dădea un gri mat, nu luciu.
  // clearcoat cere meshPhysicalMaterial - pe meshStandardMaterial era ignorat.
  const shellWhite = {
    color: '#eef2f7',
    metalness: 0.05,
    roughness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.15,
  }

  // Panouri interioare, în umbră: aceeași vopsea, dar fără luciu direct
  const shellShade = {
    color: '#c4cedb',
    metalness: 0.05,
    roughness: 0.55,
  }

  const darkJoint = {
    color: '#2b3138',
    metalness: 0.6,
    roughness: 0.35,
  }

  // Sticla ecranului: aproape neagră, foarte lucioasă
  const glassDark = {
    color: '#05070b',
    metalness: 0.15,
    roughness: 0.04,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 1.6,
  }

  const cyanGlow = {
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 3,
    toneMapped: false
  }

  return (
    <group ref={groupRef} position={[posX, posY, 0]} scale={[scale, scale, scale]}>
      
      {/* --- TRUNCHI --- */}
      <group position={[0, -1.2, 0]}>
        {/* Structura interioară închisă, vizibilă la îmbinări. Dă impresia
            de carcasă montată pe schelet, nu de bloc turnat. */}
        <RoundedBox args={[1.28, 1.5, 0.72]} radius={0.16} smoothness={3} position={[0, 0.3, 0.04]}>
          <meshStandardMaterial {...darkJoint} />
        </RoundedBox>

        {/* Guler întunecat în jurul bazei gâtului. Cilindru cu ax vertical:
            înconjoară gâtul, nu îl taie. */}
        <mesh position={[0, 1.0, 0.04]}>
          <cylinderGeometry args={[0.34, 0.4, 0.18, 32]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>

        {/* Piept (Respiră) */}
        <RoundedBox
          ref={chestRef}
          args={[1.42, 1.16, 0.82]}
          radius={0.26}
          smoothness={4}
          position={[0, 0.42, 0.06]}
        >
          <meshPhysicalMaterial {...shellWhite} />
        </RoundedBox>

        {/* Grilă de ventilație încastrată, în locul plăcii pectorale plate:
            o tăblie albă suprapusă citea ca o bavetă. Fantele adâncite dau
            senzația de carcasă frezată. */}
        {/* Pieptul respiră: fața lui oscilează între z=0.462 și z=0.478.
            Detaliile stau în fața maximului, ca să rămână vizibile permanent -
            la 0.462 carcasa le înghițea la fiecare inspirație. */}
        {[0, 1, 2].map((k) => (
          <RoundedBox
            key={k}
            args={[0.36, 0.05, 0.035]}
            radius={0.016}
            smoothness={3}
            position={[0, 0.8 - k * 0.1, 0.492]}
          >
            <meshStandardMaterial {...darkJoint} />
          </RoundedBox>
        ))}

        {/* Cusături verticale care despart panoul central de flancuri */}
        <RoundedBox args={[0.028, 0.66, 0.028]} radius={0.011} smoothness={3} position={[-0.42, 0.48, 0.487]}>
          <meshStandardMaterial {...shellShade} />
        </RoundedBox>
        <RoundedBox args={[0.028, 0.66, 0.028]} radius={0.011} smoothness={3} position={[0.42, 0.48, 0.487]}>
          <meshStandardMaterial {...shellShade} />
        </RoundedBox>

        {/* Flancuri laterale mai închise, ca niște panouri demontabile */}
        <RoundedBox args={[0.14, 0.9, 0.5]} radius={0.06} smoothness={3} position={[-0.68, 0.42, 0.06]}>
          <meshStandardMaterial {...shellShade} />
        </RoundedBox>
        <RoundedBox args={[0.14, 0.9, 0.5]} radius={0.06} smoothness={3} position={[0.68, 0.42, 0.06]}>
          <meshStandardMaterial {...shellShade} />
        </RoundedBox>

        {/* Talie: articulație închisă, mai îngustă decât pieptul */}
        <mesh position={[0, -0.32, 0.04]}>
          <cylinderGeometry args={[0.44, 0.46, 0.58, 32]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>

        {/* Bazin, revine la carcasa albă */}
        <RoundedBox args={[1.1, 0.5, 0.72]} radius={0.2} smoothness={3} position={[0, -0.72, 0.04]}>
          <meshPhysicalMaterial {...shellWhite} />
        </RoundedBox>

        {/* Buton Go To Top (Fosta inimă) */}
        {/* z=0.50: discul ajunge la 0.52, mereu în fața pieptului care
            respiră până la 0.478. Înainte, la 0.44, butonul dispărea complet
            sub carcasă la fiecare inspirație. */}
        <group
          ref={buttonRef}
          position={[0, 0.2, 0.5]}
        >
          {/* Locaș încastrat, ca butonul să pară montat în carcasă */}
          <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.21, 0.21, 0.07, 40]} />
            <meshStandardMaterial {...darkJoint} />
          </mesh>

          {/* Inel de bizou în jurul feței cyan. Torusul stă implicit în planul
              XY, deci privește deja spre +Z: fără rotație. Se aprinde slab
              odată cu discul, ca lumina să pară că vine din locaș. */}
          <mesh position={[0, 0, 0.015]}>
            <torusGeometry args={[0.168, 0.022, 10, 28]} />
            <meshStandardMaterial
              ref={bezelMatRef}
              color="#e8eef5"
              emissive="#00f0ff"
              emissiveIntensity={0.23}
              metalness={0.1}
              roughness={0.25}
            />
          </mesh>

          {/* Fața butonului. emissiveIntensity urcă la hover, din useFrame */}
          <mesh position={[0, 0, 0.02]}>
            <circleGeometry args={[0.155, 32]} />
            <meshStandardMaterial
              ref={discMatRef}
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.55}
              roughness={0.3}
              metalness={0.1}
              toneMapped={false}
            />
          </mesh>

          {/* Săgeata, statică */}
          <group position={[0, 0, 0.032]} scale={[1, 1, 0.1]}>
            <mesh position={[0, 0.035, 0]}>
              <coneGeometry args={[0.058, 0.075, 16]} />
              <meshBasicMaterial color="#04222a" />
            </mesh>
            <mesh position={[0, -0.032, 0]}>
              <boxGeometry args={[0.038, 0.062, 0.1]} />
              <meshBasicMaterial color="#04222a" />
            </mesh>
          </group>
        </group>
      </group>

      {/* --- BRAȚE ---
          Fiecare braț: umăr sferic închis, pauldron alb rotunjit peste el,
          braț, cot vizibil ca articulație, antebraț și mână. Cotul era
          absent, iar brațul părea o singură bucată de plastic. */}
      {[-1, 1].map((lat) => (
        <group
          key={lat}
          ref={lat === -1 ? leftArmRef : rightArmRef}
          position={[lat * 0.86, -0.6, 0]}
        >
          {/* Umăr (Articulație) */}
          <mesh>
            {/* Robotul se randează la ~150px pe ecran: 32x32 segmente pe o
                sferă aproape complet acoperită de pauldron erau irosite. */}
            <sphereGeometry args={[0.24, 14, 10]} />
            <meshStandardMaterial {...darkJoint} />
          </mesh>

          {/* Pauldron: carcasă care îmbracă umărul. Raza de rotunjire era
              aproape jumătate din lățime, deci ieșea o bilă, nu un panou. */}
          <RoundedBox args={[0.44, 0.46, 0.54]} radius={0.11} smoothness={4} position={[lat * 0.05, 0.12, 0]}>
            <meshPhysicalMaterial {...shellWhite} />
          </RoundedBox>

          {/* Prelungire spre tors, ca să nu rămână gol între umăr și piept */}
          <RoundedBox args={[0.26, 0.36, 0.46]} radius={0.1} smoothness={3} position={[lat * -0.13, 0.16, 0]}>
            <meshPhysicalMaterial {...shellWhite} />
          </RoundedBox>

          {/* Braț superior */}
          <mesh position={[lat * 0.09, -0.56, 0]}>
            <capsuleGeometry args={[0.155, 0.62, 5, 14]} />
            <meshPhysicalMaterial {...shellWhite} />
          </mesh>

          {/* Cot: inel închis care marchează articulația */}
          <mesh position={[lat * 0.09, -0.97, 0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.155, 0.155, 0.12, 24]} />
            <meshStandardMaterial {...darkJoint} />
          </mesh>

          {/* Antebraț (Ușor flexat în față) */}
          <mesh position={[lat * 0.09, -1.36, 0.14]} rotation={[-0.22, 0, 0]}>
            <capsuleGeometry args={[0.13, 0.6, 5, 14]} />
            <meshPhysicalMaterial {...shellWhite} />
          </mesh>

          {/* Încheietură */}
          <mesh position={[lat * 0.09, -1.71, 0.22]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.105, 0.105, 0.1, 20]} />
            <meshStandardMaterial {...darkJoint} />
          </mesh>

          {/* Mână: lipsea complet, iar brațul se termina brusc în aer */}
          <RoundedBox
            args={[0.19, 0.26, 0.15]}
            radius={0.065}
            smoothness={3}
            position={[lat * 0.09, -1.92, 0.24]}
            rotation={[-0.22, 0, 0]}
          >
            <meshPhysicalMaterial {...shellWhite} />
          </RoundedBox>

          {/* Degetul mare, ca mâna să aibă o orientare citibilă */}
          <mesh position={[lat * 0.02, -1.9, 0.3]} rotation={[-0.22, 0, lat * 0.5]}>
            <capsuleGeometry args={[0.035, 0.08, 3, 8]} />
            <meshPhysicalMaterial {...shellWhite} />
          </mesh>
        </group>
      ))}

      {/* --- GÂT & CAP --- */}
      <group position={[0, 0, 0]} ref={neckRef}>
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.14, 0.19, 0.46, 24]} />
          <meshStandardMaterial {...darkJoint} />
        </mesh>
        {/* Inel de actuator pe gât */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.07, 24]} />
          <meshStandardMaterial {...shellShade} />
        </mesh>
      </group>

      {/* Capul privește pe +Z: lookAt orientează axa +Z spre țintă. */}
      <group position={[0, 0.38, 0]} ref={headRef}>
        {/* Cască rotunjită, în locul cutiei cu muchii ascuțite */}
        <RoundedBox args={[0.84, 0.76, 0.8]} radius={0.24} smoothness={4} position={[0, 0.02, -0.06]}>
          <meshPhysicalMaterial {...shellWhite} />
        </RoundedBox>

        {/* Fără piesă pe creștet: orice placă plată peste o cască rotunjită
            iese în afară la margini și citește ca o pălărie. Casca rămâne o
            singură suprafață continuă. */}

        {/* Locașul ecranului, încastrat în cască */}
        <RoundedBox args={[0.68, 0.54, 0.1]} radius={0.11} smoothness={4} position={[0, 0.0, 0.3]}>
          <meshStandardMaterial {...darkJoint} />
        </RoundedBox>

        {/* Sticla ecranului, ușor proeminentă și foarte lucioasă */}
        <RoundedBox args={[0.62, 0.48, 0.06]} radius={0.1} smoothness={4} position={[0, 0.0, 0.35]}>
          <meshPhysicalMaterial {...glassDark} />
        </RoundedBox>

        {/* Ochii: bare rotunjite care clipesc */}
        <group ref={eyesRef} position={[0, 0.04, 0.385]}>
          <RoundedBox args={[0.15, 0.055, 0.02]} radius={0.024} smoothness={3} position={[-0.14, 0, 0]}>
            <meshStandardMaterial {...cyanGlow} />
          </RoundedBox>
          <RoundedBox args={[0.15, 0.055, 0.02]} radius={0.024} smoothness={3} position={[0.14, 0, 0]}>
            <meshStandardMaterial {...cyanGlow} />
          </RoundedBox>
        </group>

        {/* Indicator sub ecran, ca un microfon/status */}
        <mesh position={[0, -0.15, 0.383]}>
          <circleGeometry args={[0.022, 20]} />
          <meshStandardMaterial {...cyanGlow} />
        </mesh>

        {/* „Urechi”: discuri laterale. Cilindrul are ax Y, deci rotim mesh-ul
            pe Z ca discul să privească în lateral - rotația pusă pe geometrie
            nu avea niciun efect. */}
        {[-1, 1].map((lat) => (
          <group key={lat}>
            <mesh position={[lat * 0.43, 0.02, -0.06]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.13, 0.13, 0.08, 28]} />
              <meshStandardMaterial {...darkJoint} />
            </mesh>
            <mesh position={[lat * 0.47, 0.02, -0.06]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 0.03, 20]} />
              <meshStandardMaterial {...shellShade} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
