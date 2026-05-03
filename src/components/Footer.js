import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      background: 'var(--espresso)',
      borderTop: '0.5px solid rgba(201,168,76,0.15)',
      padding: '2.5rem 2rem', textAlign: 'center'
    }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <Image src="/images/logo-white.png" alt="Vowite" height={40} width={130} style={{ height: '40px', width: 'auto', opacity: 0.9 }} />
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.35)', marginBottom: '1.5rem', letterSpacing: '0.06em' }}>MAKE IT MEMORABLE</div>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[['/#themes','Themes'],['/pricing','Pricing'],['/contact','Done for you'],['/about','About'],['/privacy','Privacy'],['/terms','Terms']].map(([href, label]) => (
          <Link key={href} href={href} style={{ fontSize: '13px', color: 'rgba(255,253,247,0.45)', textDecoration: 'none' }}>{label}</Link>
        ))}
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(255,253,247,0.2)' }}>© {year} Vowite. Made with love in India.</div>
    </footer>
  )
}
