'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { supabase } from '@/lib/supabase'

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [prices, setPrices] = useState({ sindoor: 999, midnight: 1499, keerthana: 2499 })

  useEffect(() => {
    supabase.from('themes').select('id,price').then(({ data }) => {
      if (data) {
        const p = {}
        data.forEach(t => p[t.id] = t.price)
        setPrices(p)
      }
    })
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
  }, [])

  const base = prices.sindoor || 999
  const rsvp = 999

  const plans = [
    { name: 'Self-serve', price: `From ₹${base.toLocaleString('en-IN')}`, period: 'one-time', desc: 'Pick a theme and build it yourself using our live editor.', features: [['All invite features', true], ['Live editor access', true], ['Hosted for 1 year', true], ['Shareable WhatsApp link', true], ['Photo gallery + music', true], ['RSVP dashboard', false], ['Done-for-you build', false]], btn: 'Browse themes', href: '/#themes', style: 'outline' },
    { name: 'Self-serve + RSVP', price: `From ₹${(base + rsvp).toLocaleString('en-IN')}`, period: 'one-time', desc: 'Everything in Self-serve plus live guest RSVP tracking.', features: [['All invite features', true], ['Live editor access', true], ['Hosted for 1 year', true], ['Shareable WhatsApp link', true], ['Photo gallery + music', true], ['RSVP dashboard', true], ['Done-for-you build', false]], btn: 'Browse themes', href: '/#themes', style: 'dark', featured: true },
    { name: 'Done for you', price: '₹1,499 extra', period: 'any theme', desc: 'Pick a theme, fill our form — we build your invite in 48 hours.', features: [['All invite features', true], ['We build it for you', true], ['Hosted for 1 year', true], ['Shareable WhatsApp link', true], ['Photo gallery + music', true], ['2 rounds of changes', true], ['Done-for-you build', true]], btn: 'Get in touch', href: '/contact', style: 'outline' },
    { name: 'Bespoke', price: '₹14,999', period: 'by consultation', desc: 'A completely custom invite built exclusively for you. Not available publicly.', features: [['Private custom theme', true], ['Consultation call', true], ['Built around your taste', true], ['RSVP dashboard included', true], ['Changes till satisfied', true], ['Priority support', true], ['Done-for-you build', true]], btn: 'Apply now', href: '/contact', style: 'gold', special: true },
  ]

  const faqs = [
    ['Is this a one-time payment or subscription?', 'Completely one-time. You pay once and your invite stays live for a full year. No monthly fees, no surprises.'],
    ['Can I edit my invite after publishing?', 'Yes! For Self-serve plans, you can log in and edit your invite anytime within the year. Venue changed? Timing updated? No problem.'],
    ['What payment methods are accepted?', 'We accept all major payment methods via Razorpay — UPI, credit/debit cards, net banking, and wallets like PhonePe and Google Pay.'],
    ['Can I upgrade from Self-serve to Done-for-you?', 'Yes! If you start with Self-serve and want us to take over, just contact us and we\'ll top up the difference.'],
    ['What happens after 1 year?', 'Your invite will go offline after 1 year. You can renew hosting for another year at a small fee. Most couples don\'t need it beyond 6 months!'],
    ['Is there a refund policy?', 'For Self-serve plans, refunds are available within 24 hours of purchase if the invite hasn\'t been published. For Done-for-you, refunds are available before we start building.'],
  ]

  return (
    <>
      <Navbar />
      <style>{`
        .fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease;}
        .fade-up.visible{opacity:1;transform:translateY(0);}
        .price-card:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(201,168,76,0.1);}
        .price-card{transition:all 0.2s;}
        .faq-q:hover{color:var(--gold-dark)!important;}
        :root{--gold:#C9A84C;--gold-dark:#9C7A2E;--ivory:#FFFDF7;--ivory-dark:#F5EDD8;--espresso:#2C1A0E;--espresso-mid:#5C3D22;}
        @media(max-width:768px){.pricing-grid{grid-template-columns:1fr!important}.compare-wrap{overflow-x:auto}}
      `}</style>

      {/* HERO */}
      <section style={{minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'8rem 2rem 3rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(242,196,206,0.2) 0%,transparent 70%)',pointerEvents:'none'}}></div>
        <div className="fade-up" style={{position:'relative',maxWidth:'640px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(201,168,76,0.1)',border:'0.5px solid rgba(201,168,76,0.3)',borderRadius:'100px',padding:'5px 14px',fontSize:'12px',color:'var(--gold-dark)',fontWeight:500,marginBottom:'1.5rem',letterSpacing:'0.04em'}}>✦ Simple pricing</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(38px,6vw,68px)',fontWeight:500,lineHeight:1.05,color:'var(--espresso)',marginBottom:'1rem'}}>One-time. No <em style={{fontStyle:'italic',color:'var(--gold)'}}>subscriptions.</em></h1>
          <p style={{fontSize:'16px',color:'var(--espresso-mid)',lineHeight:1.7,maxWidth:'460px',margin:'0 auto',fontWeight:300}}>Pay once, your invite stays live for a full year. No recurring charges, ever.</p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section style={{padding:'2.5rem 2rem 4rem',maxWidth:'1100px',margin:'0 auto'}}>
        <div className="pricing-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px'}}>
          {plans.map(plan => (
            <div key={plan.name} className="price-card fade-up" style={{background: plan.special ? 'linear-gradient(135deg,#2C1A0E,#5C3D22)' : 'white', border: plan.featured ? '2px solid var(--gold)' : plan.special ? 'none' : '0.5px solid rgba(201,168,76,0.2)', borderRadius:'20px', padding:'2rem', paddingTop:'3rem', position:'relative', display:'flex', flexDirection:'column'}}>
              {plan.featured && <div style={{position:'absolute',top:'1.25rem',left:'2rem',background:'var(--gold)',color:'white',fontSize:'11px',padding:'3px 10px',borderRadius:'100px',fontWeight:500,width:'fit-content'}}>Most popular</div>}
              {plan.special && <div style={{position:'absolute',top:'1.25rem',left:'2rem',background:'rgba(201,168,76,0.2)',color:'var(--gold)',fontSize:'11px',padding:'3px 10px',borderRadius:'100px',fontWeight:500,border:'0.5px solid rgba(201,168,76,0.3)',width:'fit-content'}}>✦ Exclusive</div>}
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'22px',fontWeight:500,color: plan.special ? 'var(--ivory)' : 'var(--espresso)',marginBottom:'4px'}}>{plan.name}</div>
              <div style={{fontSize:'28px',fontWeight:500,margin:'0.75rem 0 0.25rem',color: plan.special ? 'var(--gold)' : 'var(--espresso)'}}>{plan.price}</div>
              <div style={{fontSize:'13px',color: plan.special ? 'rgba(255,253,247,0.4)' : 'var(--espresso-mid)',marginBottom:'1rem'}}>{plan.period}</div>
              <div style={{fontSize:'13px',color: plan.special ? 'rgba(255,253,247,0.6)' : 'var(--espresso-mid)',marginBottom:'1.5rem',lineHeight:1.6,fontWeight:300}}>{plan.desc}</div>
              <div style={{height:'0.5px',background: plan.special ? 'rgba(255,255,255,0.08)' : 'rgba(201,168,76,0.2)',marginBottom:'1.25rem'}}></div>
              <ul style={{listStyle:'none',marginBottom:'1.5rem',flex:1}}>
                {plan.features.map(([feat, included]) => (
                  <li key={feat} style={{fontSize:'13px',color: plan.special ? (included ? 'rgba(255,253,247,0.7)' : 'rgba(255,253,247,0.2)') : (included ? 'var(--espresso-mid)' : 'rgba(92,61,34,0.3)'),padding:'6px 0',display:'flex',alignItems:'center',gap:'10px',borderBottom: plan.special ? '0.5px solid rgba(255,255,255,0.05)' : '0.5px solid rgba(201,168,76,0.08)'}}>
                    <div style={{width:'17px',height:'17px',borderRadius:'50%',background: included ? 'rgba(201,168,76,0.15)' : 'rgba(92,61,34,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',color: included ? 'var(--gold-dark)' : 'rgba(92,61,34,0.3)',flexShrink:0}}>
                      {included ? '✓' : '×'}
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} style={{display:'block',textAlign:'center',padding:'12px',borderRadius:'100px',fontSize:'14px',fontWeight:500,background: plan.style === 'dark' ? 'var(--espresso)' : plan.style === 'gold' ? 'var(--gold)' : 'transparent',color: plan.style === 'dark' ? 'var(--ivory)' : plan.style === 'gold' ? 'var(--espresso)' : plan.special ? 'rgba(255,253,247,0.6)' : 'var(--espresso)',border: plan.style === 'outline' ? (plan.special ? '0.5px solid rgba(255,255,255,0.2)' : '0.5px solid rgba(44,26,14,0.2)') : 'none',textDecoration:'none'}}>{plan.btn}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{padding:'4rem 2rem',background:'var(--ivory-dark)'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>Compare plans</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>What's <em style={{fontStyle:'italic',color:'var(--gold)'}}>included</em></h2>
        <div className="compare-wrap" style={{maxWidth:'900px',margin:'0 auto',overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',background:'white',borderRadius:'16px',overflow:'hidden',border:'0.5px solid rgba(201,168,76,0.2)'}}>
            <thead>
              <tr>
                <th style={{padding:'1rem',textAlign:'left',paddingLeft:'1.5rem',fontSize:'13px',fontWeight:500,color:'var(--espresso)',background:'white',borderBottom:'0.5px solid rgba(201,168,76,0.2)'}}>Feature</th>
                {['Self-serve','+ RSVP','Done for you','Bespoke'].map((h,i) => (
                  <th key={h} style={{padding:'1rem',textAlign:'center',fontSize:'13px',fontWeight:500,color:'var(--espresso)',background: i===1 ? 'rgba(201,168,76,0.06)' : 'white',borderBottom:'0.5px solid rgba(201,168,76,0.2)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[['Interactive invite','✓','✓','✓','✓'],['Live countdown','✓','✓','✓','✓'],['Photo gallery','✓','✓','✓','✓'],['Background music','✓','✓','✓','✓'],['Venue maps','✓','✓','✓','✓'],['RSVP form','—','✓','—','✓'],['RSVP dashboard','—','✓','—','✓'],['We build it','—','—','✓','✓'],['Custom theme','—','—','—','✓'],['Delivery time','Instant','Instant','48 hrs','5-7 days'],['Hosted for','1 year','1 year','1 year','1 year']].map(([feat,...vals]) => (
                <tr key={feat} style={{}}>
                  <td style={{padding:'0.85rem 1.5rem',fontSize:'13px',color:'var(--espresso)',borderBottom:'0.5px solid rgba(201,168,76,0.08)'}}>{feat}</td>
                  {vals.map((v,i) => (
                    <td key={i} style={{padding:'0.85rem 1rem',textAlign:'center',fontSize:'13px',color: v==='✓' ? 'var(--gold-dark)' : v==='—' ? 'rgba(92,61,34,0.25)' : 'var(--espresso-mid)',fontWeight: v==='✓' ? 500 : 400,background: i===1 ? 'rgba(201,168,76,0.04)' : 'transparent',borderBottom:'0.5px solid rgba(201,168,76,0.08)'}}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TRUST NUMBERS */}
      <section style={{background:'var(--espresso)',padding:'3rem 2rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'20px',maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          {[['200+','Couples who chose Vowite'],['5','Stunning themes to choose from'],['48h','Done-for-you delivery time'],['1yr','Your invite stays live']].map(([val,lbl]) => (
            <div key={lbl} className="fade-up">
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'42px',fontWeight:500,color:'var(--gold)',lineHeight:1}}>{val}</div>
              <div style={{fontSize:'12px',color:'rgba(255,253,247,0.45)',marginTop:'4px',lineHeight:1.4}}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'4rem 2rem'}}>
        <div style={{maxWidth:'680px',margin:'0 auto'}}>
          <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>FAQ</p>
          <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>Common <em style={{fontStyle:'italic',color:'var(--gold)'}}>questions</em></h2>
          {faqs.map(([q, a], i) => (
            <div key={i} className="fade-up" style={{background:'white',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'14px',marginBottom:'10px',overflow:'hidden'}}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{padding:'1rem 1.25rem',fontSize:'14px',fontWeight:500,color:'var(--espresso)',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {q}
                <span style={{fontSize:'16px',color:'var(--gold)',transition:'transform 0.2s',transform: openFaq === i ? 'rotate(45deg)' : 'none',display:'inline-block'}}>+</span>
              </div>
              {openFaq === i && (
                <div style={{padding:'0 1.25rem 1rem'}}>
                  <p style={{fontSize:'13px',color:'var(--espresso-mid)',lineHeight:1.7,fontWeight:300}}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'4rem 2rem'}}>
        <div className="fade-up" style={{background:'linear-gradient(135deg,var(--espresso),#5C3D22)',borderRadius:'24px',padding:'3.5rem 2rem',textAlign:'center',maxWidth:'900px',margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(26px,4vw,44px)',color:'var(--ivory)',fontWeight:500,marginBottom:'0.75rem'}}>Your invite. Your story. <em style={{color:'var(--gold)',fontStyle:'italic'}}>Unforgettable.</em></h2>
          <p style={{color:'rgba(255,253,247,0.5)',fontSize:'15px',marginBottom:'2rem',fontWeight:300}}>Join hundreds of couples who made their wedding invite a moment guests remember.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/#themes" style={{background:'var(--gold)',color:'var(--espresso)',padding:'13px 32px',borderRadius:'100px',fontSize:'14px',fontWeight:500,textDecoration:'none'}}>Browse themes ✦</Link>
            <Link href="/contact" style={{background:'transparent',color:'rgba(255,253,247,0.6)',padding:'13px 32px',borderRadius:'100px',fontSize:'14px',textDecoration:'none',border:'0.5px solid rgba(255,253,247,0.2)'}}>Done for you →</Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}