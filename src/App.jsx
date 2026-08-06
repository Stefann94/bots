import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalCanvas from './components/GlobalCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RobotsPage from './pages/RobotsPage'

function App() {
  return (
    <BrowserRouter>
      <GlobalCanvas />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/umanoizi" element={<RobotsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
