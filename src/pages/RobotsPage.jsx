import { motion } from 'framer-motion'
import HologramHero from '../components/HologramHero'
import BipedCategory from '../components/BipedCategory'
import QuadrupedCategory from '../components/QuadrupedCategory'
import AICategory from '../components/AICategory'

export default function RobotsPage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Ambient background glows for the page */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Holographic Intro */}
      <HologramHero />

      {/* Cinematic Category Sections (Full Width) */}
      <div className="relative z-20 w-full">
        <BipedCategory />
        <QuadrupedCategory />
        <AICategory />
      </div>
    </div>
  )
}
