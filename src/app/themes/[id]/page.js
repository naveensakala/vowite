'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { THEME_STYLES } from '@/lib/themes'

const THEME_VISUALS = {
  sindoor:    { previewBg: 'linear-gradient(160deg,#2C1A0E,#8B1A1A,#C9422A)', accent: '#C9A84C' },
  maangalyam: { previewBg: 'linear-gradient(160deg,#1A3A2A,#2D6A4F)', accent: '#C9A84C' },
  midnight:   { previewBg: 'linear-gradient(160deg,#0a0a1a,#1A1A2E,#16213E)', accent: '#C9A84C' },
  gulabi:     { previewBg: 'linear-gradient(160deg,#3D0C11,#8B1A4A)', accent: '#F2C4CE' },
  keerthana:  { previewBg: 'linear-gradient(180deg,#FDF6EC,#F5ECD7)', accent: '#C9A84C', light: true },
}

const THEME_DEFAULTS = {
  sindoor:    { name: 'Sindoor',        category: 'North Indian Hindu', price: 1999, tag: 'Popular' },
  maangalyam: { name: 'Maangalyam',    category: 'South Indian',       price: 1999, tag: 'New' },
  midnight:   { name: 'Midnight Gold', category: 'Modern Luxury',      price: 2499, tag: 'Premium' },
  gulabi:     { name: 'Gulabi',         category: 'North Indian Hindu', price: 1999, tag: '' },
  keerthana:  { name: 'Keerthana',      category: 'South Indian',       price: 1999, tag: '' },
}

export default function ThemeDetailPage() {
  const { id } = useParams()
  const [theme, setTheme] = useState(THEME_DEFAULTS[id] || null)

  useEffect(() => {
    if (!id) return
    supabase.from('themes').select('*').eq('id', id).single()
      .then(({ data }) => {
        if (data) setTheme(t => ({ ...t, ...data }))
      })
  }, [id])

  if (!THEME_VISUALS[id]) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        Theme not found. <Link href="/themes">Browse all themes</Link>
      </div>
    )
  }

  if (!theme) return null

  const vis = THEME_VISUALS[id]
  const styles = THEME_STYLES[id] || {}

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: 'var(--ivory)', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=Great+Vibes&display=swap');
        :root{--gold:#C9A84C;--gold-dark:#9C7A2E;--ivory:#FFFDF7;--espresso:#2C1A0E;--espresso-mid:#5C3D22;}
      `}</style>

      {/* TOP BAR */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '54px', background: 'white', borderBottom: '0.5px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
        <Link href="/themes" style={{ fontSize: '13px', color: 'var(--espresso-mid)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back to themes</Link>
        <Link href="/"><Image src="/images/logo.png" alt="Vowite" height={36} width={120} style={{ height: '36px', width: 'auto' }} /></Link>
        <Link href={`/editor?theme=${id}`} style={{ background: 'var(--espresso)', color: 'var(--ivory)', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>Use this theme ✦</Link>
      </div>

      {/* BANNER */}
      <div style={{ position: 'fixed', top: '54px', left: 0, right: 0, zIndex: 99, background: 'white', borderBottom: '0.5px solid rgba(201,168,76,0.2)', padding: '8px 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
          {theme.name} · {theme.category}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--espresso-mid)' }}>
          From <strong style={{ color: 'var(--gold-dark)' }}>₹{(theme.price || 1999).toLocaleString('en-IN')}</strong> one-time
        </div>
      </div>

      {/* DEMO INVITE */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 20px 40px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ background: vis.previewBg, padding: '40px 20px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,253,247,0.5)', letterSpacing: '0.15em', marginBottom: '12px' }}>✦ WITH BLESSINGS ✦</div>
            <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: '52px', color: vis.accent, lineHeight: 1.1 }}>Kavya</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '14px', color: 'rgba(255,253,247,0.4)', fontStyle: 'italic', margin: '4px 0' }}>&</div>
            <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: '52px', color: vis.accent, lineHeight: 1.1 }}>Karthik</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.4)', marginTop: '12px', letterSpacing: '0.08em' }}>Sunday, 22nd March 2026 · Bengaluru</div>
          </div>

          <div style={{ height: '0.5px', background: `linear-gradient(90deg,transparent,${vis.accent},transparent)` }}></div>

          <div style={{ background: styles.countdownBg || '#1a1a2e', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,253,247,0.4)', marginBottom: '10px' }}>COUNTING DOWN TO FOREVER</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
              {[['45','DAYS'],['12','HRS'],['30','MIN'],['00','SEC']].map(([val,lbl], i) => (
                <span key={lbl} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 600, color: vis.accent, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,253,247,0.4)' }}>{lbl}</div>
                  </span>
                  {i < 3 && <span style={{ fontSize: '20px', color: 'rgba(201,168,76,0.3)', marginBottom: '10px' }}>:</span>}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: styles.sectionBg || '#0f0f1f', padding: '20px 16px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,253,247,0.4)', textAlign: 'center', marginBottom: '4px' }}>CELEBRATIONS</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', color: vis.accent, textAlign: 'center', fontStyle: 'italic', marginBottom: '16px' }}>Join us for every moment</div>
            {[['🌿','Haldi Ceremony','Fri, 21 Mar · 10:00 AM','Taj Garden'],['🎶','Sangeet Night','Fri, 21 Mar · 7:00 PM','Grand Ballroom'],['💍','Wedding','Sat, 22 Mar · 9:00 AM','ISKCON Temple'],['🥂','Reception','Sat, 22 Mar · 7:00 PM','ITC Gardenia']].map(ev => (
              <div key={ev[1]} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', background: 'rgba(201,168,76,0.06)', borderRadius: '12px', marginBottom: '10px', border: '0.5px solid rgba(201,168,76,0.12)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{ev[0]}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFDF7', marginBottom: '2px' }}>{ev[1]}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.5)' }}>{ev[2]}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.4)' }}>{ev[3]}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: '2rem', textAlign: 'center', background: styles.footerBg || '#0a0a1a' }}>
            <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: '32px', color: vis.accent, marginBottom: '1rem' }}>Kavya & Karthik</div>
            <Link href={`/editor?theme=${id}`} style={{ display: 'inline-block', background: vis.accent, color: '#2C1A0E', padding: '14px 32px', borderRadius: '100px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Use this theme ✦</Link>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/themes" style={{ fontSize: '13px', color: 'rgba(255,253,247,0.4)', textDecoration: 'none' }}>← Browse all themes</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
