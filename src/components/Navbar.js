'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', background: 'rgba(255,253,247,0.92)',
        backdropFilter: 'blur(8px)', borderBottom: '0.5px solid rgba(201,168,76,0.2)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.png" alt="Vowite" height={36} width={120} style={{ height: '36px', width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links-desktop">
          <Link href="/#themes" style={{ fontSize: '14px', color: 'var(--espresso-mid)', textDecoration: 'none', fontWeight: 400 }}>Themes</Link>
          <Link href="/pricing" style={{ fontSize: '14px', color: 'var(--espresso-mid)', textDecoration: 'none', fontWeight: 400 }}>Pricing</Link>
          <Link href="/contact" style={{ fontSize: '14px', color: 'var(--espresso-mid)', textDecoration: 'none', fontWeight: 400 }}>Done for you</Link>
          <Link href="/about" style={{ fontSize: '14px', color: 'var(--espresso-mid)', textDecoration: 'none', fontWeight: 400 }}>About</Link>
          <Link href="/#themes" style={{
            background: 'var(--espresso)', color: 'var(--ivory)',
            padding: '8px 20px', borderRadius: '100px',
            fontSize: '13px', fontWeight: 500, textDecoration: 'none'
          }}>Get started</Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }}
          className="hamburger-btn"
          aria-label="Menu"
        >
          <span style={{ width: '22px', height: '1.5px', background: 'var(--espresso)', borderRadius: '2px', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}></span>
          <span style={{ width: '22px', height: '1.5px', background: 'var(--espresso)', borderRadius: '2px', display: 'block', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ width: '22px', height: '1.5px', background: 'var(--espresso)', borderRadius: '2px', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '54px', left: 0, right: 0,
          background: 'rgba(255,253,247,0.98)', backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid rgba(201,168,76,0.2)',
          padding: '1rem 2rem', display: 'flex', flexDirection: 'column',
          gap: 0, zIndex: 99
        }}>
          {[['/#themes','Themes'],['/pricing','Pricing'],['/contact','Done for you'],['/about','About']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              fontSize: '15px', color: 'var(--espresso-mid)', textDecoration: 'none',
              padding: '12px 0', borderBottom: '0.5px solid rgba(201,168,76,0.1)'
            }}>{label}</Link>
          ))}
          <Link href="/#themes" onClick={() => setMenuOpen(false)} style={{
            background: 'var(--espresso)', color: 'var(--ivory)',
            padding: '12px 20px', borderRadius: '100px', textAlign: 'center',
            marginTop: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '14px'
          }}>Get started ✦</Link>
        </div>
      )}

      <style>{`
        @media(max-width:768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
