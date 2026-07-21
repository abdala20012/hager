import { motion } from 'framer-motion'
import './PromiseSection.css'

export default function PromiseSection() {
  return (
    <section className="promise-section">
      <motion.div
        className="promise-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <span className="section-tag">وعد</span>
        <p className="promise-text">
          هوعدك إني هفضل زي ما انتي عارفاني، اللي بيحبك وملوش غيرك،
          وهفضل جنبك في كل حاجة، سندك وضهرك، والكتف اللي تريحي عليها دماغك.
        </p>
      </motion.div>

      <motion.div
        className="poem-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <span className="section-tag">طول العمر</span>
        <p className="poem-text">
          هفضل أحبك بنفس الشكل ده، مش أكتر ومش أقل<br />
          وهفضل حاسس إنك بيتي، وإنك الأمان اللي بدور عليه ♥<br /><br />
          مهما الأيام اتغيرت وحياتنا اختلفت<br />
          هفضل شايفك زي أول يوم بالظبط<br />
          حتى لو كبرنا وكل حاجة حوالينا اتغيرت<br />
          هيفضل حبي ليكي زي ما هو، ملوش نهاية<br /><br />
          هفضل مبسوط إني عرفتك، ومقدّر إنك اخترتيني<br />
          ومستنيك في كل مرحلة جاية في حياتنا ♥<br /><br />
          مهما تعبنا، ومهما الظروف قست علينا<br />
          هفضل ماسك إيدك ومكملين<br />
          لغاية ما نبقى قاعدين عجايز على بعض<br />
          نفتكر كل ده ونضحك عليه<br /><br />
          هفضل بحبك بطريقتي، وبشكلي اللي انتي متعودة عليه<br />
          وهفضل حاسس إني محظوظ إني لقيتك ♥♥♥
        </p>
      </motion.div>
    </section>
  )
}
