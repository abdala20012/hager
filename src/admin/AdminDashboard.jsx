import { useEffect, useState } from 'react'
import { supabase, BUCKETS } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'
import './AdminDashboard.css'

function useSession() {
  const [session, setSession] = useState(undefined) // undefined = لسه بيتحقق

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  return session
}

export default function AdminDashboard() {
  const session = useSession()

  if (session === undefined) {
    return <div className="admin-loading">جاري التحميل...</div>
  }

  if (!session) {
    return <AdminLogin onLoggedIn={() => {}} />
  }

  return <DashboardContent />
}

function DashboardContent() {
  const [photos, setPhotos] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const loadData = async () => {
    setLoading(true)
    const [{ data: photosData }, { data: settingsData }] = await Promise.all([
      supabase.from('gallery_photos').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_settings').select('*').eq('id', 1).single(),
    ])
    setPhotos(photosData || [])
    setSettings(settingsData || null)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 3000)
  }

  // ---------- الصور ----------
  const handleAddPhoto = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from(BUCKETS.images)
      .upload(fileName, file)

    if (uploadError) {
      showMessage('حصل خطأ في رفع الصورة: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKETS.images).getPublicUrl(fileName)

    const { error: insertError } = await supabase.from('gallery_photos').insert({
      url: publicUrlData.publicUrl,
      caption: '',
      sort_order: photos.length,
    })

    if (insertError) {
      showMessage('حصل خطأ في حفظ الصورة: ' + insertError.message)
    } else {
      showMessage('اتضافت الصورة بنجاح ♥')
      await loadData()
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleDeletePhoto = async (photo) => {
    if (!confirm('متأكد إنك عايز تمسح الصورة دي؟')) return
    const path = photo.url.split(`${BUCKETS.images}/`)[1]
    if (path) {
      await supabase.storage.from(BUCKETS.images).remove([path])
    }
    const { error } = await supabase.from('gallery_photos').delete().eq('id', photo.id)
    if (error) {
      showMessage('حصل خطأ في الحذف: ' + error.message)
    } else {
      showMessage('اتمسحت الصورة')
      await loadData()
    }
  }

  const handleCaptionChange = async (photo, caption) => {
    setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, caption } : p)))
  }

  const handleCaptionSave = async (photo) => {
    await supabase.from('gallery_photos').update({ caption: photo.caption }).eq('id', photo.id)
  }

  // ---------- الأغنية ----------
  const handleSongUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `song-${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from(BUCKETS.music)
      .upload(fileName, file)

    if (uploadError) {
      showMessage('حصل خطأ في رفع الأغنية: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKETS.music).getPublicUrl(fileName)

    const { error: updateError } = await supabase
      .from('site_settings')
      .update({ song_url: publicUrlData.publicUrl })
      .eq('id', 1)

    if (updateError) {
      showMessage('حصل خطأ في حفظ الأغنية: ' + updateError.message)
    } else {
      showMessage('اتضافت الأغنية بنجاح ♥')
      await loadData()
    }
    setUploading(false)
    e.target.value = ''
  }

  // ---------- الباسورد ----------
  const [newPassword, setNewPassword] = useState('')
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (!newPassword.trim()) return
    const { error } = await supabase
      .from('site_settings')
      .update({ gate_password: newPassword.trim() })
      .eq('id', 1)
    if (error) {
      showMessage('حصل خطأ في تغيير الباسورد: ' + error.message)
    } else {
      showMessage('اتغير الباسورد بنجاح ♥')
      setNewPassword('')
      await loadData()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="admin-loading">جاري التحميل...</div>
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>لوحة تحكم موقع هاجر ♥</h1>
        <button className="admin-logout-btn" onClick={handleLogout}>تسجيل خروج</button>
      </header>

      {message && <div className="admin-toast">{message}</div>}

      {/* الصور */}
      <section className="admin-section">
        <h2>معرض الصور ({photos.length})</h2>
        <label className="admin-upload-btn">
          {uploading ? 'جاري الرفع...' : '+ إضافة صورة جديدة'}
          <input type="file" accept="image/*" onChange={handleAddPhoto} disabled={uploading} hidden />
        </label>

        <div className="admin-photo-grid">
          {photos.map((photo) => (
            <div className="admin-photo-card" key={photo.id}>
              <img src={photo.url} alt={photo.caption} />
              <input
                type="text"
                placeholder="اكتب وصف للصورة..."
                value={photo.caption || ''}
                onChange={(e) => handleCaptionChange(photo, e.target.value)}
                onBlur={() => handleCaptionSave(photo)}
              />
              <button className="admin-delete-btn" onClick={() => handleDeletePhoto(photo)}>
                حذف
              </button>
            </div>
          ))}
          {photos.length === 0 && <p className="admin-empty">لسه مفيش صور، ضيفي أول صورة ♥</p>}
        </div>
      </section>

      {/* الأغنية */}
      <section className="admin-section">
        <h2>أغنيتنا</h2>
        {settings?.song_url ? (
          <audio controls src={settings.song_url} className="admin-audio-preview" />
        ) : (
          <p className="admin-empty">لسه مفيش أغنية مرفوعة</p>
        )}
        <label className="admin-upload-btn">
          {uploading ? 'جاري الرفع...' : 'رفع / تغيير الأغنية'}
          <input type="file" accept="audio/*" onChange={handleSongUpload} disabled={uploading} hidden />
        </label>
      </section>

      {/* الباسورد */}
      <section className="admin-section">
        <h2>باسورد دخول الموقع</h2>
        <p className="admin-current-password">
          الباسورد الحالي: <strong>{settings?.gate_password}</strong>
        </p>
        <form className="admin-password-form" onSubmit={handlePasswordChange}>
          <input
            type="text"
            placeholder="اكتب الباسورد الجديد"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">حفظ الباسورد</button>
        </form>
      </section>
    </div>
  )
}
