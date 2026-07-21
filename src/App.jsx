import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuroraBackground from './components/AuroraBackground'
import FloatingHearts from './components/FloatingHearts'
import PasswordGate from './components/PasswordGate'
import HeroSection from './components/HeroSection'
import CounterSection from './components/CounterSection'
import EngagementCountdown from './components/EngagementCountdown'
import MeaningSection from './components/MeaningSection'
import MissingYouSection from './components/MissingYouSection'
import GallerySection from './components/GallerySection'
import LoveCardsSection from './components/LoveCardsSection'
import PromiseSection from './components/PromiseSection'
import VoiceMessageSection from './components/VoiceMessageSection'
import MessageSection from './components/MessageSection'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'
import AdminDashboard from './admin/AdminDashboard'

function LoveSite() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <>
      <AuroraBackground />
      <FloatingHearts count={20} />

      <main>
        <HeroSection />
        <CounterSection />
        <EngagementCountdown />
        <MeaningSection />
        <MissingYouSection />
        <GallerySection />
        <LoveCardsSection />
        <PromiseSection />
        <VoiceMessageSection />
        <MessageSection />
        <Footer />
      </main>

      <MusicPlayer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/*" element={<LoveSite />} />
    </Routes>
  )
}
