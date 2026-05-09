import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 3600

const THEME_VISUALS = {
  sindoor: { bg: 'linear-gradient(135deg,#8B1A1A,#C9422A,#E8A020)' },
  maangalyam: { bg: 'linear-gradient(135deg,#1A3A2A,#2D6A4F,#C9A84C)' },
  midnight: { bg: 'linear-gradient(135deg,#1A1A2E,#16213E,#C9A84C)' },
  gulabi: { bg: 'linear-gradient(135deg,#3D0C11,#8B1A4A,#F2C4CE)' },
  keerthana: { img: '/images/temple1.jpg' },
}

const FALLBACK_THEMES = [
  { id: 'sindoor',    name: 'Sindoor',        category: 'North Indian Hindu', price: 999,  tag: 'Classic'  },
  { id: 'maangalyam',name: 'Maangalyam',      category: 'South Indian',       price: 999,  tag: 'Classic'  },
  { id: 'midnight',  name: 'Midnight Gold',   category: 'Modern Luxury',      price: 1499, tag: 'Special'  },
  { id: 'gulabi',    name: 'Gulabi',           category: 'North Indian Hindu', price: 999,  tag: 'Classic'  },
  { id: 'keerthana', name: 'Keerthana',        category: 'South Indian',       price: 2499, tag: 'Premium'  },
]

async function getThemes() {
  try {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
    )
    const { data } = await client.from('themes').select('*').eq('is_active', true).order('sort_order')
    return (data && data.length > 0) ? data : FALLBACK_THEMES
  } catch {
    return FALLBACK_THEMES
  }
}

export default async function ThemesPage() {
  const themes = await getThemes()

  return (
    <>
      <div style={{ minHeight: '100vh', background: 'var(--ivory-dark)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Choose your style</p>
          <h1 className="section-title">Themes for every <em>tradition</em></h1>
          <p className="section-sub">Crafted with love for Hindu and South Indian weddings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
            {themes.map(theme => {
              const vis = THEME_VISUALS[theme.id] || { bg: 'linear-gradient(135deg,#2C1A0E,#5C3D22)' }
              return (
                <Link key={theme.id} href={`/themes/${theme.id}`} style={{ borderRadius: '16px', overflow: 'hidden', border: '0.5px solid rgba(201,168,76,0.2)', cursor: 'pointer', background: 'white', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>
                  <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: vis.bg }}>
                    {vis.img && <Image src={vis.img} alt={theme.name} fill style={{ objectFit: 'cover' }} />}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,0.6))', padding: '20px 16px 12px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', color: 'white', fontWeight: 500 }}>{theme.name}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{theme.category}</div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--espresso)' }}>From ₹{(theme.price || 0).toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '11px', background: 'rgba(201,168,76,0.12)', color: 'var(--gold-dark)', padding: '2px 10px', borderRadius: '100px', border: '0.5px solid rgba(201,168,76,0.25)' }}>{theme.tag}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
