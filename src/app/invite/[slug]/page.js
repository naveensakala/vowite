'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { supabase } from '@/lib/supabase'
import { THEME_STYLES } from '@/lib/themes'

export default function InvitePage({ params }) {
  const { slug } = use(params)
  const [invite, setInvite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false)
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpPhone, setRsvpPhone] = useState('')
  const [selectedEvents, setSelectedEvents] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })

  useEffect(() => {
    loadInvite()
  }, [slug])

  async function loadInvite() {
    const { data, error } = await supabase.from('invites').select('*').eq('slug', slug).single()
    if (error || !data) { setError(true); setLoading(false); return }
    setInvite(data)
    // Pre-select all events
    const events = (data.data?.events || []).filter(e => e.on !== false)
    setSelectedEvents(events.map(e => e.name))
    setLoading(false)

    // Start countdown
    if (data.data?.wdate) {
      const target = new Date(data.data.wdate + 'T09:00:00')
      const tick = () => {
        const diff = target - Date.now()
        if (diff <= 0) return
        setCountdown({
          d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
          h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
          m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
          s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
        })
      }
      tick()
      const timer = setInterval(tick, 1000)
      return () => clearInterval(timer)
    }
  }

  async function submitRSVP() {
    if (!rsvpName.trim()) { alert('Please enter your name'); return }
    setSubmitting(true)
    const { error } = await supabase.from('rsvps').insert({
      invite_id: invite.id,
      guest_name: rsvpName,
      guest_phone: rsvpPhone,
      events: selectedEvents,
      status: 'confirmed'
    })
    setSubmitting(false)
    if (error) { alert('Something went wrong. Please try again.'); return }
    setRsvpSubmitted(true)
  }

  function toggleEvent(name) {
    setSelectedEvents(prev => prev.includes(name) ? prev.filter(e => e !== name) : [...prev, name])
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem', background: '#1a0a04' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: '40px', height: '40px', border: '2px solid rgba(201,168,76,0.2)', borderTopColor: '#C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', color: 'rgba(201,168,76,0.6)', fontStyle: 'italic' }}>Opening your invite...</div>
    </div>
  )

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center', background: '#1a0a04' }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', color: '#C9A84C' }}>Invite not found</h2>
      <p style={{ fontSize: '14px', color: 'rgba(255,253,247,0.5)' }}>This invite link may have expired or doesn't exist.</p>
      <a href="/" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: '14px', marginTop: '1rem' }}>← Back to Vowite</a>
    </div>
  )

  const d = invite.data || {}
  const t = THEME_STYLES[invite.theme] || THEME_STYLES.sindoor
  const n1 = d.name1 || 'Partner 1'
  const n2 = d.name2 || 'Partner 2'
  const font = d.font || 'Great Vibes'
  const events = (d.events || []).filter(e => e.on !== false)
  const photos = d.photos || []

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: '#0a0a0a', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=Great+Vibes&display=swap');
        @keyframes wave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.8)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
      <div style={{ width: '100%', maxWidth: '480px', background: 'transparent' }}>

        {/* HERO */}
        <div style={{ background: t.heroBg, padding: '40px 20px 32px', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,253,247,0.5)', letterSpacing: '0.15em', marginBottom: '12px' }}>{d.blessing || '✦ WITH BLESSINGS ✦'}</div>
          {d.aboveNames && <div style={{ fontSize: '13px', color: 'rgba(255,253,247,0.5)', marginBottom: '8px' }}>{d.aboveNames}</div>}
          <div style={{ fontFamily: `'${font}',cursive,serif`, fontSize: '52px', color: t.accentColor, lineHeight: 1.1 }}>{n1}</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '14px', color: 'rgba(255,253,247,0.4)', fontStyle: 'italic', margin: '4px 0' }}>&</div>
          <div style={{ fontFamily: `'${font}',cursive,serif`, fontSize: '52px', color: t.accentColor, lineHeight: 1.1 }}>{n2}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.4)', marginTop: '12px', letterSpacing: '0.08em' }}>{d.dateDisplay} · {d.wcity}</div>
          {d.lovestory && <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(255,253,247,0.5)', marginTop: '16px', maxWidth: '320px', margin: '16px auto 0', lineHeight: 1.6 }}>"{d.lovestory}"</div>}
        </div>

        <div style={{ height: '0.5px', background: `linear-gradient(90deg,transparent,${t.accentColor},transparent)` }}></div>

        {/* MUSIC BAR */}
        {d.musicName && (
          <div style={{ background: t.musicBg, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '0.5px solid rgba(201,168,76,0.1)' }}>
            <div style={{ fontSize: '18px' }}>♪</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.7)' }}>{d.musicName}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,253,247,0.3)' }}>playing softly for guests</div>
            </div>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[0,1,2,3,4].map(i => <div key={i} style={{ width: '3px', background: t.accentColor, borderRadius: '2px', animation: `wave 1s ease-in-out infinite`, animationDelay: `${i * 0.1}s`, height: `${8 + i * 3}px` }}></div>)}
            </div>
          </div>
        )}

        {/* COUNTDOWN */}
        <div style={{ background: t.countdownBg, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,253,247,0.4)', marginBottom: '10px' }}>COUNTING DOWN TO FOREVER</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
            {[[countdown.d,'DAYS'],[countdown.h,'HRS'],[countdown.m,'MIN'],[countdown.s,'SEC']].map(([val,lbl], i) => (
              <>
                <div key={lbl} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 600, color: t.accentColor, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,253,247,0.4)' }}>{lbl}</div>
                </div>
                {i < 3 && <div style={{ fontSize: '20px', color: 'rgba(201,168,76,0.3)', marginBottom: '10px' }}>:</div>}
              </>
            ))}
          </div>
        </div>

        {/* EVENTS */}
        <div style={{ background: t.sectionBg, padding: '20px 16px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,253,247,0.4)', textAlign: 'center', marginBottom: '4px' }}>CELEBRATIONS</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', color: t.accentColor, textAlign: 'center', fontStyle: 'italic', marginBottom: '16px' }}>Join us for every moment</div>
          {events.map(ev => (
            <div key={ev.name} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', background: 'rgba(201,168,76,0.06)', borderRadius: '12px', marginBottom: '10px', border: '0.5px solid rgba(201,168,76,0.12)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{ev.icon || '🎉'}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFDF7', marginBottom: '2px' }}>{ev.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.5)' }}>{ev.time}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.4)' }}>{ev.venue}</div>
                {ev.map && <a href={ev.map} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: t.accentColor, textDecoration: 'none', marginTop: '4px', display: 'inline-block' }}>📍 Get directions</a>}
              </div>
            </div>
          ))}
        </div>

        {/* GALLERY */}
        {photos.length > 0 && (
          <div style={{ padding: '20px 16px 8px', background: t.sectionBg }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,253,247,0.4)', textAlign: 'center', marginBottom: '4px' }}>OUR STORY</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', color: t.accentColor, textAlign: 'center', fontStyle: 'italic', marginBottom: '12px' }}>Moments we cherish</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridAutoRows: '80px', gap: '5px' }}>
              {photos.map((src, i) => (
                <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1', borderRadius: '7px', overflow: 'hidden' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEO */}
        {d.videoId && (
          <div style={{ padding: '16px', background: t.sectionBg }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', color: t.accentColor, textAlign: 'center', fontStyle: 'italic', marginBottom: '12px' }}>Our Story</div>
            <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${d.videoId}`} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        )}

        {/* RSVP */}
        {invite.rsvp_enabled && (
          <div style={{ padding: '2rem', background: 'rgba(201,168,76,0.04)', borderTop: '0.5px solid rgba(201,168,76,0.15)' }}>
            {rsvpSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🎉</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: '#C9A84C', marginBottom: '0.5rem' }}>See you there!</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,253,247,0.5)' }}>Your RSVP has been confirmed. We can't wait to celebrate with you!</div>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: '#C9A84C', textAlign: 'center', marginBottom: '0.5rem' }}>Will you join us?</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,253,247,0.5)', textAlign: 'center', marginBottom: '1.5rem' }}>Let us know you're coming</div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,253,247,0.5)', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Your name</label>
                  <input type="text" value={rsvpName} onChange={e => setRsvpName(e.target.value)} placeholder="Enter your name" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,253,247,0.06)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '12px', fontSize: '14px', color: '#FFFDF7', fontFamily: "'DM Sans',sans-serif", outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,253,247,0.5)', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>WhatsApp number</label>
                  <input type="tel" value={rsvpPhone} onChange={e => setRsvpPhone(e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,253,247,0.06)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '12px', fontSize: '14px', color: '#FFFDF7', fontFamily: "'DM Sans',sans-serif", outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,253,247,0.5)', marginBottom: '8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Which events will you attend?</label>
                  {events.map(ev => (
                    <label key={ev.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,253,247,0.04)', border: '0.5px solid rgba(201,168,76,0.15)', borderRadius: '10px', padding: '12px', cursor: 'pointer', marginBottom: '8px' }}>
                      <input type="checkbox" checked={selectedEvents.includes(ev.name)} onChange={() => toggleEvent(ev.name)} style={{ width: '16px', height: '16px', accentColor: '#C9A84C' }} />
                      <div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,253,247,0.8)' }}>{ev.icon} {ev.name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,253,247,0.4)', marginTop: '2px' }}>{ev.time} · {ev.venue}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <button onClick={submitRSVP} disabled={submitting} style={{ width: '100%', padding: '14px', background: '#C9A84C', color: '#2C1A0E', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 500, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans',sans-serif", opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? 'Confirming...' : 'Confirm attendance ✦'}
                </button>
              </>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div style={{ background: t.footerBg, padding: '24px 16px', textAlign: 'center', borderTop: '0.5px solid rgba(201,168,76,0.1)' }}>
          <div style={{ fontFamily: `'${font}',cursive,serif`, fontSize: '32px', color: t.accentColor }}>{n1} & {n2}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.3)', marginTop: '6px' }}>{d.dateDisplay} · {d.wcity}</div>
          {d.footerQuote && <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,253,247,0.25)', marginTop: '8px' }}>"{d.footerQuote}"</div>}
          <div style={{ fontSize: '10px', color: 'rgba(255,253,247,0.15)', marginTop: '12px' }}>Made with love on <a href="/" style={{ color: 'rgba(201,168,76,0.3)', textDecoration: 'none' }}>Vowite</a></div>
        </div>
      </div>
    </div>
  )
}
