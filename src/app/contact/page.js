'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name1:'',name2:'',email:'',phone:'',date:'',city:'',theme:'',package:'',events:'',special:'' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    setTimeout(() => {
          document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
        }, 100)
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!form.name1 || !form.email || !form.phone) { setStatus({ type:'error', text:'Please fill in your name, email and WhatsApp number.' }); return }
    setLoading(true)
    const res = await fetch('https://formspree.io/f/xykozdzq', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', Accept:'application/json' },
      body: JSON.stringify({ 'Partner 1':form.name1,'Partner 2':form.name2,'Email':form.email,'WhatsApp':form.phone,'Wedding Date':form.date,'City':form.city,'Theme':form.theme,'Package':form.package,'Events':form.events,'Special Requests':form.special })
    })
    setLoading(false)
    if (res.ok) setStatus({ type:'success' })
    else setStatus({ type:'error', text:'Something went wrong. Please try again or WhatsApp us directly.' })
  }

  const inputStyle = { width:'100%', background:'rgba(255,253,247,0.06)', border:'0.5px solid rgba(201,168,76,0.2)', borderRadius:'10px', padding:'11px 14px', fontSize:'13px', color:'var(--ivory)', fontFamily:"'DM Sans',sans-serif", outline:'none' }
  const labelStyle = { fontSize:'11px', fontWeight:500, color:'rgba(255,253,247,0.5)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'6px', display:'block' }

  const faqs = [
    ['How long does it take?','Standard package: 48 hours from when we receive all your details. Rush package: within 24 hours. We\'ll confirm via WhatsApp once we start.'],
    ['When do I pay?','You pay only after you see the preview and are happy with it. We\'ll send a Razorpay payment link before publishing your invite.'],
    ['What if I want changes?','Standard includes 2 revision rounds, Rush includes 3. We want you to be completely happy before publishing.'],
    ['Can I provide my own photos and music?','Absolutely! Share your pre-wedding photos and your favourite song via WhatsApp after submitting the form. We\'ll include everything.'],
    ['How long is the invite hosted?','Your invite stays live for 1 full year from the date of publishing. After that, you can renew hosting at a small fee.'],
    ['Can guests outside India open the invite?','Yes! Your Vowite link works everywhere in the world. Perfect for guests in the US, UK, UAE, Singapore and beyond.'],
  ]

  return (
    <>
      <style>{`
        .fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease;}
        .fade-up.visible{opacity:1;transform:translateY(0);}
        .step-card:hover{border-color:rgba(201,168,76,0.4)!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,0.08);}
        .step-card{transition:all 0.2s;}
        input:focus,select:focus,textarea:focus{border-color:rgba(201,168,76,0.5)!important;background:rgba(201,168,76,0.06)!important;}
        :root{--gold:#C9A84C;--gold-dark:#9C7A2E;--ivory:#FFFDF7;--ivory-dark:#F5EDD8;--espresso:#2C1A0E;--espresso-mid:#5C3D22;}
        @media(max-width:768px){.form-row{grid-template-columns:1fr!important}.inc-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* HERO */}
      <section style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'8rem 2rem 4rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(242,196,206,0.2) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(201,168,76,0.1) 0%,transparent 60%)',pointerEvents:'none'}}></div>
        <div className="fade-up" style={{position:'relative',maxWidth:'680px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(201,168,76,0.1)',border:'0.5px solid rgba(201,168,76,0.3)',borderRadius:'100px',padding:'5px 14px',fontSize:'12px',color:'var(--gold-dark)',fontWeight:500,marginBottom:'1.5rem',letterSpacing:'0.04em'}}>✦ Done for you</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(40px,7vw,72px)',fontWeight:500,lineHeight:1.05,color:'var(--espresso)',marginBottom:'1rem'}}>We'll build your <em style={{fontStyle:'italic',color:'var(--gold)'}}>invite</em> for you</h1>
          <p style={{fontSize:'17px',color:'var(--espresso-mid)',lineHeight:1.7,maxWidth:'500px',margin:'0 auto 2rem',fontWeight:300}}>Tell us about your wedding. We'll create a stunning invite within 48 hours — you just review and share.</p>
          <Link href="#form" style={{background:'var(--espresso)',color:'var(--ivory)',padding:'13px 32px',borderRadius:'100px',fontSize:'14px',fontWeight:500,textDecoration:'none',display:'inline-block'}}>Start your invite ✦</Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:'4rem 2rem',maxWidth:'900px',margin:'0 auto'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>How it works</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>Simple as <em style={{fontStyle:'italic',color:'var(--gold)'}}>sending a message</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px'}}>
          {[['1','Fill the form','Tell us your names, dates, venue and theme preference. Takes 3 minutes.'],['2','We build it','Our team creates your invite within 48 hours. You\'ll get a WhatsApp preview.'],['3','You review','Love it? Pay and publish. Want changes? We\'ll refine it — up to 2 rounds.'],['4','Share & celebrate','Your invite goes live on a beautiful link. Share it on WhatsApp and watch the Woahs come in.']].map(([num,title,desc]) => (
            <div key={num} className="step-card fade-up" style={{background:'white',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'16px',padding:'1.5rem',textAlign:'center'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'rgba(201,168,76,0.1)',border:'0.5px solid rgba(201,168,76,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:'20px',color:'var(--gold-dark)',margin:'0 auto 1rem',fontWeight:600}}>{num}</div>
              <div style={{fontSize:'14px',fontWeight:500,color:'var(--espresso)',marginBottom:'6px'}}>{title}</div>
              <div style={{fontSize:'12px',color:'var(--espresso-mid)',lineHeight:1.6,fontWeight:300}}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{background:'var(--ivory-dark)',padding:'4rem 2rem'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>What's included</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>Everything you <em style={{fontStyle:'italic',color:'var(--gold)'}}>need</em></h2>
        <div className="inc-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'14px',maxWidth:'900px',margin:'0 auto'}}>
          {[['✨','Stunning design','We choose the best layout, colours and typography for your theme.'],['📸','Your photos','Share your pre-wedding shoot — we add them to a beautiful gallery.'],['🎵','Your music','Send us your song — we embed it as background music.'],['📍','All your events','Haldi, Sangeet, Wedding, Reception — all mapped with venue details.'],['⏳','Live countdown','Ticking down to your big day for every guest who opens it.'],['💌','RSVP (optional)','Add our RSVP feature for ₹999 extra — track who\'s coming.']].map(([icon,title,desc]) => (
            <div key={title} className="fade-up" style={{background:'white',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'14px',padding:'1.25rem',display:'flex',gap:'12px',alignItems:'flex-start'}}>
              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'rgba(201,168,76,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'17px',flexShrink:0}}>{icon}</div>
              <div>
                <div style={{fontSize:'13px',fontWeight:500,color:'var(--espresso)',marginBottom:'3px'}}>{title}</div>
                <div style={{fontSize:'12px',color:'var(--espresso-mid)',lineHeight:1.5,fontWeight:300}}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:'4rem 2rem',maxWidth:'900px',margin:'0 auto'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>Packages</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>Choose your <em style={{fontStyle:'italic',color:'var(--gold)'}}>package</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px'}}>
          {[{ name:'Done for you', price:'₹1,499', period:'extra on any theme', desc:'Pick a theme, fill our form — we build your invite in 48 hours.', features:['You choose the theme','Fill a simple details form','We build it in 48 hours','2 rounds of changes','We publish & hand over'], featured:false },
            { name:'Bespoke', price:'₹14,999', period:'by consultation', desc:'A completely custom invite. Not available publicly — for selected clients only.', features:['Private custom theme','Consultation call included','Built around your taste','RSVP dashboard included','Changes till you\'re satisfied'], featured:true }].map(plan => (
            <div key={plan.name} className="fade-up" style={{background: plan.featured ? 'linear-gradient(135deg,#2C1A0E,#5C3D22)' : 'white', border: plan.featured ? 'none' : '0.5px solid rgba(201,168,76,0.2)', borderRadius:'20px', padding:'2rem', display:'flex', flexDirection:'column'}}>
              {plan.featured && <div style={{display:'inline-block',width:'fit-content',background:'rgba(201,168,76,0.2)',color:'var(--gold)',fontSize:'11px',padding:'3px 10px',borderRadius:'100px',fontWeight:500,border:'0.5px solid rgba(201,168,76,0.3)',marginBottom:'0.75rem'}}>✦ Exclusive</div>}
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'22px',fontWeight:500,color: plan.featured ? 'var(--ivory)' : 'var(--espresso)',marginBottom:'4px'}}>{plan.name}</div>
              <div style={{fontSize:'34px',fontWeight:500,color: plan.featured ? 'var(--gold)' : 'var(--espresso)',margin:'0.75rem 0 0.25rem'}}>{plan.price}</div>
              <div style={{fontSize:'13px',color: plan.featured ? 'rgba(255,253,247,0.4)' : 'var(--espresso-mid)',marginBottom:'1rem'}}>{plan.period}</div>
              <div style={{fontSize:'13px',color: plan.featured ? 'rgba(255,253,247,0.6)' : 'var(--espresso-mid)',marginBottom:'1.5rem',lineHeight:1.6,fontWeight:300,flex:1}}>{plan.desc}</div>
              <ul style={{listStyle:'none',marginBottom:'1.5rem'}}>
                {plan.features.map(f => <li key={f} style={{fontSize:'12px',color: plan.featured ? 'rgba(255,253,247,0.7)' : 'var(--espresso-mid)',padding:'5px 0',display:'flex',alignItems:'center',gap:'8px',borderBottom: plan.featured ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(201,168,76,0.1)'}}><div style={{width:'15px',height:'15px',borderRadius:'50%',background:'rgba(201,168,76,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8px',color:'var(--gold-dark)',flexShrink:0}}>✓</div>{f}</li>)}
              </ul>
              <Link href="#form" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:'100px',fontSize:'14px',fontWeight:500,background: plan.featured ? 'var(--gold)' : 'var(--espresso)',color: plan.featured ? 'var(--espresso)' : 'var(--ivory)',textDecoration:'none'}}>Get started ✦</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="form" style={{padding:'4rem 2rem',background:'var(--espresso)'}}>
        <div style={{maxWidth:'620px',margin:'0 auto'}}>
          <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>Start your invite</p>
          <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--ivory)',marginBottom:'2.5rem'}}>Tell us about your <em style={{fontStyle:'italic',color:'var(--gold)'}}>wedding</em></h2>
          {status?.type === 'success' ? (
            <div style={{textAlign:'center',padding:'3rem 2rem'}}>
              <div style={{fontSize:'48px',marginBottom:'1rem'}}>🎉</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'32px',color:'var(--ivory)',marginBottom:'0.75rem'}}>Enquiry received!</div>
              <div style={{fontSize:'14px',color:'rgba(255,253,247,0.5)',lineHeight:1.7,maxWidth:'360px',margin:'0 auto'}}>We'll reach out on WhatsApp within 2 hours to get started. Get ready for your Woah moment! 🎊</div>
            </div>
          ) : (
            <form onSubmit={submit} style={{background:'rgba(255,253,247,0.05)',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'20px',padding:'2.5rem'}}>
              <div className="form-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
                <div><label style={labelStyle}>Partner 1 name *</label><input value={form.name1} onChange={e=>setForm({...form,name1:e.target.value})} placeholder="Priya" style={inputStyle} /></div>
                <div><label style={labelStyle}>Partner 2 name</label><input value={form.name2} onChange={e=>setForm({...form,name2:e.target.value})} placeholder="Arjun" style={inputStyle} /></div>
              </div>
              <div className="form-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
                <div><label style={labelStyle}>Email *</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@email.com" style={inputStyle} /></div>
                <div><label style={labelStyle}>WhatsApp *</label><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" style={inputStyle} /></div>
              </div>
              <div className="form-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
                <div><label style={labelStyle}>Wedding date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={inputStyle} /></div>
                <div><label style={labelStyle}>City</label><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Chennai" style={inputStyle} /></div>
              </div>
              <div className="form-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
                <div><label style={labelStyle}>Theme preference</label>
                  <select value={form.theme} onChange={e=>setForm({...form,theme:e.target.value})} style={{...inputStyle,color:form.theme?'var(--ivory)':'rgba(255,253,247,0.2)'}}>
                    <option value="">Select a theme</option>
                    {['Sindoor (Classic)','Maangalyam (Classic)','Gulabi (Classic)','Midnight Gold (Special)','Keerthana (Premium)','Surprise me'].map(t=><option key={t} style={{background:'#2C1A0E'}}>{t}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Package</label>
                  <select value={form.package} onChange={e=>setForm({...form,package:e.target.value})} style={{...inputStyle,color:form.package?'var(--ivory)':'rgba(255,253,247,0.2)'}}>
                    <option value="">Select package</option>
                    <option style={{background:'#2C1A0E'}}>Done for you — ₹1,499 extra</option>
                    <option style={{background:'#2C1A0E'}}>Bespoke — ₹14,999</option>
                  </select>
                </div>
              </div>
              <div style={{marginBottom:'14px'}}><label style={labelStyle}>Events</label><input value={form.events} onChange={e=>setForm({...form,events:e.target.value})} placeholder="Haldi, Sangeet, Wedding, Reception — with dates and venues" style={inputStyle} /></div>
              <div style={{marginBottom:'20px'}}><label style={labelStyle}>Special requests</label><textarea value={form.special} onChange={e=>setForm({...form,special:e.target.value})} rows={3} placeholder="Any special requirements, preferences or questions..." style={{...inputStyle,resize:'vertical'}} /></div>
              {status?.type === 'error' && <div style={{padding:'10px',borderRadius:'10px',fontSize:'13px',background:'rgba(220,53,53,0.1)',color:'#ff6b6b',marginBottom:'14px',textAlign:'center'}}>{status.text}</div>}
              <button type="submit" disabled={loading} style={{width:'100%',background:'var(--gold)',color:'var(--espresso)',border:'none',borderRadius:'100px',padding:'14px',fontSize:'14px',fontWeight:500,cursor:loading?'not-allowed':'pointer',fontFamily:"'DM Sans',sans-serif",letterSpacing:'0.04em',opacity:loading?0.7:1}}>
                {loading ? 'Sending...' : 'Submit enquiry ✦'}
              </button>
              <p style={{textAlign:'center',fontSize:'12px',color:'rgba(255,253,247,0.3)',marginTop:'12px',lineHeight:1.6}}>We'll reach out on WhatsApp within 2 hours · No payment needed upfront</p>
            </form>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'4rem 2rem',maxWidth:'900px',margin:'0 auto'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>Love stories</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>What couples <em style={{fontStyle:'italic',color:'var(--gold)'}}>say</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px'}}>
          {[['SR','Sindhu & Rajan','Bengaluru · South Indian','"We had no time to figure out the editor. The team built our invite overnight and it was exactly what we imagined."'],['NK','Neha & Karthik','Mumbai · Marathi wedding','"Sent our details on Monday, got the preview on Tuesday, published on Wednesday. Guests were blown away."'],['PA','Priya & Arjun','Chennai · Hindu wedding','"The rush package was worth every rupee. Got it in under 24 hours, exactly as I imagined."']].map(([init,name,detail,quote]) => (
            <div key={name} className="fade-up" style={{background:'white',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'16px',padding:'1.5rem'}}>
              <div style={{color:'var(--gold)',fontSize:'11px',marginBottom:'0.75rem'}}>★★★★★</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'16px',color:'var(--espresso)',lineHeight:1.6,marginBottom:'1rem',fontStyle:'italic'}}>{quote}</div>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'34px',height:'34px',borderRadius:'50%',background:'rgba(201,168,76,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:500,color:'var(--gold-dark)'}}>{init}</div>
                <div>
                  <div style={{fontSize:'13px',fontWeight:500,color:'var(--espresso)'}}>{name}</div>
                  <div style={{fontSize:'11px',color:'var(--espresso-mid)'}}>{detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:'var(--ivory-dark)',padding:'4rem 2rem'}}>
        <div style={{maxWidth:'680px',margin:'0 auto'}}>
          <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>FAQ</p>
          <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'2.5rem'}}>Common <em style={{fontStyle:'italic',color:'var(--gold)'}}>questions</em></h2>
          {faqs.map(([q,a],i) => (
            <div key={i} className="fade-up" style={{background:'white',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'14px',marginBottom:'10px',overflow:'hidden'}}>
              <div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{padding:'1rem 1.25rem',fontSize:'14px',fontWeight:500,color:'var(--espresso)',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {q}<span style={{fontSize:'16px',color:'var(--gold)',transition:'transform 0.2s',transform:openFaq===i?'rotate(45deg)':'none',display:'inline-block'}}>+</span>
              </div>
              {openFaq===i && <div style={{padding:'0 1.25rem 1rem'}}><p style={{fontSize:'13px',color:'var(--espresso-mid)',lineHeight:1.7,fontWeight:300}}>{a}</p></div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{padding:'4rem 2rem'}}>
        <div className="fade-up" style={{background:'linear-gradient(135deg,var(--espresso),#5C3D22)',borderRadius:'24px',padding:'3.5rem 2rem',textAlign:'center',maxWidth:'900px',margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(26px,4vw,44px)',color:'var(--ivory)',fontWeight:500,marginBottom:'0.75rem'}}>Ready to make your invite <em style={{color:'var(--gold)',fontStyle:'italic'}}>unforgettable?</em></h2>
          <p style={{color:'rgba(255,253,247,0.5)',fontSize:'15px',marginBottom:'2rem',fontWeight:300}}>Fill the form and we'll get started within 2 hours.</p>
          <Link href="#form" style={{background:'var(--gold)',color:'var(--espresso)',padding:'13px 32px',borderRadius:'100px',fontSize:'14px',fontWeight:500,textDecoration:'none',display:'inline-block'}}>Start your invite ✦</Link>
        </div>
      </div>

    </>
  )
}