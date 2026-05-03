import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = { title: 'About — Vowite' }

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
        {/* Content migrated from about.html — see README */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our story</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 500, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Made for <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Indian love stories</em></h1>
          <p style={{ fontSize: '16px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>Vowite was born from a simple observation — the most beautiful day of your life deserves more than a blurry PDF shared on WhatsApp. We built Vowite to give every Indian couple a wedding invite that truly reflects the beauty of their union.</p>
          <p style={{ fontSize: '16px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300 }}>From the first moment a guest taps your link to the final RSVP confirmation — every detail is crafted to make your invite unforgettable.</p>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
