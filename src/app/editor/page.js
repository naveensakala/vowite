'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

// ─── THEME CONFIG ────────────────────────────────────────────────────────────
const THEMES = {
  sindoor: { heroBg:'linear-gradient(160deg,#2C1A0E,#8B1A1A,#C9422A)', accentColor:'#C9A84C', sectionBg:'#2C1A0E', countdownBg:'#8B1A1A', footerBg:'#1a0a04', musicBg:'rgba(201,168,76,0.08)', dark:true },
  maangalyam: { heroBg:'linear-gradient(160deg,#1A3A2A,#2D6A4F)', accentColor:'#C9A84C', sectionBg:'#1A3A2A', countdownBg:'#0d2018', footerBg:'#0d2018', musicBg:'rgba(201,168,76,0.08)', dark:true },
  midnight: { heroBg:'linear-gradient(160deg,#0a0a1a,#1A1A2E,#16213E)', accentColor:'#C9A84C', sectionBg:'#0f0f1f', countdownBg:'#1A1A2E', footerBg:'#0a0a1a', musicBg:'rgba(201,168,76,0.08)', dark:true },
  gulabi: { heroBg:'linear-gradient(160deg,#3D0C11,#8B1A4A)', accentColor:'#F2C4CE', sectionBg:'#3D0C11', countdownBg:'#2a0808', footerBg:'#2a0808', musicBg:'rgba(242,196,206,0.08)', dark:true },
  keerthana: { heroBg:'linear-gradient(180deg,#FDF6EC,#F5ECD7)', accentColor:'#C9A84C', sectionBg:'#FDF6EC', countdownBg:'#1A3A1A', footerBg:'#1A3A1A', musicBg:'rgba(201,168,76,0.08)', dark:false },
}

const BLESSING_DEFAULTS = { sindoor:'शुभ विवाह', maangalyam:'శుభ వివాహం', midnight:'A Night to Remember', gulabi:'With Love & Flowers', keerthana:'शुभ विवाह' }
const MAX_PHOTOS = 6
const DEFAULT_EVENTS = [
  { icon:'🌿', name:'Haldi Ceremony', time:'Fri, 14 Feb · 10:00 AM', venue:'Taj Garden, Anna Salai', map:'', on:true },
  { icon:'🎶', name:'Sangeet Night', time:'Fri, 14 Feb · 7:00 PM', venue:'Grand Ballroom, Leela Palace', map:'', on:true },
  { icon:'🔥', name:'Wedding Ceremony', time:'Sat, 15 Feb · 9:00 AM', venue:'Sri Kapali Temple, Mylapore', map:'', on:true },
  { icon:'🌸', name:'Reception', time:'Sat, 15 Feb · 7:00 PM', venue:'ITC Grand Chola, Mount Road', map:'', on:true },
]
const ICONS = ['🌿','🎶','🔥','🌸','💍','🥂','🙏','🎊','🌺','💐','✨','🎵','🎉','🌙','☀️','🕌','🛕','🎪','🌈','💫','🎨','🎭','🍃','🌻','❤️']

// ─── INVITE PREVIEW RENDERER ─────────────────────────────────────────────────
function InvitePreview({ state, forGuest = false, onSectionClick }) {
  const t = THEMES[state.theme] || THEMES.sindoor
  const { name1, name2, wcity, blessing, withBlessings, togetherText, lovestory, dateDisplay, footerQuote, wtype } = state
  const { events, photos, font, videoId, musicName, isMuted, rsvp } = state

  const countdown = useCountdown(state.wdate)

  const galleryBg = ['linear-gradient(135deg,#8B1A1A,#C9422A)', 'linear-gradient(135deg,#5C3D22,#9C7A2E)', 'linear-gradient(135deg,#3D0C11,#8B1A4A)', 'linear-gradient(135deg,#1A3A2A,#2D6A4F)', 'linear-gradient(135deg,#1A1A2E,#C9A84C)', 'linear-gradient(135deg,#8B1A4A,#C9A84C)']
  const galleryPh = ['💑', '🌸', '✨', '🌿', '💍', '🌺']

  const activeEvents = events.filter(e => e.on)

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", color: 'white' }}>
      {/* HERO */}
      <div
        onClick={() => !forGuest && onSectionClick?.('details')}
        style={{ position: 'relative', padding: '36px 20px 28px', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: t.heroBg, cursor: !forGuest ? 'pointer' : 'default', overflow: 'hidden' }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15, pointerEvents: 'none' }}>
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <circle cx="200" cy="200" r="195" fill="none" stroke={t.accentColor} strokeWidth="0.5"/>
            <circle cx="200" cy="200" r="155" fill="none" stroke={t.accentColor} strokeWidth="0.5"/>
            <circle cx="200" cy="200" r="110" fill="none" stroke={t.accentColor} strokeWidth="0.5"/>
            <line x1="5" y1="200" x2="395" y2="200" stroke={t.accentColor} strokeWidth="0.5"/>
            <line x1="200" y1="5" x2="200" y2="395" stroke={t.accentColor} strokeWidth="0.5"/>
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '11px', color: `${t.accentColor}99`, letterSpacing: '0.15em', marginBottom: '8px' }}>✦ {blessing || 'शुभ विवाह'} ✦</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.5)', marginBottom: '4px' }}>{withBlessings || 'With the blessings of God and our families'}</div>
          <div style={{ height: '0.5px', background: `linear-gradient(90deg,transparent,${t.accentColor},transparent)`, margin: '10px 0' }}></div>
          <div style={{ fontSize: '13px', color: 'rgba(255,253,247,0.5)', marginBottom: '8px' }}>{togetherText || 'Together with their families'}</div>
          <div style={{ fontFamily: `'${font || 'Great Vibes'}',cursive,serif`, fontSize: '52px', color: t.accentColor, lineHeight: 1.1 }}>
            {name1 || 'Partner 1'}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '14px', color: 'rgba(255,253,247,0.4)', fontStyle: 'italic', margin: '0 6px' }}>weds</span>{name2 || 'Partner 2'}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,253,247,0.4)', marginTop: '8px', letterSpacing: '0.06em' }}>{wtype || 'Hindu Wedding'} · {wcity || 'City'}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(201,168,76,0.12)', border: `0.5px solid ${t.accentColor}44`, borderRadius: '100px', padding: '5px 14px', fontSize: '11px', color: t.accentColor, marginTop: '10px' }}>
            <span>✦</span>{dateDisplay || 'Select your date'}
          </div>
          {lovestory && <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,253,247,0.45)', marginTop: '12px', maxWidth: '280px', lineHeight: 1.6 }}>"{lovestory}"</div>}
        </div>
      </div>

      {/* MUSIC BAR */}
      <div style={{ background: t.musicBg, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: `0.5px solid ${t.accentColor}22` }}>
        <div style={{ fontSize: '18px' }}>{isMuted ? '🔇' : '♪'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,253,247,0.7)' }}>{musicName || 'Add your song'}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,253,247,0.35)', marginTop: '1px' }}>
            {forGuest ? 'Tap to mute' : 'playing softly for guests'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
          {[8, 12, 16, 12, 8].map((h, i) => (
            <div key={i} style={{ width: '3px', height: `${h}px`, background: t.accentColor, borderRadius: '2px', opacity: isMuted ? 0.3 : 1 }}></div>
          ))}
        </div>
      </div>

      {/* GOLD DIVIDER */}
      <div style={{ height: '0.5px', background: `linear-gradient(90deg,transparent,${t.accentColor},transparent)` }}></div>

      {/* COUNTDOWN */}
      <div style={{ background: t.countdownBg, padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,253,247,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>Counting down to forever</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
          {[['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']].map(([key, lbl], i) => (
            <>
              <div key={key} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 600, color: t.accentColor, lineHeight: 1 }}>{countdown[key]}</div>
                <div style={{ fontSize: '8px', color: 'rgba(255,253,247,0.4)', letterSpacing: '0.05em' }}>{lbl}</div>
              </div>
              {i < 3 && <div key={`sep${i}`} style={{ fontSize: '18px', color: `${t.accentColor}55`, marginBottom: '12px' }}>:</div>}
            </>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <div
        onClick={() => !forGuest && onSectionClick?.('events')}
        style={{ background: t.sectionBg, padding: '16px', cursor: !forGuest ? 'pointer' : 'default' }}
      >
        <div style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,253,247,0.4)', textAlign: 'center', marginBottom: '4px', textTransform: 'uppercase' }}>Celebrations</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', color: t.accentColor, textAlign: 'center', fontStyle: 'italic', marginBottom: '12px' }}>Join us for <em>every moment</em></div>
        {activeEvents.map(ev => (
          <div key={ev.name} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px', background: 'rgba(201,168,76,0.06)', borderRadius: '10px', marginBottom: '8px', border: '0.5px solid rgba(201,168,76,0.12)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{ev.icon}</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#FFFDF7', marginBottom: '2px' }}>{ev.name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,253,247,0.5)' }}>{ev.time}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,253,247,0.4)' }}>{ev.venue}</div>
            </div>
          </div>
        ))}
      </div>

      {/* GALLERY */}
      {(photos.length > 0 || !forGuest) && (
        <div
          onClick={() => !forGuest && onSectionClick?.('media')}
          style={{ background: t.sectionBg, padding: '16px 16px 8px', cursor: !forGuest ? 'pointer' : 'default' }}
        >
          <div style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,253,247,0.4)', textAlign: 'center', marginBottom: '4px', textTransform: 'uppercase' }}>Our Story</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', color: t.accentColor, textAlign: 'center', fontStyle: 'italic', marginBottom: '10px' }}>A glimpse of <em>us</em></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridAutoRows: '70px', gap: '4px' }}>
            {photos.length > 0
              ? photos.slice(0, 6).map((src, i) => (
                  <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1', borderRadius: '6px', overflow: 'hidden' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))
              : galleryPh.map((ph, i) => (
                  <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1', borderRadius: '6px', background: galleryBg[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{ph}</div>
                ))
            }
          </div>
        </div>
      )}

      {/* VIDEO */}
      {videoId && (
        <div style={{ background: t.sectionBg, padding: '16px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', color: t.accentColor, textAlign: 'center', fontStyle: 'italic', marginBottom: '10px' }}>Our Story</div>
          <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <iframe width="100%" height="180" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* RSVP */}
      {rsvp && (
        <div style={{ background: t.sectionBg, padding: '16px' }}>
          <button style={{ width: '100%', background: t.accentColor, color: '#2C1A0E', border: 'none', borderRadius: '100px', padding: '12px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>RSVP Now ✦</button>
        </div>
      )}

      {/* FOOTER */}
      <div
        onClick={() => !forGuest && onSectionClick?.('details')}
        style={{ background: t.footerBg, padding: '20px 16px', textAlign: 'center', cursor: !forGuest ? 'pointer' : 'default' }}
      >
        <div style={{ fontFamily: `'${font || 'Great Vibes'}',cursive,serif`, fontSize: '28px', color: t.accentColor }}>{name1 || 'Partner 1'} & {name2 || 'Partner 2'}</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,253,247,0.3)', marginTop: '4px' }}>{dateDisplay || ''} · {wcity || ''}</div>
        {footerQuote && <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '11px', fontStyle: 'italic', color: 'rgba(255,253,247,0.25)', marginTop: '6px' }}>"{footerQuote}"</div>}
        <div style={{ fontSize: '9px', color: 'rgba(255,253,247,0.15)', marginTop: '8px' }}>Made with love on <span style={{ color: 'rgba(201,168,76,0.3)' }}>Vowite</span></div>
      </div>
    </div>
  )
}



// ─── COUNTDOWN HOOK ───────────────────────────────────────────────────────────
function useIframePreview(slug, currentInviteId) {
  const iframeRef = useRef(null)
  const reloadTimer = useRef(null)

  function scheduleReload() {
    clearTimeout(reloadTimer.current)
    reloadTimer.current = setTimeout(() => {
      if (iframeRef.current && slug) {
        iframeRef.current.src = `/invite/${slug}?t=${Date.now()}`
      }
    }, 3000)
  }

  return { iframeRef, scheduleReload }
}
  function useCountdown(wdate) {
  const [cd, setCd] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const tick = () => {
      const target = wdate ? new Date(wdate + 'T09:00:00') : new Date(Date.now() + 42 * 86400000)
      const diff = target - Date.now()
      if (diff <= 0) return
      setCd({
        d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [wdate])
  return cd
}
// ─── END COUNTDOWN HOOK ───

// ─── MAIN EDITOR COMPONENT ────────────────────────────────────────────────────
function EditorMain() {
  const searchParams = useSearchParams()
  const themeParam = searchParams.get('theme') || 'sindoor'
  const idParam = searchParams.get('id')

  const [activeTab, setActiveTab] = useState('details')
  const [viewMode, setViewMode] = useState('mobile')
  const [showGuestPreview, setShowGuestPreview] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showMobileSheet, setShowMobileSheet] = useState(null)
  const [saveStatus, setSaveStatus] = useState('')
  const [currentInviteId, setCurrentInviteId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [publishPrice, setPublishPrice] = useState('₹999')
  const [guestMusicPlaying, setGuestMusicPlaying] = useState(false)
  const audioRef = useRef(null)
  const autoSaveRef = useRef(null)

  // ── STATE ──
  const [state, setState] = useState({
    theme: themeParam,
    name1: '', name2: '', wcity: 'Chennai', wtype: 'Hindu Wedding',
    wdate: '2026-02-15', dateDisplay: '', blessing: BLESSING_DEFAULTS[themeParam] || 'शुभ विवाह',
    withBlessings: 'With the blessings of God and our families',
    togetherText: 'Together with their families',
    lovestory: '', footerQuote: '',
    parents1: '', parents2: '',
    events: JSON.parse(JSON.stringify(DEFAULT_EVENTS)),
    photos: [], font: 'Great Vibes',
    videoId: '', musicName: '', musicSrc: '',
    isMuted: false, rsvp: false,
  })

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  // ── SUPABASE INIT ──
  useEffect(() => {
    initSupabase()
  }, [])

  async function initSupabase() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      localStorage.setItem('vowite_pending_theme', themeParam)
      window.location.href = '/auth'
      return
    }
    setCurrentUser(session.user)

    if (idParam) {
      const { data: invite } = await supabase.from('invites').select('*').eq('id', idParam).eq('couple_id', session.user.id).single()
      if (invite) { setCurrentInviteId(invite.id); loadInviteData(invite) }
    } else {
      const { data: existing } = await supabase.from('invites').select('*').eq('couple_id', session.user.id).single()
      if (existing) {
        setCurrentInviteId(existing.id); loadInviteData(existing)
      } else {
        const slug = generateSlug(state.name1 || 'partner1', state.name2 || 'partner2')
        const { data: newInvite } = await supabase.from('invites').insert({
          couple_id: session.user.id, theme: themeParam, slug,
          data: getInviteData(state), is_published: false, rsvp_enabled: false
        }).select().single()
        if (newInvite) { setCurrentInviteId(newInvite.id); showSave('Invite created ✓') }
      }
    }

    autoSaveRef.current = setInterval(() => autoSave(), 10000)
    return () => clearInterval(autoSaveRef.current)
  }

  function loadInviteData(invite) {
    const d = invite.data || {}
    setState(prev => ({
      ...prev,
      theme: invite.theme || prev.theme,
      rsvp: invite.rsvp_enabled || false,
      name1: d.name1 || prev.name1,
      name2: d.name2 || prev.name2,
      wdate: d.wdate || prev.wdate,
      wcity: d.wcity || prev.wcity,
      wtype: d.wtype || prev.wtype,
      blessing: d.blessing || BLESSING_DEFAULTS[invite.theme] || prev.blessing,
      withBlessings: d.withBlessings || prev.withBlessings,
      togetherText: d.togetherText || prev.togetherText,
      lovestory: d.lovestory || prev.lovestory,
      dateDisplay: d.dateDisplay || prev.dateDisplay,
      footerQuote: d.footerQuote || prev.footerQuote,
      parents1: d.parents1 || prev.parents1,
      parents2: d.parents2 || prev.parents2,
      events: d.events || prev.events,
      photos: d.photos || prev.photos,
      font: d.font || prev.font,
      videoId: d.videoId || prev.videoId,
      musicName: d.musicName || prev.musicName,
      musicSrc: d.musicSrc || prev.musicSrc,
    }))
    showSave('Invite loaded ✓')
  }

  function getInviteData(s) {
    return {
      name1: s.name1, name2: s.name2, wdate: s.wdate, wcity: s.wcity, wtype: s.wtype,
      blessing: s.blessing, withBlessings: s.withBlessings, togetherText: s.togetherText,
      lovestory: s.lovestory, dateDisplay: s.dateDisplay, footerQuote: s.footerQuote,
      parents1: s.parents1, parents2: s.parents2,
      events: s.events, photos: s.photos, font: s.font,
      videoId: s.videoId, musicName: s.musicName, musicSrc: s.musicSrc,
    }
  }

  async function autoSave() {
    if (!currentInviteId || !currentUser) return
    showSave('Saving...')
    setState(prev => {
      const slug = generateSlug(prev.name1 || 'partner1', prev.name2 || 'partner2')
      supabase.from('invites').update({
        theme: prev.theme, slug, data: getInviteData(prev),
        rsvp_enabled: prev.rsvp, updated_at: new Date().toISOString()
      }).eq('id', currentInviteId).then(({ error }) => {
        if (!error) showSave('Saved ✓')
      })
      return prev
    })
  }

  function showSave(msg) {
    setSaveStatus(msg)
    if (msg === 'Saved ✓') setTimeout(() => setSaveStatus(''), 2500)
  }

  async function handlePublish() {
    if (!currentInviteId) { showSave('Please wait...'); return }
    setState(prev => {
      const slug = generateSlug(prev.name1 || 'partner1', prev.name2 || 'partner2')
      supabase.from('invites').update({
        theme: prev.theme, slug, data: getInviteData(prev),
        rsvp_enabled: prev.rsvp, is_published: true,
        updated_at: new Date().toISOString()
      }).eq('id', currentInviteId).then(({ error }) => {
        if (error) { alert('Something went wrong. Please try again.'); return }
        window.location.href = '/dashboard'
      })
      return prev
    })
  }

  async function openPublishModal() {
    if (!currentInviteId) { showSave('Setting up your invite, please wait...'); return }
    try {
      const { data } = await supabase.from('themes').select('price').eq('id', state.theme).single()
      const base = data?.price || 999
      const total = base + (state.rsvp ? 999 : 0)
      setPublishPrice(`₹${total.toLocaleString('en-IN')}`)
    } catch (e) {
      setPublishPrice('₹999')
    }
    setShowPublishModal(true)
  }

  function handlePhotoUpload(files) {
    const remaining = MAX_PHOTOS - state.photos.length
    const toProcess = Array.from(files).slice(0, remaining)
    toProcess.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateState({ photos: [...state.photos, e.target.result].slice(0, MAX_PHOTOS) })
      }
      reader.readAsDataURL(file)
    })
  }

  function handleMusicUpload(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => updateState({ musicName: file.name, musicSrc: e.target.result })
    reader.readAsDataURL(file)
  }

  function handleVideoUrl(url) {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    updateState({ videoId: match ? match[1] : '' })
  }

  function addEvent() {
    updateState({ events: [...state.events, { icon: '💫', name: 'Custom Event', time: 'Date & time', venue: 'Venue', map: '', on: true }] })
  }

  function updateEvent(idx, field, val) {
    const evs = [...state.events]
    evs[idx] = { ...evs[idx], [field]: val }
    updateState({ events: evs })
  }

  function toggleEvent(idx) {
    const evs = [...state.events]
    evs[idx] = { ...evs[idx], on: !evs[idx].on }
    updateState({ events: evs })
  }

  function removePhoto(idx) {
    updateState({ photos: state.photos.filter((_, i) => i !== idx) })
  }

  function generateSlug(n1, n2) {
    return `${n1}-weds-${n2}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function getProgress() {
    let p = 20
    if (state.name1) p += 12
    if (state.name2) p += 12
    if (state.wdate) p += 10
    if (state.wcity) p += 8
    if (state.lovestory) p += 8
    if (state.events.filter(e => e.on).length > 0) p += 10
    if (state.photos.length > 0) p += 10
    if (state.musicName) p += 10
    return Math.min(p, 100)
  }

  const progress = getProgress()
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // ── FIELD STYLE ──
  const fieldStyle = { width: '100%', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: 'var(--espresso)', fontFamily: "'DM Sans',sans-serif", outline: 'none', background: 'var(--ivory)', resize: 'none' }
  const labelStyle = { fontSize: '11px', fontWeight: 500, color: 'var(--espresso-mid)', letterSpacing: '0.04em', marginBottom: '4px', display: 'block', textTransform: 'uppercase' }
  const sectionHeadingStyle = { fontSize: '11px', fontWeight: 600, color: 'var(--espresso)', margin: '1.25rem 0 0.75rem', paddingBottom: '5px', borderBottom: '0.5px solid rgba(201,168,76,0.2)', textTransform: 'uppercase', letterSpacing: '0.04em' }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=Great+Vibes&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{--gold:#C9A84C;--gold-dark:#9C7A2E;--ivory:#FFFDF7;--ivory-dark:#F5EDD8;--espresso:#2C1A0E;--espresso-mid:#5C3D22;}
        html,body{height:100%;font-family:'DM Sans',sans-serif;overflow:hidden;}
        input:focus,textarea:focus,select:focus{border-color:rgba(201,168,76,0.5)!important;background:white!important;outline:none;}
        input::placeholder,textarea::placeholder{color:rgba(92,61,34,0.3);}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.2);border-radius:2px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @media(max-width:768px){
          .desktop-only{display:none!important;}
          .sidebar-desktop{display:none!important;}
        }
        @media(min-width:769px){
          .mobile-only{display:none!important;}
        }
      `}</style>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#FAF7F0' }}>

        {/* ── TOPBAR ── */}
        <div style={{ height: '54px', background: 'white', borderBottom: '0.5px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', position: 'relative', zIndex: 10, flexShrink: 0 }}>
          <Link href="/themes">
            <Image src="/images/logo.png" alt="Vowite" height={36} width={120} style={{ height: '36px', width: 'auto' }} />
          </Link>

          {/* Step dots - desktop only */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {['Details', 'Events', 'Media', 'Design'].map((label, i) => {
              const tabMap = ['details', 'events', 'media', 'design']
              const isActive = activeTab === tabMap[i]
              const isDone = tabMap.indexOf(activeTab) > i
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <div onClick={() => setActiveTab(tabMap[i])} style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 500, cursor: 'pointer', border: '0.5px solid rgba(201,168,76,0.2)', background: isActive ? 'var(--espresso)' : isDone ? 'var(--gold)' : 'transparent', color: isActive ? 'white' : isDone ? 'var(--espresso)' : 'var(--espresso-mid)', transition: 'all 0.2s' }}>{i + 1}</div>
                  {i < 3 && <div style={{ width: '14px', height: '0.5px', background: 'rgba(201,168,76,0.2)' }}></div>}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {saveStatus && <span style={{ fontSize: '11px', color: 'var(--espresso-mid)', paddingRight: '4px' }}>{saveStatus}</span>}
            <Link href="/themes" style={{ background: 'transparent', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: 'var(--espresso-mid)', textDecoration: 'none' }} className="desktop-only">← Back</Link>
            <button onClick={() => setShowGuestPreview(true)} style={{ background: 'transparent', border: '0.5px solid rgba(201,168,76,0.4)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: 'var(--gold-dark)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }} className="desktop-only">👁 Preview</button>
            <button onClick={openPublishModal} style={{ background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: '100px', padding: '6px 14px', fontSize: '11px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Publish ✦</button>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr', overflow: 'hidden' }} className="desktop-only">

          {/* SIDEBAR */}
          <div style={{ background: 'white', borderRight: '0.5px solid rgba(201,168,76,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(201,168,76,0.2)', flexShrink: 0 }}>
              {['Details', 'Events', 'Media', 'Design'].map(tab => (
                <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ flex: 1, padding: '10px 4px', textAlign: 'center', fontSize: '11px', fontWeight: 500, cursor: 'pointer', color: activeTab === tab.toLowerCase() ? 'var(--gold-dark)' : 'var(--espresso-mid)', borderBottom: activeTab === tab.toLowerCase() ? '2px solid var(--gold)' : '2px solid transparent', transition: 'all 0.2s' }}>{tab}</div>
              ))}
            </div>

            {/* Tab Bodies */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>

              {/* DETAILS TAB */}
              {activeTab === 'details' && (
                <div>
                  <div style={sectionHeadingStyle}>Couple</div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Partner 1 name</label><input style={fieldStyle} value={state.name1} onChange={e => updateState({ name1: e.target.value })} placeholder="Priya" /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Partner 2 name</label><input style={fieldStyle} value={state.name2} onChange={e => updateState({ name2: e.target.value })} placeholder="Arjun" /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Wedding date (for countdown)</label><input type="date" style={fieldStyle} value={state.wdate} onChange={e => updateState({ wdate: e.target.value })} /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Date display text</label><input style={fieldStyle} value={state.dateDisplay} onChange={e => updateState({ dateDisplay: e.target.value })} placeholder="e.g. 26th & 27th Sep 2026" /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>City</label><input style={fieldStyle} value={state.wcity} onChange={e => updateState({ wcity: e.target.value })} placeholder="Chennai" /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Wedding type</label><input style={fieldStyle} value={state.wtype} onChange={e => updateState({ wtype: e.target.value })} placeholder="Hindu Wedding" /></div>

                  <div style={sectionHeadingStyle}>Header text</div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Blessing / top text</label><input style={fieldStyle} value={state.blessing} onChange={e => updateState({ blessing: e.target.value })} /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Sub text</label><input style={fieldStyle} value={state.withBlessings} onChange={e => updateState({ withBlessings: e.target.value })} /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Above names</label><input style={fieldStyle} value={state.togetherText} onChange={e => updateState({ togetherText: e.target.value })} /></div>

                  <div style={sectionHeadingStyle}>Family</div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Partner 1's parents</label><input style={fieldStyle} value={state.parents1} onChange={e => updateState({ parents1: e.target.value })} placeholder="Mr & Mrs Sharma" /></div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Partner 2's parents</label><input style={fieldStyle} value={state.parents2} onChange={e => updateState({ parents2: e.target.value })} placeholder="Mr & Mrs Iyer" /></div>

                  <div style={sectionHeadingStyle}>Story</div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Love story (shown on invite)</label>
                    <textarea style={{ ...fieldStyle, minHeight: '80px' }} value={state.lovestory} onChange={e => updateState({ lovestory: e.target.value })} placeholder="Met at a rainy bus stop in Chennai..." maxLength={200} />
                    <div style={{ fontSize: '10px', color: 'rgba(92,61,34,0.35)', textAlign: 'right', marginTop: '2px' }}>{state.lovestory.length}/200</div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>Footer quote</label><input style={fieldStyle} value={state.footerQuote} onChange={e => updateState({ footerQuote: e.target.value })} placeholder="Thank you for being part of our forever" /></div>
                </div>
              )}

              {/* EVENTS TAB */}
              {activeTab === 'events' && (
                <div>
                  {state.events.map((ev, idx) => (
                    <div key={idx} style={{ background: 'var(--ivory)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '10px', marginBottom: '8px', opacity: ev.on ? 1 : 0.4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <input style={{ ...fieldStyle, flex: 1, marginRight: '8px', fontSize: '12px', padding: '4px 8px' }} value={ev.name} onChange={e => updateEvent(idx, 'name', e.target.value)} />
                        <button onClick={() => toggleEvent(idx)} style={{ width: '32px', height: '18px', borderRadius: '9px', background: ev.on ? 'var(--gold)' : 'rgba(92,61,34,0.15)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                          <div style={{ position: 'absolute', width: '14px', height: '14px', borderRadius: '50%', background: 'white', top: '2px', right: ev.on ? '2px' : '16px', transition: 'right 0.2s' }}></div>
                        </button>
                      </div>
                      {/* Icon picker */}
                      <div style={{ marginBottom: '6px' }}>
                        <label style={{ ...labelStyle, marginBottom: '4px' }}>Icon</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {ICONS.map(icon => (
                            <button key={icon} onClick={() => updateEvent(idx, 'icon', icon)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: ev.icon === icon ? '1.5px solid var(--gold)' : '0.5px solid rgba(201,168,76,0.2)', background: ev.icon === icon ? 'rgba(201,168,76,0.12)' : 'var(--ivory)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</button>
                          ))}
                        </div>
                      </div>
                      <input style={{ ...fieldStyle, marginBottom: '5px' }} value={ev.time} onChange={e => updateEvent(idx, 'time', e.target.value)} placeholder="Date & time" />
                      <input style={{ ...fieldStyle, marginBottom: '5px' }} value={ev.venue} onChange={e => updateEvent(idx, 'venue', e.target.value)} placeholder="Venue" />
                      <input style={fieldStyle} value={ev.map} onChange={e => updateEvent(idx, 'map', e.target.value)} placeholder="Google Maps link (optional)" />
                    </div>
                  ))}
                  <button onClick={addEvent} style={{ width: '100%', background: 'transparent', border: '0.5px dashed rgba(201,168,76,0.3)', borderRadius: '10px', padding: '9px', fontSize: '12px', color: 'var(--gold-dark)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginTop: '6px' }}>+ Add custom event</button>
                </div>
              )}

              {/* MEDIA TAB */}
              {activeTab === 'media' && (
                <div>
                  <div style={sectionHeadingStyle}>Photos</div>
                  {state.photos.length < MAX_PHOTOS && (
                    <label style={{ display: 'block', border: '0.5px dashed rgba(201,168,76,0.35)', borderRadius: '10px', padding: '14px', textAlign: 'center', cursor: 'pointer', background: 'var(--ivory)', marginBottom: '8px' }}>
                      <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handlePhotoUpload(e.target.files)} />
                      <div style={{ fontSize: '18px', marginBottom: '4px' }}>📸</div>
                      <div style={{ fontSize: '11px', color: 'var(--espresso-mid)' }}>Click to upload photos</div>
                    </label>
                  )}
                  <div style={{ fontSize: '11px', color: 'rgba(92,61,34,0.4)', textAlign: 'center', marginBottom: '8px' }}>{state.photos.length}/{MAX_PHOTOS} photos added</div>
                  {state.photos.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridAutoRows: '80px', gap: '5px', marginBottom: '1rem' }}>
                      {state.photos.map((src, i) => (
                        <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1', borderRadius: '7px', overflow: 'hidden', position: 'relative' }}>
                          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button onClick={() => removePhoto(i)} style={{ position: 'absolute', top: '3px', right: '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(44,26,14,0.7)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={sectionHeadingStyle}>Music</div>
                  <label style={{ display: 'block', border: '0.5px dashed rgba(201,168,76,0.35)', borderRadius: '10px', padding: '14px', textAlign: 'center', cursor: 'pointer', background: 'var(--ivory)', marginBottom: '8px' }}>
                    <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={e => handleMusicUpload(e.target.files[0])} />
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>🎵</div>
                    <div style={{ fontSize: '11px', color: 'var(--espresso-mid)' }}>{state.musicName || 'Click to upload your song'}</div>
                  </label>

                  <div style={sectionHeadingStyle}>Video</div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>YouTube link</label>
                    <input style={fieldStyle} value={state.videoId ? `https://youtube.com/watch?v=${state.videoId}` : ''} onChange={e => handleVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                  </div>
                </div>
              )}

              {/* DESIGN TAB */}
              {activeTab === 'design' && (
                <div>
                  <div style={sectionHeadingStyle}>Theme</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1rem' }}>
                    {[
                      { id: 'sindoor', label: 'North Indian', bg: 'linear-gradient(135deg,#8B1A1A,#C9422A,#E8A020)' },
                      { id: 'maangalyam', label: 'South Indian', bg: 'linear-gradient(135deg,#1A3A2A,#2D6A4F,#C9A84C)' },
                      { id: 'midnight', label: 'Modern Luxury', bg: 'linear-gradient(135deg,#1A1A2E,#16213E,#C9A84C)' },
                      { id: 'gulabi', label: 'Floral Romance', bg: 'linear-gradient(135deg,#3D0C11,#8B1A4A,#F2C4CE)' },
                      { id: 'keerthana', label: 'Traditional', img: '/images/temple1.jpg' },
                    ].map(th => (
                      <div key={th.id} onClick={() => updateState({ theme: th.id, blessing: BLESSING_DEFAULTS[th.id] })} style={{ borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', border: state.theme === th.id ? '2px solid var(--gold)' : '2px solid transparent', transition: 'all 0.2s' }}>
                        <div style={{ height: '52px', background: th.bg || undefined, backgroundImage: th.img ? `url(${th.img})` : undefined, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', textTransform: 'capitalize' }}>{th.id}</div>
                        <div style={{ fontSize: '10px', padding: '3px 6px', textAlign: 'center', color: 'var(--espresso-mid)', background: 'white' }}>{th.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={sectionHeadingStyle}>Names font</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '1rem' }}>
                    {[{ font: 'Great Vibes', label: 'Script', preview: 'Great Vibes' }, { font: 'Cormorant Garamond', label: 'Serif', preview: 'Cormorant' }].map(f => (
                      <div key={f.font} onClick={() => updateState({ font: f.font })} style={{ border: state.font === f.font ? '1.5px solid var(--gold)' : '0.5px solid rgba(201,168,76,0.2)', borderRadius: '8px', padding: '8px', cursor: 'pointer', textAlign: 'center', background: state.font === f.font ? 'rgba(201,168,76,0.06)' : 'transparent', transition: 'all 0.2s' }}>
                        <div style={{ fontFamily: `'${f.font}',cursive,serif`, fontSize: f.font === 'Great Vibes' ? '20px' : '17px', fontStyle: f.font === 'Cormorant Garamond' ? 'italic' : 'normal', color: 'var(--espresso)', marginBottom: '4px' }}>{f.preview}</div>
                        <div style={{ fontSize: '10px', color: 'var(--espresso-mid)' }}>{f.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={sectionHeadingStyle}>RSVP</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--ivory)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '10px 12px', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--espresso)' }}>Enable RSVP</div>
                      <div style={{ fontSize: '10px', color: 'var(--espresso-mid)', marginTop: '1px' }}>Guests confirm attendance</div>
                    </div>
                    <button onClick={() => updateState({ rsvp: !state.rsvp })} style={{ width: '32px', height: '18px', borderRadius: '9px', background: state.rsvp ? 'var(--gold)' : 'rgba(92,61,34,0.15)', border: 'none', cursor: 'pointer', position: 'relative' }}>
                      <div style={{ position: 'absolute', width: '14px', height: '14px', borderRadius: '50%', background: 'white', top: '2px', right: state.rsvp ? '2px' : '16px', transition: 'right 0.2s' }}></div>
                    </button>
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(92,61,34,0.4)', marginTop: '6px' }}>RSVP tracking is a ₹999 add-on.</div>
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', height: '44px', background: 'white', borderBottom: '0.5px solid rgba(201,168,76,0.2)', flexShrink: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--espresso-mid)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Live preview</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['Mobile', 'Desktop'].map(v => (
                  <button key={v} onClick={() => setViewMode(v.toLowerCase())} style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', border: '0.5px solid rgba(201,168,76,0.2)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", background: viewMode === v.toLowerCase() ? 'var(--espresso)' : 'transparent', color: viewMode === v.toLowerCase() ? 'white' : 'var(--espresso-mid)', transition: 'all 0.2s' }}>{v}</button>
                ))}
              </div>
              <button onClick={() => setShowGuestPreview(true)} style={{ background: 'transparent', border: '0.5px solid rgba(201,168,76,0.4)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: 'var(--gold-dark)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>👁 Guest view</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem', background: '#FAF7F0' }}>
              {viewMode === 'mobile' ? (
                <div style={{ width: '300px', flexShrink: 0 }}>
                  <div style={{ background: '#1a1a1a', borderRadius: '38px', padding: '12px', boxShadow: '0 32px 64px rgba(44,26,14,0.18)' }}>
                    <div style={{ height: '20px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '60px', height: '4px', background: '#333', borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ borderRadius: '28px', overflow: 'hidden', height: '580px' }}>
                      {currentInviteId && state.name1 ? (
                        <iframe
                          key={`${state.theme}-${state.name1}-${state.name2}`}
                          src={`/invite/${generateSlug(state.name1 || 'partner1', state.name2 || 'partner2')}`}
                          style={{ width: '100%', height: '100%', border: 'none' }}
                          title="Invite preview"
                        />
                      ) : (
                        <div style={{ height: '100%', background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ fontSize: '32px' }}>✦</div>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', color: 'rgba(201,168,76,0.6)', fontStyle: 'italic', textAlign: 'center', padding: '0 20px' }}>Enter your names to see the preview</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', maxWidth: '680px', borderRadius: '12px', overflow: 'hidden', height: '600px' }}>
                  {currentInviteId && state.name1 ? (
                    <iframe
                      key={`${state.theme}-${state.name1}-${state.name2}`}
                      src={`/invite/${generateSlug(state.name1 || 'partner1', state.name2 || 'partner2')}`}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      title="Invite preview"
                    />
                  ) : (
                    <div style={{ height: '100%', background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ fontSize: '32px' }}>✦</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', color: 'rgba(201,168,76,0.6)', fontStyle: 'italic', textAlign: 'center', padding: '0 20px' }}>Enter your names to see the preview</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div style={{ background: 'white', borderTop: '0.5px solid rgba(201,168,76,0.2)', padding: '10px 1rem', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span style={{ fontSize: '11px', color: 'var(--espresso-mid)', whiteSpace: 'nowrap' }}>Completion</span>
              <div style={{ flex: 1, height: '4px', background: 'var(--ivory-dark)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,var(--gold),var(--gold-dark))', borderRadius: '2px', transition: 'width 0.4s ease' }}></div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--gold-dark)', whiteSpace: 'nowrap' }}>{progress}%</span>
            </div>
          </div>
        </div>

        {/* ── MOBILE PREVIEW ── */}
        <div className="mobile-only" style={{ flex: 1, overflow: 'hidden', background: '#1a1a1a' }}>
          {currentInviteId && state.name1 ? (
            <iframe
              key={`mob-${state.theme}-${state.name1}-${state.name2}`}
              src={`/invite/${generateSlug(state.name1 || 'partner1', state.name2 || 'partner2')}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Invite preview"
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '32px' }}>✦</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', color: 'rgba(201,168,76,0.6)', fontStyle: 'italic', textAlign: 'center', padding: '0 20px' }}>Enter your names to see the preview</div>
            </div>
          )}
        </div>

        {/* ── MOBILE ACTION BAR ── */}
        <div className="mobile-only" style={{ background: 'rgba(26,26,26,0.95)', backdropFilter: 'blur(10px)', borderTop: '0.5px solid rgba(201,168,76,0.2)', padding: '8px 12px', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => setShowMobileSheet('design')} style={{ background: 'rgba(255,253,247,0.1)', color: 'rgba(255,253,247,0.7)', border: '0.5px solid rgba(255,253,247,0.15)', borderRadius: '100px', padding: '10px 12px', fontSize: '11px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", whiteSpace: 'nowrap' }}>🎨 Theme</button>
          <button onClick={() => setShowGuestPreview(true)} style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '0.5px solid rgba(201,168,76,0.3)', borderRadius: '100px', padding: '10px 12px', fontSize: '11px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", whiteSpace: 'nowrap' }}>👁 Preview</button>
          <button onClick={openPublishModal} style={{ background: 'var(--gold)', color: 'var(--espresso)', border: 'none', borderRadius: '100px', padding: '10px 0', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", flex: 1 }}>Publish ✦</button>
        </div>
      </div>

      {/* ── MOBILE BOTTOM SHEET ── */}
      {showMobileSheet && (
        <>
          <div onClick={() => setShowMobileSheet(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, animation: 'fadeIn 0.2s ease' }}></div>
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 301, background: 'white', borderRadius: '20px 20px 0 0', maxHeight: '85vh', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.35s cubic-bezier(0.32,0.72,0,1)' }}>
            <div style={{ width: '36px', height: '4px', background: 'rgba(44,26,14,0.15)', borderRadius: '2px', margin: '12px auto 0' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 10px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 500, color: 'var(--espresso)', textTransform: 'capitalize' }}>{showMobileSheet}</div>
              <button onClick={() => setShowMobileSheet(null)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F5EDD8', border: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ padding: '0 20px 20px', overflowY: 'auto', flex: 1 }}>
              <MobileSheetContent type={showMobileSheet} state={state} updateState={updateState} onClose={() => setShowMobileSheet(null)} handlePhotoUpload={handlePhotoUpload} handleMusicUpload={handleMusicUpload} handleVideoUrl={handleVideoUrl} addEvent={addEvent} updateEvent={updateEvent} toggleEvent={toggleEvent} removePhoto={removePhoto} />
            </div>
          </div>
        </>
      )}

      {/* ── GUEST PREVIEW ── */}
      {showGuestPreview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, background: '#1a1a1a', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.4s cubic-bezier(0.32,0.72,0,1)' }}>
          <div style={{ height: '54px', background: 'rgba(26,26,26,0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', flexShrink: 0, borderBottom: '0.5px solid rgba(201,168,76,0.15)' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Guest preview</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {state.musicSrc && (
                <button
                  onClick={() => {
                    if (!audioRef.current) {
                      audioRef.current = new Audio(state.musicSrc)
                      audioRef.current.loop = true
                      audioRef.current.volume = 0.6
                    }
                    if (guestMusicPlaying) { audioRef.current.pause(); setGuestMusicPlaying(false) }
                    else { audioRef.current.play().catch(() => {}); setGuestMusicPlaying(true) }
                  }}
                  style={{ background: 'rgba(201,168,76,0.15)', border: '0.5px solid rgba(201,168,76,0.3)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: '#C9A84C', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
                >{guestMusicPlaying ? '🔇 Mute' : '🎵 Play music'}</button>
              )}
              <button onClick={() => { setShowGuestPreview(false); if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 }; setGuestMusicPlaying(false) }} style={{ background: 'rgba(255,253,247,0.1)', color: 'rgba(255,253,247,0.7)', border: '0.5px solid rgba(255,253,247,0.15)', borderRadius: '100px', padding: '6px 16px', fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Close</button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '1.5rem' }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>
              <InvitePreview state={state} forGuest={true} />
            </div>
          </div>
        </div>
      )}

      {/* ── PUBLISH MODAL ── */}
      {showPublishModal && (
        <>
          <div onClick={() => setShowPublishModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(44,26,14,0.5)', zIndex: 400, animation: 'fadeIn 0.2s ease' }}></div>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'white', borderRadius: '20px', padding: '2rem', width: '400px', maxWidth: '90vw', textAlign: 'center', zIndex: 401 }}>
            <div style={{ fontSize: '40px', marginBottom: '0.5rem' }}>🎉</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>Your invite is ready!</div>
            <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 300 }}>Complete payment to publish and get your shareable link.</div>
            <div style={{ background: '#FAF7F0', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '12px', fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '1.5rem', wordBreak: 'break-all' }}>
              vowite.com/invite/<span style={{ color: 'var(--gold-dark)', fontWeight: 500 }}>{generateSlug(state.name1 || 'partner1', state.name2 || 'partner2')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button id="publishBtn" onClick={handlePublish} style={{ background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: '100px', padding: '12px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                Pay & Publish — {publishPrice} ✦
              </button>
              <button onClick={() => setShowPublishModal(false)} style={{ background: 'transparent', color: 'var(--espresso-mid)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '100px', padding: '12px', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Continue editing</button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// ─── MOBILE SHEET CONTENT ─────────────────────────────────────────────────────
function MobileSheetContent({ type, state, updateState, onClose, handlePhotoUpload, handleMusicUpload, handleVideoUrl, addEvent, updateEvent, toggleEvent, removePhoto }) {
  const inputStyle = { width: '100%', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '12px 14px', fontSize: '15px', color: 'var(--espresso)', fontFamily: "'DM Sans',sans-serif", outline: 'none', background: 'var(--ivory)', resize: 'none', WebkitAppearance: 'none' }
  const labelStyle = { fontSize: '11px', fontWeight: 500, color: 'var(--espresso-mid)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }

  if (type === 'details') return (
    <div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Partner 1 name</label><input style={inputStyle} value={state.name1} onChange={e => updateState({ name1: e.target.value })} /></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Partner 2 name</label><input style={inputStyle} value={state.name2} onChange={e => updateState({ name2: e.target.value })} /></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Blessing / top text</label><input style={inputStyle} value={state.blessing} onChange={e => updateState({ blessing: e.target.value })} /></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Date (for countdown)</label><input type="date" style={inputStyle} value={state.wdate} onChange={e => updateState({ wdate: e.target.value })} /></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Date display text</label><input style={inputStyle} value={state.dateDisplay} onChange={e => updateState({ dateDisplay: e.target.value })} placeholder="e.g. 26th & 27th Sep 2026" /></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>City</label><input style={inputStyle} value={state.wcity} onChange={e => updateState({ wcity: e.target.value })} /></div>
      <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Love story</label><textarea style={{ ...inputStyle, minHeight: '80px' }} value={state.lovestory} onChange={e => updateState({ lovestory: e.target.value })} /></div>
      <button onClick={onClose} style={{ width: '100%', background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginTop: '8px' }}>Done ✓</button>
    </div>
  )

  if (type === 'events') return (
    <div>
      {state.events.map((ev, idx) => (
        <div key={idx} style={{ background: '#FAF7F0', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '12px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <input style={{ ...inputStyle, flex: 1, fontSize: '14px', padding: '8px 12px' }} value={ev.name} onChange={e => updateEvent(idx, 'name', e.target.value)} />
            <button onClick={() => toggleEvent(idx)} style={{ width: '36px', height: '20px', borderRadius: '10px', background: ev.on ? 'var(--gold)' : 'rgba(92,61,34,0.15)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', background: 'white', top: '2px', right: ev.on ? '2px' : '18px', transition: 'right 0.2s' }}></div>
            </button>
          </div>
          <input style={{ ...inputStyle, marginBottom: '6px' }} value={ev.time} onChange={e => updateEvent(idx, 'time', e.target.value)} placeholder="Date & time" />
          <input style={inputStyle} value={ev.venue} onChange={e => updateEvent(idx, 'venue', e.target.value)} placeholder="Venue" />
        </div>
      ))}
      <button onClick={onClose} style={{ width: '100%', background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginTop: '8px' }}>Done ✓</button>
    </div>
  )

  if (type === 'media') return (
    <div>
      {state.photos.length < 6 && (
        <label style={{ display: 'block', border: '0.5px dashed rgba(201,168,76,0.35)', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', background: '#FAF7F0', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
          <input type="file" accept="image/*" multiple style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} onChange={e => handlePhotoUpload(e.target.files)} />
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>📸</div>
          <div style={{ fontSize: '13px', color: 'var(--espresso-mid)' }}>Tap to upload photos</div>
        </label>
      )}
      <div style={{ fontSize: '11px', color: 'rgba(92,61,34,0.4)', textAlign: 'center', marginBottom: '12px' }}>{state.photos.length}/{MAX_PHOTOS} photos</div>
      {state.photos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridAutoRows: '80px', gap: '8px', marginBottom: '16px' }}>
          {state.photos.map((src, i) => (
            <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => removePhoto(i)} style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(44,26,14,0.7)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Background music</div>
      <label style={{ display: 'block', border: '0.5px dashed rgba(201,168,76,0.35)', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', background: '#FAF7F0', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
        <input type="file" accept="audio/*" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} onChange={e => handleMusicUpload(e.target.files[0])} />
        <div style={{ fontSize: '13px', color: 'var(--espresso-mid)' }}>{state.musicName || 'Tap to upload music'}</div>
      </label>
      <button onClick={onClose} style={{ width: '100%', background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Done ✓</button>
    </div>
  )

  if (type === 'design') return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {[
          { id: 'sindoor', label: 'North Indian', bg: 'linear-gradient(135deg,#8B1A1A,#C9422A,#E8A020)' },
          { id: 'maangalyam', label: 'South Indian', bg: 'linear-gradient(135deg,#1A3A2A,#2D6A4F,#C9A84C)' },
          { id: 'midnight', label: 'Modern Luxury', bg: 'linear-gradient(135deg,#1A1A2E,#16213E,#C9A84C)' },
          { id: 'gulabi', label: 'Floral Romance', bg: 'linear-gradient(135deg,#3D0C11,#8B1A4A,#F2C4CE)' },
          { id: 'keerthana', label: 'Traditional', img: '/images/temple1.jpg' },
        ].map(th => (
          <div key={th.id} onClick={() => updateState({ theme: th.id, blessing: BLESSING_DEFAULTS[th.id] })} style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: state.theme === th.id ? '2px solid var(--gold)' : '2px solid transparent' }}>
            <div style={{ height: '70px', background: th.bg || undefined, backgroundImage: th.img ? `url(${th.img})` : undefined, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', textTransform: 'capitalize' }}>{th.id}</div>
            <div style={{ fontSize: '11px', padding: '5px 8px', textAlign: 'center', color: 'var(--espresso-mid)', background: 'white' }}>{th.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {[{ font: 'Great Vibes', label: 'Script' }, { font: 'Cormorant Garamond', label: 'Serif' }].map(f => (
          <div key={f.font} onClick={() => updateState({ font: f.font })} style={{ border: state.font === f.font ? '1.5px solid var(--gold)' : '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '12px', cursor: 'pointer', textAlign: 'center', background: state.font === f.font ? 'rgba(201,168,76,0.06)' : 'white' }}>
            <div style={{ fontFamily: `'${f.font}',cursive,serif`, fontSize: f.font === 'Great Vibes' ? '22px' : '19px', fontStyle: f.font === 'Cormorant Garamond' ? 'italic' : 'normal', color: 'var(--espresso)', marginBottom: '4px' }}>{f.label === 'Script' ? 'Script' : 'Serif'}</div>
            <div style={{ fontSize: '11px', color: 'var(--espresso-mid)' }}>{f.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAF7F0', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '14px 16px', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--espresso)' }}>Enable RSVP</span>
        <button onClick={() => updateState({ rsvp: !state.rsvp })} style={{ width: '36px', height: '20px', borderRadius: '10px', background: state.rsvp ? 'var(--gold)' : 'rgba(92,61,34,0.15)', border: 'none', cursor: 'pointer', position: 'relative' }}>
          <div style={{ position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', background: 'white', top: '2px', right: state.rsvp ? '2px' : '18px', transition: 'right 0.2s' }}></div>
        </button>
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(92,61,34,0.4)', marginBottom: '12px' }}>RSVP add-on is ₹999 extra at checkout.</div>
      <button onClick={onClose} style={{ width: '100%', background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Done ✓</button>
    </div>
  )

  return null
}

// ─── EXPORT WITH SUSPENSE ─────────────────────────────────────────────────────
export default function EditorPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FFFDF7' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', border: '2px solid rgba(201,168,76,0.2)', borderTopColor: '#C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: '#5C3D22', fontSize: '14px' }}>Loading editor...</p>
        </div>
      </div>
    }>
      <EditorMain />
    </Suspense>
  )
}