import Hero from '../components/Hero'
import RobotSeries from '../components/RobotSeries'
import AgiBotSeries from '../components/AgiBotSeries'
import Features from '../components/Features'
import Applications from '../components/Applications'
import Specs from '../components/Specs'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main className="bg-grid-pattern relative">
      <Hero />
      <RobotSeries />
      <AgiBotSeries />
      <Features />
      <Applications />
      <Specs />
      <Contact />
    </main>
  )
}
