import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  // اختصار سري للدخول على لوحة التحكم: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        navigate('/admin')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

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
