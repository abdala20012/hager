import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './GallerySection.css'

// لو عايز تضيفي صور بالطريقة القديمة (من غير لوحة تحكم):
// حطي الصور في مجلد public/images وسميهم photo1.jpg لحد photo11.jpg
// لكن الأسهل: استخدمي لوحة التحكم على /admin عشان تضيفي وتمسحي صور بسهولة

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

const FALLBACK_CAPTIONS = [
  'أول مرة شفتك فيها',
  'أحلى ابتسامة شفتها في حياتي',
  'لحظة مش هتتنسي أبداً',
  'في عينيكي بشوف كل حاجة حلوة',
  'انتي حياتي كلها بصراحة',
  'بحبك مهما حصل بينا',
  'وحشتيني حتى وإحنا قاعدين مع بعض',
  'انتي أمان قلبي',
  'يوم من أحلى الأيام اللي عشتها',
  'أحسن حاجة حصلت في حياتي',
  'وده هيفضل زي ما هو.. بحبك',
]
const PLACEHOLDERS = ['♥', '✦', '☾', '♡', '✿', '★', '❀', '✧', '♥', '☆', '✿']

function LocalPhoto({ id, caption, placeholder }) {
  const [extIndex, setExtIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) setExtIndex(extIndex + 1)
    else setFailed(true)
  }

  return (
    <div className="photo-placeholder">
      {!failed ? (
        <img
          src={`/images/photo${id}.${EXTENSIONS[extIndex]}`}
          alt={caption}
          onError={handleError}
          loading="lazy"
        />
      ) : (
        <span className="placeholder-icon">{placeholder}</span>
      )}
    </div>
  )
}

function RemotePhoto({ url, caption }) {
  return (
    <div className="photo-placeholder">
      <img src={url} alt={caption} loading="lazy" />
    </div>
  )
}

export default function GallerySection() {
  const [remotePhotos, setRemotePhotos] = useState(null) // null = لسه بيحمل

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setRemotePhotos([])
      return
    }
    supabase
      .from('gallery_photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => setRemotePhotos(data || []))
      .catch(() => setRemotePhotos([]))
  }, [])

  const useRemote = remotePhotos && remotePhotos.length > 0

  const localPhotos = FALLBACK_CAPTIONS.map((caption, i) => ({
    id: i + 1,
    caption,
    placeholder: PLACEHOLDERS[i],
  }))

  return (
    <section className="gallery-section" id="gallery">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">معرض ذكرياتنا</span>
        <h2 className="section-title">لحظات لا تُنسى</h2>
        <p className="section-subtitle">كل صورة بتحكي قصة حب لوحدها</p>
      </motion.div>

      <div className="gallery-grid">
        {useRemote
          ? remotePhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="gallery-card"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <RemotePhoto url={photo.url} caption={photo.caption} />
                {photo.caption && <div className="photo-caption">{photo.caption}</div>}
              </motion.div>
            ))
          : localPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="gallery-card"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <LocalPhoto {...photo} />
                <div className="photo-caption">{photo.caption}</div>
              </motion.div>
            ))}
      </div>
    </section>
  )
}
