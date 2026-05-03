'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ContactPage() {
  const [form, setForm] = useState({ name1: '', name2: '', email: '', phone: '', date: '', city: '', theme: '', package: '', events: '', special: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!form.name1 || !form.email || !form.phone) { setStatus({ type: 'error', text: 'Please fill in name, email and WhatsApp number' }); return }
    setLoading(true)
    const res = await fetch('https://formspree.io/f/xykozdzq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ 'Partner 1': form.name1, 'Partner 2': form.name2, Email: form.email, WhatsApp: form.phone, 'Wedding Date': form.date, City: form.city, Theme: form.theme, Package: form.package, Events: form.events, 'Special Requests': form.special })
    })
    setLoading(false)
    if (res.ok) setStatus({ type: 'success', text: 'Thank you! We\'ll be in touch within 24 hours.' })
    else setStatus({ type: 'error', text: 'Something went wrong. Please try again.' })
  }

  const inputStyle = { width: '100%', padding: '12px 16px', border: '0.5px solid rgba(201,168,76,0.25)', borderRadius: '12px', fontSize: '14px', fontFamily: "'DM Sans',sans-serif", color: 'var(--espresso)', background: 'var(--ivory)', outline: 'none' }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '0.75rem', textAlign: 'center' }}>Done for you</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 500, textAlign: 'center', marginBottom: '0.75rem' }}>We'll build your <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>invite</em> for you</h1>
          <p style={{ textAlign: 'center', color: 'var(--espresso-mid)', fontSize: '15px', marginBottom: '3rem', fontWeight: 300 }}>Share your details and we'll create your perfect wedding invite within 48 hours.</p>

          {status?.type === 'success' ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '24px', border: '0.5px solid rgba(201,168,76,0.2)' }}>
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', marginBottom: '0.5rem' }}>Enquiry received!</h2>
              <p style={{ color: 'var(--espresso-mid)', fontWeight: 300 }}>{status.text}</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '0.5px solid rgba(201,168,76,0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Partner 1 name *</label><input value={form.name1} onChange={e => setForm({...form, name1: e.target.value})} placeholder="Priya" style={inputStyle} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Partner 2 name</label><input value={form.name2} onChange={e => setForm({...form, name2: e.target.value})} placeholder="Arjun" style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Email *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com" style={inputStyle} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>WhatsApp number *</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Wedding date</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={inputStyle} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>City</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Chennai" style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Theme preference</label>
                  <select value={form.theme} onChange={e => setForm({...form, theme: e.target.value})} style={inputStyle}>
                    <option value="">Select a theme</option>
                    {['Sindoor','Maangalyam','Midnight Gold','Gulabi','Keerthana','Surprise me'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Package</label>
                  <select value={form.package} onChange={e => setForm({...form, package: e.target.value})} style={inputStyle}>
                    <option value="">Select package</option>
                    <option>Standard — ₹4,999</option>
                    <option>Rush (48hr) — ₹6,999</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Events (Haldi, Sangeet, Wedding, Reception...)</label><input value={form.events} onChange={e => setForm({...form, events: e.target.value})} placeholder="List your events with dates and venues" style={inputStyle} /></div>
              <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', fontSize: '12px', color: 'var(--espresso-mid)', marginBottom: '5px' }}>Special requests</label><textarea value={form.special} onChange={e => setForm({...form, special: e.target.value})} rows={3} placeholder="Any special requirements..." style={{...inputStyle, resize: 'vertical'}} /></div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'var(--espresso)', color: 'var(--ivory)', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans',sans-serif", opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Sending...' : 'Submit enquiry ✦'}
              </button>
              {status?.type === 'error' && <div style={{ marginTop: '1rem', padding: '10px', borderRadius: '10px', fontSize: '13px', background: 'rgba(220,53,53,0.08)', color: '#c0392b', textAlign: 'center' }}>{status.text}</div>}
            </form>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
