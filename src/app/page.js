'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

const THEMES = [
  { id: 'sindoor', name: 'Sindoor', sub: 'North Indian Hindu', bg: 'linear-gradient(135deg,#8B1A1A,#C9422A,#E8A020)', defaultPrice: 1999, defaultTag: 'Popular' },
  { id: 'maangalyam', name: 'Maangalyam', sub: 'South Indian', bg: 'linear-gradient(135deg,#1A3A2A,#2D6A4F,#C9A84C)', defaultPrice: 1999, defaultTag: 'New' },
  { id: 'midnight', name: 'Midnight Gold', sub: 'Modern Luxury', bg: 'linear-gradient(135deg,#1A1A2E,#16213E,#C9A84C)', defaultPrice: 2499, defaultTag: 'Premium' },
  { id: 'gulabi', name: 'Gulabi', sub: 'Floral Romance', bg: 'linear-gradient(135deg,#3D0C11,#8B1A4A,#F2C4CE)', defaultPrice: 2499, defaultTag: 'Premium' },
  { id: 'keerthana', name: 'Keerthana', sub: 'Traditional South Indian', bg: null, img: '/images/temple1.jpg', defaultPrice: 2499, defaultTag: 'New' },
]

export default function HomePage() {
  const [cdDays, setCdDays] = useState('42')
  const [cdHrs, setCdHrs] = useState('08')
  const [cdMin, setCdMin] = useState('35')
  const [cdSec, setCdSec] = useState('00')
  const [themePrices, setThemePrices] = useState({})

  useEffect(() => {
    // Countdown
    const target = new Date(Date.now() + 42 * 24 * 60 * 60 * 1000)
    const timer = setInterval(() => {
      const diff = target - Date.now()
      if (diff <= 0) return
      setCdDays(String(Math.floor(diff / 86400000)).padStart(2, '0'))
      setCdHrs(String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'))
      setCdMin(String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'))
      setCdSec(String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'))
    }, 1000)

    // Load dynamic prices
    supabase.from('themes').select('id,price,tag').eq('is_active', true)
      .then(({ data }) => {
        if (data) {
          const prices = {}
          data.forEach(t => prices[t.id] = { price: t.price, tag: t.tag })
          setThemePrices(prices)
        }
      })

    // Fade up observer
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80)
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))

    // Petals
    const container = document.getElementById('petals')
    if (container) {
      const colors = ['#F2C4CE', '#E8D5B0', '#C9A84C', '#F5EDD8']
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div')
        p.className = 'petal'
        const size = Math.random() * 8 + 4
        p.style.cssText = `width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:50% 0 50% 0;left:${Math.random() * 100}%;top:-20px;animation-duration:${Math.random() * 8 + 6}s;animation-delay:${Math.random() * 8}s;position:absolute;opacity:0;animation-name:fall;animation-timing-function:linear;animation-iteration-count:infinite;`
        container.appendChild(p)
      }
    }

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <style>{`
        @keyframes fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:0.7} 100%{transform:translateY(110vh) rotate(360deg);opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hero-badge-dot{animation:pulse 2s ease-in-out infinite}
        .feat-card:hover{border-color:rgba(201,168,76,0.5)!important;transform:translateY(-2px)}
        .theme-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(44,26,14,0.12)!important}
        .theme-card{transition:all 0.2s}
        @media(max-width:768px){
          .themes-grid{grid-template-columns:repeat(2,1fr)!important}
          .rsvp-inner{grid-template-columns:1fr!important;gap:3rem!important}
          .steps{grid-template-columns:1fr 1fr!important}
          .pricing-grid{grid-template-columns:1fr!important}
          .testi-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:400px){.themes-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '7rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(242,196,206,0.25) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(201,168,76,0.12) 0%,transparent 60%)', pointerEvents: 'none' }}></div>
        <div id="petals" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}></div>
        <div className="fade-up" style={{ position: 'relative', maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(201,168,76,0.12)', border: '0.5px solid rgba(201,168,76,0.35)', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 500, marginBottom: '1.5rem', letterSpacing: '0.04em' }}>
            <div className="hero-badge-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }}></div>
            Now live — Hindu & South Indian themes
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(48px,8vw,88px)', fontWeight: 500, lineHeight: 1.05, color: 'var(--espresso)', marginBottom: '1.2rem' }}>
            Wedding invites that make guests say <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>"Woah"</em>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'var(--espresso-mid)', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 2.5rem', fontWeight: 300 }}>
            Beautiful, interactive digital invites with live countdowns, photo galleries and background music. Plus built-in RSVP — know exactly who's coming. No boring PDFs.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="#themes" className="btn-primary">Browse themes</Link>
            <Link href="#how" className="btn-secondary">See how it works</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', fontSize: '13px', color: 'var(--espresso-mid)' }}>
            <div style={{ display: 'flex' }}>
              {[['#F2C4CE','#993556','P'],['#E1F5EE','#0F6E56','A'],['#EEEDFE','#3C3489','R'],['#FAEEDA','#633806','S']].map(([bg,color,letter], i) => (
                <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid var(--ivory)', marginLeft: i === 0 ? 0 : '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 500, background: bg, color }}>{letter}</div>
              ))}
            </div>
            <span>Loved by 200+ couples across India & abroad</span>
          </div>
        </div>
      </section>

{/* PHONE PREVIEW */}
      <div style={{ padding: '3rem 2rem 5rem', background: 'linear-gradient(180deg,var(--ivory) 0%,var(--ivory-dark) 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '3rem', alignItems: 'center' }}>

          {/* LEFT — Problem */}
          <div className="fade-up" style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>😩</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>The old way</div>
              <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>Blurry Canva PDF on WhatsApp. Nobody knows the venue. 200 "are you coming?" messages.</div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>📅</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>No RSVP tracking</div>
              <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>You have no idea who's actually coming until the morning of.</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>😐</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>Forgettable</div>
              <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>A static image. No music, no countdown, no emotions. Just text on a card.</div>
            </div>
          </div>

          {/* CENTER — Phone */}
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--gold-dark)', fontWeight: 500, textTransform: 'uppercase' }}>Live invite preview</p>
            {/* Phone frame */}
            <div style={{ position: 'relative', width: '260px' }}>
              {/* Side buttons */}
              <div style={{ position: 'absolute', left: '-4px', top: '80px', width: '4px', height: '28px', background: '#1a1008', borderRadius: '2px 0 0 2px' }}></div>
              <div style={{ position: 'absolute', left: '-4px', top: '120px', width: '4px', height: '48px', background: '#1a1008', borderRadius: '2px 0 0 2px' }}></div>
              <div style={{ position: 'absolute', right: '-4px', top: '100px', width: '4px', height: '52px', background: '#1a1008', borderRadius: '0 2px 2px 0' }}></div>
              {/* Phone shell */}
              <div style={{ background: '#1a1008', borderRadius: '44px', padding: '12px', boxShadow: '0 40px 80px rgba(44,26,14,0.25), 0 0 0 1px rgba(255,255,255,0.05)' }}>
                {/* Notch */}
                <div style={{ background: '#0e0804', height: '28px', borderRadius: '32px 32px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '72px', height: '6px', background: '#1a1008', borderRadius: '100px' }}></div>
                </div>
                {/* Screen */}
                <div style={{ borderRadius: '0 0 32px 32px', overflow: 'hidden', maxHeight: '520px', overflowY: 'auto' }}>
                  {/* Invite content */}
                  <div style={{ background: 'linear-gradient(160deg,#2C1A0E 0%,#5C3D22 100%)', padding: '24px 16px 20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '9px', color: 'rgba(201,168,76,0.7)', letterSpacing: '0.15em', marginBottom: '8px' }}>✦ WITH BLESSINGS OF THE ALMIGHTY ✦</p>
                    <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: '32px', color: '#C9A84C', lineHeight: 1.1 }}>Priya <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '12px', color: 'rgba(232,213,176,0.6)', fontStyle: 'italic' }}>&</span> Arjun</div>
                    <p style={{ fontSize: '8px', color: 'rgba(232,213,176,0.45)', letterSpacing: '0.12em', marginTop: '6px' }}>REQUEST THE PLEASURE OF YOUR COMPANY</p>
                  </div>
                  <div style={{ height: '0.5px', background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }}></div>
                  <div style={{ padding: '12px', background: '#2C1A0E' }}>
                    {[['🌿','Haldi Ceremony','Fri, 14 Feb · 10:00 AM'],['🎶','Sangeet Night','Fri, 14 Feb · 7:00 PM'],['💍','Wedding','Sat, 15 Feb · 9:00 AM']].map(([icon,name,detail]) => (
                      <div key={name} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px', background: 'rgba(201,168,76,0.06)', borderRadius: '8px', marginBottom: '6px', border: '0.5px solid rgba(201,168,76,0.12)' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>{icon}</div>
                        <div><div style={{ fontSize: '11px', fontWeight: 500, color: '#FFFDF7' }}>{name}</div><div style={{ fontSize: '9px', color: 'rgba(255,253,247,0.45)' }}>{detail}</div></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', padding: '10px', background: '#8B1A1A' }}>
                    <div style={{ fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(255,253,247,0.45)', marginBottom: '5px' }}>COUNTING DOWN TO FOREVER</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center' }}>
                      {[[cdDays,'days'],[cdHrs,'hrs'],[cdMin,'min'],[cdSec,'sec']].map(([val,lbl], i) => (
                        <>
                          <div key={lbl} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 600, color: '#C9A84C', lineHeight: 1 }}>{val}</div>
                            <div style={{ fontSize: '7px', color: 'rgba(255,253,247,0.4)' }}>{lbl}</div>
                          </div>
                          {i < 3 && <div style={{ fontSize: '14px', color: 'rgba(201,168,76,0.35)', marginBottom: '8px' }}>:</div>}
                        </>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: '#2C1A0E', padding: '10px 12px' }}>
                    <div style={{ background: '#C9A84C', color: '#2C1A0E', border: 'none', borderRadius: '100px', padding: '9px', fontSize: '11px', fontWeight: 500, width: '100%', textAlign: 'center', letterSpacing: '0.05em' }}>RSVP Now ✦</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(201,168,76,0.08)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', color: 'var(--gold-dark)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s ease-in-out infinite' }}></div>
              Live — updates as you type
            </div>
          </div>

          {/* RIGHT — Solution */}
          <div className="fade-up" style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>🎉</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>The Vowite way</div>
              <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>A stunning interactive invite with music, countdown and animations. Guests say "Woah" the moment they open it.</div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>✅</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>Live RSVP dashboard</div>
              <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>Know exactly who's coming to each event. Export the list with one click.</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>💫</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>Unforgettable</div>
              <div style={{ fontSize: '14px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>Live countdown, photo gallery, your song playing softly. The first memory of your wedding.</div>
            </div>
          </div>

        </div>
        <style>{`@media(max-width:900px){.preview-three-col{grid-template-columns:1fr!important}}`}</style>
      </div>

      {/* FEATURES */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p className="section-eyebrow fade-up">Why Vowite</p>
        <h2 className="section-title fade-up">Everything your invite <em>deserves</em></h2>
        <p className="section-sub fade-up">Built for Indian weddings. Designed for the world.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {[['✨','Animated reveal','Guests get a stunning opening animation the moment they tap your link.'],['⏳','Live countdown','A real-time countdown to your wedding day, ticking for every guest.'],['📸','Photo gallery','Showcase your pre-wedding shoot with a beautiful lightbox gallery.'],['🎵','Background music','Set the mood with your favourite song playing softly in the background.'],['📍','Venue maps','Google Maps embedded for every event — guests get directions instantly.'],['🎬','Pre-wedding video','Embed your pre-wedding film right inside the invite.'],
['✉️','Guest RSVP','Guests confirm attendance directly from the invite — one tap, done.'],
['📊','RSVP dashboard','See live headcount per event, export guest list, track every response.']].map(([icon,title,desc]) => (
            <div key={title} className="feat-card fade-up" style={{ background: 'white', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.5rem', transition: 'all 0.2s' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '1rem' }}>{icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '6px' }}>{title}</div>
              <div style={{ fontSize: '13px', color: 'var(--espresso-mid)', lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

{/* RSVP SECTION */}
      <section style={{ padding: '5rem 2rem', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p className="section-eyebrow fade-up" style={{ textAlign: 'left' }}>The Vowite difference</p>
            <h2 className="section-title fade-up" style={{ textAlign: 'left' }}>No more <em>"Are you coming?"</em> on WhatsApp</h2>
            <p className="fade-up" style={{ fontSize: '16px', color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>Every couple knows the chaos — 200 messages, last-minute headcount confusion, venue coordinators calling at midnight. Vowite's RSVP feature fixes all of that.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {[['Guests RSVP directly from the invite','One tap, done. No forms, no WhatsApp back and forth.'],['Live headcount per event','See exactly how many people are coming to Haldi, Sangeet, Wedding — separately.'],['Your own dashboard','Track every response, export the guest list, send broadcast updates.']].map(([title, desc]) => (
                <div key={title} className="fade-up" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '0.5px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--gold-dark)', flexShrink: 0, marginTop: '2px' }}>✓</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '3px' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--espresso-mid)', lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', background: 'rgba(201,168,76,0.08)', border: '0.5px solid rgba(201,168,76,0.25)', borderRadius: '12px', padding: '12px 16px', marginBottom: '1.5rem' }}>
              <span style={{ background: 'var(--gold)', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '100px', fontWeight: 500 }}>Add-on</span>
              <span style={{ fontSize: '16px', fontWeight: 500 }}>₹999 extra</span>
              <span style={{ fontSize: '13px', color: 'var(--espresso-mid)', fontWeight: 300 }}>— added at checkout, works with any theme</span>
            </div>
            <Link href="#themes" className="btn-primary" style={{ display: 'inline-block' }}>See themes & pricing</Link>
          </div>

          {/* LAPTOP + PHONE MOCKUP */}
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', paddingBottom: '40px' }}>
            {/* LAPTOP */}
            <div style={{ width: '340px' }}>
              <div style={{ background: '#1a1008', borderRadius: '12px 12px 0 0', padding: '8px 8px 0', boxShadow: '0 20px 60px rgba(44,26,14,0.2)' }}>
                <div style={{ background: '#0e0804', borderRadius: '6px 6px 0 0', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '12px', marginLeft: '8px' }}></div>
                </div>
                <div style={{ background: '#f8f5f0', padding: '10px', minHeight: '180px' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    {[['48','Confirmed','#4CAF82'],['12','Pending','#C9A84C'],['3','Declined','#e57373']].map(([num,lbl,color]) => (
                      <div key={lbl} style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '8px 6px', textAlign: 'center', border: '0.5px solid rgba(201,168,76,0.15)' }}>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 600, color, lineHeight: 1 }}>{num}</div>
                        <div style={{ fontSize: '8px', color: '#5C3D22', marginTop: '2px' }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'white', borderRadius: '8px', padding: '8px', border: '0.5px solid rgba(201,168,76,0.15)' }}>
                    <div style={{ fontSize: '9px', fontWeight: 500, color: '#2C1A0E', marginBottom: '6px' }}>Headcount per event</div>
                    {[['💛 Haldi','75%','36'],['🎶 Sangeet','88%','44'],['💍 Wedding','96%','48']].map(([name,pct,cnt]) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                        <div style={{ fontSize: '8px', color: '#5C3D22', width: '55px', flexShrink: 0 }}>{name}</div>
                        <div style={{ flex: 1, height: '4px', background: 'rgba(201,168,76,0.12)', borderRadius: '100px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#C9A84C', borderRadius: '100px', width: pct }}></div>
                        </div>
                        <div style={{ fontSize: '8px', color: '#C9A84C', width: '16px', textAlign: 'right' }}>{cnt}</div>
                      </div>
                    ))}
                    <div style={{ marginTop: '8px', borderTop: '0.5px solid rgba(201,168,76,0.1)', paddingTop: '6px' }}>
                      {[['Meera Sharma','3 events','confirmed'],['Rajesh & Family','2 events','confirmed'],['Ananya Iyer','Pending','pending']].map(([name,events,status]) => (
                        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: status === 'confirmed' ? '#4CAF82' : '#C9A84C', flexShrink: 0 }}></div>
                          <div style={{ fontSize: '8px', color: '#2C1A0E', flex: 1 }}>{name}</div>
                          <div style={{ fontSize: '7px', color: '#5C3D22' }}>{events}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ background: '#1a1008', height: '12px', borderRadius: '0 0 4px 4px' }}>
                <div style={{ margin: '0 -20px', height: '8px', background: '#0e0804', borderRadius: '0 0 8px 8px', marginTop: '12px' }}></div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--espresso-mid)', fontWeight: 300, marginTop: '16px' }}>Couple's dashboard</div>

            {/* PHONE overlapping */}
            <div style={{ position: 'absolute', bottom: '0px', right: '0px', width: '110px' }}>
              <div style={{ background: '#1a1008', borderRadius: '18px', padding: '5px', boxShadow: '0 16px 40px rgba(44,26,14,0.3)', border: '3px solid #0e0804' }}>
                <div style={{ background: '#0e0804', height: '10px', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '28px', height: '3px', background: '#1a1008', borderRadius: '100px' }}></div>
                </div>
                <div style={{ background: 'linear-gradient(160deg,#2C1A0E,#5C3D22)', padding: '8px', borderRadius: '0 0 12px 12px' }}>
                  <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: '14px', color: '#C9A84C', textAlign: 'center', lineHeight: 1.2 }}>Priya<br/>&amp; Arjun</div>
                  <div style={{ height: '0.5px', background: 'rgba(201,168,76,0.3)', margin: '5px 0' }}></div>
                  <div style={{ fontSize: '6px', color: 'rgba(255,253,247,0.5)', textAlign: 'center', letterSpacing: '0.05em' }}>TAP TO RSVP ✦</div>
                  <div style={{ background: '#C9A84C', borderRadius: '100px', padding: '3px', textAlign: 'center', marginTop: '5px', fontSize: '6px', fontWeight: 600, color: '#2C1A0E' }}>RSVP Now</div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '9px', color: 'var(--espresso-mid)', fontWeight: 300 }}>Guest's phone</div>
            </div>
          </div>

        </div>
      </section>

      {/* THEMES */}
      <section id="themes" style={{ background: 'var(--ivory-dark)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-eyebrow fade-up">Choose your style</p>
          <h2 className="section-title fade-up">Themes for every <em>tradition</em></h2>
          <p className="section-sub fade-up">Crafted with love for Hindu and South Indian weddings.</p>
          <div className="themes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {THEMES.map(theme => {
              const live = themePrices[theme.id]
              const price = live?.price || theme.defaultPrice
              const tag = live?.tag || theme.defaultTag
              return (
                <Link key={theme.id} href={`/themes/${theme.id}`} className="theme-card fade-up" style={{ borderRadius: '16px', overflow: 'hidden', border: '0.5px solid rgba(201,168,76,0.2)', cursor: 'pointer', background: 'white', textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: theme.bg || undefined }}>
                    {theme.img && <Image src={theme.img} alt={theme.name} fill style={{ objectFit: 'cover' }} />}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,0.6))', padding: '20px 12px 10px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', color: 'white', fontWeight: 500 }}>{theme.name}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{theme.sub}</div>
                    </div>
                  </div>
                  <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--espresso)' }}>From ₹{price.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '10px', background: 'rgba(201,168,76,0.12)', color: 'var(--gold-dark)', padding: '2px 8px', borderRadius: '100px', border: '0.5px solid rgba(201,168,76,0.25)' }}>{tag}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p className="section-eyebrow fade-up">Simple process</p>
        <h2 className="section-title fade-up">Ready in <em>minutes</em></h2>
        <p className="section-sub fade-up">No design skills needed. No apps to download.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 0, maxWidth: '900px', margin: '0 auto' }}>
          {[['1','Pick a theme','Browse our collection and choose the one that feels like you.'],['2','Edit live','Type your details, upload photos, add music — see it update instantly.'],['3','Pay & publish','One-time payment. Your invite goes live on a beautiful unique link.'],['4','Share on WhatsApp','Send the link to everyone. They open it, they say "Woah."']].map(([num,title,desc]) => (
            <div key={num} className="fade-up" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '0.5px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', color: 'var(--gold-dark)', margin: '0 auto 1rem', fontWeight: 600 }}>{num}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--espresso)', marginBottom: '6px' }}>{title}</div>
              <div style={{ fontSize: '13px', color: 'var(--espresso-mid)', lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-eyebrow fade-up">Pricing</p>
        <h2 className="section-title fade-up">One-time. No <em>subscriptions.</em></h2>
        <p className="section-sub fade-up">Pay once, your invite stays live for a full year.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { name: 'Self-serve', price: 'From ₹999', desc: 'Pick a theme and build it yourself using our live editor.', features: ['All invite features','Live editor access','Hosted for 1 year','Shareable WhatsApp link','Photo gallery + music'], featured: false, special: false, cta: 'Browse themes', href: '#themes' },
            { name: 'Self-serve + RSVP', price: 'From ₹1,998', desc: 'Everything in Self-serve plus live guest RSVP tracking.', features: ['Everything in Self-serve','Guest RSVP form','Live couple dashboard','Headcount per event','Export guest list CSV'], featured: true, special: false, cta: 'Browse themes', href: '#themes' },
            { name: 'Done for you', price: '₹1,499 extra', desc: 'Pick any theme, fill our form with your details and photos — we build it for you within 48 hours.', features: ['You choose the theme','Fill a simple details form','We build it in 48 hours','2 rounds of changes','We publish & hand over'], featured: false, special: false, cta: 'Get in touch', href: '/contact' },
            { name: 'Bespoke', price: '₹14,999', desc: 'A completely custom invite built exclusively for you. By consultation only — not available publicly.', features: ['Private custom theme','Consultation call included','Built around your taste','RSVP dashboard included','Changes till you\'re satisfied'], featured: false, special: true, cta: 'Apply now', href: '/contact' },
          ].map(plan => (
            <div key={plan.name} className="fade-up" style={{ background: plan.special ? 'linear-gradient(135deg,#2C1A0E,#5C3D22)' : 'white', border: plan.special ? 'none' : '0.5px solid rgba(201,168,76,0.2)', borderRadius: '20px', padding: '2rem', paddingTop: '3rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {plan.special && <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'rgba(201,168,76,0.08)', borderRadius: '0 0 0 100px' }}></div>}
              {plan.featured && <div style={{ position: 'absolute', top: '1.25rem', left: '2rem', width: 'fit-content', background: 'var(--gold)', color: 'white', fontSize: '11px', padding: '3px 10px', borderRadius: '100px', fontWeight: 500 }}>Most popular</div>}
              {plan.special && <div style={{ position: 'absolute', top: '1.25rem', left: '2rem', width: 'fit-content', background: 'rgba(201,168,76,0.2)', color: 'var(--gold)', fontSize: '11px', padding: '3px 10px', borderRadius: '100px', fontWeight: 500, border: '0.5px solid rgba(201,168,76,0.3)' }}>✦ Exclusive</div>}
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 500, color: plan.special ? 'var(--ivory)' : 'var(--espresso)', marginBottom: '4px' }}>{plan.name}</div>
              <div style={{ fontSize: '28px', fontWeight: 500, margin: '0.75rem 0 0.25rem', color: plan.special ? 'var(--gold)' : 'var(--espresso)' }}>{plan.price}</div>
              <div style={{ fontSize: '13px', color: plan.special ? 'rgba(255,253,247,0.6)' : 'var(--espresso-mid)', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 300, minHeight: '60px' }}>{plan.desc}</div>
              <ul style={{ listStyle: 'none', marginBottom: '1.5rem', flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: '13px', color: plan.special ? 'rgba(255,253,247,0.7)' : 'var(--espresso-mid)', padding: '6px 0', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: plan.special ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(201,168,76,0.1)' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: plan.special ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'var(--gold)', flexShrink: 0 }}>✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, background: plan.featured ? 'var(--espresso)' : plan.special ? 'var(--gold)' : 'transparent', color: plan.featured ? 'var(--ivory)' : plan.special ? 'var(--espresso)' : 'var(--espresso)', border: plan.featured || plan.special ? 'none' : '0.5px solid rgba(44,26,14,0.25)', textDecoration: 'none' }}>{plan.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--espresso)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-eyebrow fade-up" style={{ color: 'var(--gold)' }}>Love stories</p>
          <h2 className="section-title fade-up" style={{ color: 'var(--ivory)' }}>What couples are <em>saying</em></h2>
          <p className="section-sub fade-up" style={{ color: 'rgba(255,253,247,0.5)', marginBottom: '3rem' }}>Real reactions from real weddings.</p>
          <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {[['PA','Priya & Arjun','Chennai · Hindu wedding','"Our guests couldn\'t stop talking about the invite. Everyone asked how we made it!"'],['SR','Sindhu & Rajan','Bengaluru · South Indian','"Set it up in 20 minutes. The countdown timer alone made my mother cry happy tears."'],['NK','Neha & Karthik','Dubai · Tamil Brahmin','"So much better than a Canva card on WhatsApp. Worth every rupee and more."']].map(([init,name,detail,quote]) => (
              <div key={name} className="fade-up" style={{ background: 'rgba(255,253,247,0.06)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.5rem' }}>
                <div style={{ color: 'var(--gold)', fontSize: '11px', marginBottom: '0.75rem' }}>★★★★★</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '17px', color: 'var(--ivory)', lineHeight: 1.5, marginBottom: '1rem', fontStyle: 'italic' }}>{quote}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 500, color: 'var(--gold)' }}>{init}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ivory)' }}>{name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,253,247,0.45)' }}>{detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem' }}>
        <div className="fade-up" style={{ background: 'linear-gradient(135deg,var(--espresso) 0%,#5C3D22 100%)', borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,5vw,48px)', color: 'var(--ivory)', fontWeight: 500, marginBottom: '0.75rem' }}>Your love story deserves a <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Woah</em></h2>
          <p style={{ color: 'rgba(255,253,247,0.6)', fontSize: '16px', marginBottom: '2rem', fontWeight: 300 }}>Join hundreds of couples who chose to make their invite unforgettable.</p>
          <Link href="#themes" style={{ background: 'var(--gold)', color: 'var(--espresso)', padding: '14px 32px', borderRadius: '100px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>Create your Vowite</Link>
        </div>
      </section>

    </>
  )
}
