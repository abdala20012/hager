import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './EngagementCountdown.css'

const ENGAGEMENT_DATE = new Date('2026-08-07T00:00:00')

function getRemaining() {
  const now = new Date()
  const diffMs = Math.max(0, ENGAGEMENT_DATE - now)

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, done: diffMs <= 0 }
}

export default function EngagementCountdown() {
  const [remaining, setRemaining] = useState(getRemaining())

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { label: 'يوم', value: remaining.days },
    { label: 'ساعة', value: remaining.hours },
    { label: 'دقيقة', value: remaining.minutes },
    { label: 'ثانية', value: remaining.seconds },
  ]

  return (
    <section className="engagement-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">إن شاء الله</span>
        <h2 className="section-title">باقي كام يوم على يوم خطوبتنا</h2>
        <p className="section-subtitle">7 / 8 / 2026 ♥ اليوم اللي هيبقى بداية رسمية لحكايتنا</p>
      </motion.div>

      {remaining.done ? (
        <motion.p
          className="engagement-done"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          مبروك يا حياتي.. النهارده يوم خطوبتنا ♥♥♥
        </motion.p>
      ) : (
        <div className="engagement-grid">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              className="engagement-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="engagement-value">{unit.value}</span>
              <span className="engagement-label">{unit.label}</span>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
