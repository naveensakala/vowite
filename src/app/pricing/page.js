import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { supabase } from '@/lib/supabase'

export const metadata = { title: 'Pricing — Vowite' }

async function getBasePrice() {
  const { data } = await supabase.from('themes').select('price').eq('id', 'sindoor').single()
  return data?.price || 1999
}

export default async function PricingPage() {
  const base = await getBasePrice()

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '0.75rem', textAlign: 'center' }}>Pricing</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 500, textAlign: 'center', color: 'var(--espresso)', marginBottom: '0.75rem' }}>One-time. No <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>subscriptions.</em></h1>
          <p style={{ textAlign: 'center', color: 'var(--espresso-mid)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 3.5rem', fontWeight: 300 }}>Pay once, your invite stays live for a full year.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto 4rem' }}>
            {[
              { name: 'Self-serve', price: base, desc: 'You edit it yourself using our live editor.', features: ['All invite features','Live editor access','Hosted for 1 year','Shareable WhatsApp link','Photo gallery + music'], featured: false },
              { name: 'Self-serve + RSVP', price: base + 999, desc: 'Everything plus guest RSVP tracking.', features: ['Everything in Self-serve','Guest RSVP form','Couple dashboard','Headcount per event','Pre-wedding video embed'], featured: true },
              { name: 'Done for you', price: 4999, desc: 'We build your invite for you.', features: ['Everything included','We design it for you','2 revision rounds','Priority support','RSVP dashboard included'], featured: false },
            ].map(plan => (
              <div key={plan.name} style={{ background: 'white', border: plan.featured ? '2px solid var(--gold)' : '0.5px solid rgba(201,168,76,0.2)', borderRadius: '20px', padding: '2rem' }}>
                {plan.featured && <div style={{ display: 'inline-block', background: 'var(--gold)', color: 'white', fontSize: '11px', padding: '3px 10px', borderRadius: '100px', fontWeight: 500, marginBottom: '0.75rem' }}>Most popular</div>}
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 500, marginBottom: '4px' }}>{plan.name}</div>
                <div style={{ fontSize: '36px', fontWeight: 500, margin: '0.75rem 0 0.25rem' }}>₹{plan.price.toLocaleString('en-IN')} <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--espresso-mid)' }}>one-time</span></div>
                <div style={{ fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '1.5rem', fontWeight: 300 }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                  {plan.features.map(f => <li key={f} style={{ fontSize: '13px', color: 'var(--espresso-mid)', padding: '5px 0', borderBottom: '0.5px solid rgba(201,168,76,0.1)', display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: 'var(--gold-dark)', fontSize: '10px' }}>✓</span>{f}</li>)}
                </ul>
                {plan.name === 'Done for you'
                  ? <Link href="/contact" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, border: '0.5px solid rgba(44,26,14,0.25)', textDecoration: 'none', color: 'var(--espresso)' }}>Contact us</Link>
                  : <Link href="/themes" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, background: plan.featured ? 'var(--espresso)' : 'transparent', color: plan.featured ? 'var(--ivory)' : 'var(--espresso)', border: plan.featured ? 'none' : '0.5px solid rgba(44,26,14,0.25)', textDecoration: 'none' }}>Get started</Link>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
