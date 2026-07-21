import { motion } from 'framer-motion'
import './MissingYouSection.css'

const lines = [
  'يعني البيت حاسس إنه فاضي من غيرك',
  'يعني بدور عليكي وسط أي زحمة',
  'يعني بابص في التليفون كل شوية أشوف رديتي ولا لأ',
  'يعني مش بتيجي منامة وانتي في بالي',
  'يعني بحس إني ناقص حاجة، وأنتي هي الحاجة دي',
  'يعني حتى لما بضحك مع الناس، جواني بفكر فيكي',
  'يعني بزهق بسرعة من غير صوتك',
  'يعني كل حاجة بتفكرني بيكي',
  'يعني انتي أول واحدة أفكر فيها اول ما اصحى، وآخر واحدة قبل ما انام',
  'يعني صوتك بس اللي بيريحني، ولو غاب شوية بحس إن يومي ناقص حاجة',
  'يعني من غيرك حاسس إني تايه، وانتي اللي بترجعيني لنفسي',
]

export default function MissingYouSection() {
  return (
    <section className="missing-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">وحشتيني</span>
        <h2 className="section-title">كلمة وحشتيني دي مش سهلة خالص</h2>
        <p className="section-subtitle">
          فيها معاني كتير أوي، خليكي معايا لحد آخرها ♥
        </p>
      </motion.div>

      <div className="missing-list">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="missing-line"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <span className="missing-heart">♥</span>
            <span className="missing-word">وحشتيني</span>
            <span className="missing-text">{line}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="missing-closing"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        بس خلاصة الكلام كله.. وحشتيني بجد 😂♥♥
      </motion.p>
    </section>
  )
}
