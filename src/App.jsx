import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import GlobalCanvas from './components/GlobalCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RobotsPage from './pages/RobotsPage'
import HumanoidsPage from './pages/HumanoidsPage'
import QuadrupedsPage from './pages/QuadrupedsPage'
import AIPage from './pages/AIPage'
import ContactPage from './pages/ContactPage'

import { useGLTF } from '@react-three/drei'

// Preload globale pentru viteza de încărcare: browserul le va descărca imediat
useGLTF.preload('/robot.glb')
useGLTF.preload('/models/quadruped.glb')

function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <GlobalCanvas />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modele-3d" element={<RobotsPage />} />
        <Route path="/robots/humanoids" element={<HumanoidsPage />} />
        <Route path="/robots/quadrupeds" element={<QuadrupedsPage />} />
        <Route path="/robots/ai" element={<AIPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
