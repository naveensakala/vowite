import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: 'var(--ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--gold:#C9A84C;--gold-dark:#9C7A2E;--ivory:#FFFDF7;--espresso:#2C1A0E;--espresso-mid:#5C3D22;}
        @keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:0.7}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
      `}</style>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(80px,15vw,160px)', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, marginBottom: '1rem', fontStyle: 'italic' }}>404</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,4vw,40px)', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.75rem' }}>This page seems to have <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>eloped.</em></h1>
        <p style={{ fontSize: '16px', color: 'var(--espresso-mid)', marginBottom: '2rem', fontWeight: 300 }}>The page you're looking for doesn't exist — but your perfect wedding invite does.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: 'var(--espresso)', color: 'var(--ivory)', padding: '14px 32px', borderRadius: '100px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Back to home ✦</Link>
          <Link href="/themes" style={{ background: 'transparent', color: 'var(--espresso)', padding: '14px 32px', borderRadius: '100px', fontSize: '15px', fontWeight: 400, textDecoration: 'none', border: '0.5px solid rgba(44,26,14,0.25)' }}>Browse themes</Link>
        </div>
      </div>
    </div>
  )
}
