<<<<<<< HEAD
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Footer.css'

// دخول سري للوحة التحكم: دوسي على القلب ده 5 مرات بسرعة (خلال 3 ثواني)
const TAPS_REQUIRED = 5
const TAP_WINDOW_MS = 3000

export default function Footer() {
  const navigate = useNavigate()
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  const handleHeartTap = () => {
    tapCount.current += 1

    if (tapTimer.current) clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0
    }, TAP_WINDOW_MS)

    if (tapCount.current >= TAPS_REQUIRED) {
      tapCount.current = 0
      clearTimeout(tapTimer.current)
      navigate('/admin')
    }
  }

=======
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
>>>>>>> 71594543fe94d5b17c9ef0eeb97950848b0977fe
  return (
    <footer className="footer">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
<<<<<<< HEAD
        <div
          className="footer-heart"
          onClick={handleHeartTap}
          role="button"
          tabIndex={-1}
          aria-hidden="true"
        >
          ♥
        </div>
=======
        <div className="footer-heart">♥</div>
>>>>>>> 71594543fe94d5b17c9ef0eeb97950848b0977fe
        <p className="footer-text">
          صُمم بكل حب لـ <span className="footer-name">هاجر</span>
        </p>
        <p className="footer-year">2026 ©</p>
      </motion.div>
    </footer>
  )
}
