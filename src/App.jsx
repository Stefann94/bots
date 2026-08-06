import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalCanvas from './components/GlobalCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RobotsPage from './pages/RobotsPage'
import HumanoidsPage from './pages/HumanoidsPage'
import QuadrupedsPage from './pages/QuadrupedsPage'
import AIPage from './pages/AIPage'

function App() {
  return (
    <BrowserRouter>
      <GlobalCanvas />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modele-3d" element={<RobotsPage />} />
        <Route path="/robots/humanoids" element={<HumanoidsPage />} />
        <Route path="/robots/quadrupeds" element={<QuadrupedsPage />} />
        <Route path="/robots/ai" element={<AIPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
