'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AboutPage() {
  useEffect(() => {
    const container = document.getElementById('petals')
    if (container) {
      ['#F2C4CE','#E8D5B0','#C9A84C','#F5EDD8'].forEach(c => {
        for (let i = 0; i < 5; i++) {
          const p = document.createElement('div')
          const s = Math.random() * 8 + 4
          p.style.cssText = `width:${s}px;height:${s}px;background:${c};border-radius:50% 0 50% 0;position:absolute;left:${Math.random()*100}%;top:-20px;opacity:0;animation:fall ${Math.random()*8+6}s linear ${Math.random()*8}s infinite;`
          container.appendChild(p)
        }
      })
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
  }, [])

  return (
    <>
      <style>{`
        @keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:0.6}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
        .fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease;}
        .fade-up.visible{opacity:1;transform:translateY(0);}
        .value-card:hover{border-color:rgba(201,168,76,0.4)!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,0.08);}
        .value-card{transition:all 0.2s;}
        :root{--gold:#C9A84C;--gold-dark:#9C7A2E;--ivory:#FFFDF7;--ivory-dark:#F5EDD8;--espresso:#2C1A0E;--espresso-mid:#5C3D22;}
      `}</style>

      {/* HERO */}
      <section style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'8rem 2rem 4rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(242,196,206,0.25) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(201,168,76,0.12) 0%,transparent 60%)',pointerEvents:'none'}}></div>
        <div id="petals" style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}></div>
        <div className="fade-up" style={{position:'relative',maxWidth:'680px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(201,168,76,0.1)',border:'0.5px solid rgba(201,168,76,0.3)',borderRadius:'100px',padding:'5px 14px',fontSize:'12px',color:'var(--gold-dark)',fontWeight:500,marginBottom:'1.5rem',letterSpacing:'0.04em'}}>✦ Our story</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(40px,7vw,76px)',fontWeight:500,lineHeight:1.05,color:'var(--espresso)',marginBottom:'1.2rem'}}>We believe your invite is the <em style={{fontStyle:'italic',color:'var(--gold)'}}>first memory</em> of your wedding.</h1>
          <p style={{fontSize:'17px',color:'var(--espresso-mid)',lineHeight:1.8,maxWidth:'520px',margin:'0 auto',fontWeight:300}}>Vowite was born from a simple frustration — why do Indian weddings, the most beautiful celebrations in the world, get announced with a boring PDF on WhatsApp?</p>
        </div>
      </section>

      {/* STORY */}
      <section style={{padding:'5rem 2rem',maxWidth:'800px',margin:'0 auto'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',marginBottom:'0.75rem'}}>How it started</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(32px,5vw,52px)',fontWeight:500,color:'var(--espresso)',lineHeight:1.15,marginBottom:'2rem'}}>A wedding invite that made us say <em style={{fontStyle:'italic',color:'var(--gold)'}}>"Woah"</em></h2>
        <p className="fade-up" style={{fontSize:'16px',color:'var(--espresso-mid)',lineHeight:1.9,fontWeight:300,marginBottom:'1.5rem'}}>It started at a friend's wedding in Bangalore. The invite arrived as a <strong style={{color:'var(--espresso)',fontWeight:500}}>blurry PDF forwarded on WhatsApp</strong> — the same template everyone uses. The wedding itself was extraordinary. The invite was forgettable.</p>
        <p className="fade-up" style={{fontSize:'16px',color:'var(--espresso-mid)',lineHeight:1.9,fontWeight:300,marginBottom:'1.5rem'}}>We thought — what if the invite could feel as special as the wedding itself? What if guests could open a link and be transported into the couple's world before they even arrived at the venue?</p>
        <div className="fade-up" style={{borderLeft:'2px solid var(--gold)',padding:'1rem 1.5rem',margin:'2.5rem 0',background:'rgba(201,168,76,0.05)',borderRadius:'0 12px 12px 0'}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'22px',fontStyle:'italic',color:'var(--espresso)',lineHeight:1.6}}>"The invite is the first moment a guest experiences your wedding. It should make them say Woah."</p>
        </div>
        <p className="fade-up" style={{fontSize:'16px',color:'var(--espresso-mid)',lineHeight:1.9,fontWeight:300}}>So we built Vowite. A platform that lets Indian couples create stunning, interactive digital invites — with animated reveals, live countdowns, photo galleries, music, and venue maps — all shareable via a single WhatsApp link.</p>
      </section>

      {/* MISSION */}
      <section style={{background:'var(--espresso)',padding:'5rem 2rem',textAlign:'center'}}>
        <div style={{maxWidth:'700px',margin:'0 auto'}}>
          <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold)',fontWeight:500,textTransform:'uppercase',marginBottom:'0.75rem'}}>Our mission</p>
          <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(32px,5vw,56px)',fontWeight:500,color:'var(--ivory)',lineHeight:1.15,marginBottom:'1.5rem'}}>Make every Indian wedding invite as <em style={{fontStyle:'italic',color:'var(--gold)'}}>beautiful</em> as the wedding itself.</h2>
          <p className="fade-up" style={{fontSize:'16px',color:'rgba(255,253,247,0.55)',lineHeight:1.9,fontWeight:300}}>We're building the platform where every couple — regardless of budget or technical knowledge — can share their love story in a way that's worthy of the moment. Rooted in Indian tradition. Designed for the world.</p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{padding:'5rem 2rem',maxWidth:'1000px',margin:'0 auto'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>What we stand for</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'3rem'}}>Our <em style={{fontStyle:'italic',color:'var(--gold)'}}>values</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px'}}>
          {[['🇮🇳','Rooted in tradition','Every theme is crafted with deep respect for Indian culture — from Sindoor to Maangalyam, we celebrate what makes our weddings unique.'],['✨','Beauty in every detail','We obsess over typography, animation, colour and layout. Every pixel matters because your wedding moment deserves nothing less.'],['🤝','Simple for everyone','Your parents should love it too. We build for the couple who has no design skills, not just the tech-savvy one.'],['💛','Made with love','Every invite we help create carries a real love story. We take that responsibility seriously — and joyfully.']].map(([icon,title,desc]) => (
            <div key={title} className="value-card fade-up" style={{background:'white',border:'0.5px solid rgba(201,168,76,0.2)',borderRadius:'16px',padding:'1.75rem'}}>
              <div style={{fontSize:'28px',marginBottom:'1rem'}}>{icon}</div>
              <div style={{fontSize:'16px',fontWeight:500,color:'var(--espresso)',marginBottom:'8px'}}>{title}</div>
              <div style={{fontSize:'13px',color:'var(--espresso-mid)',lineHeight:1.7,fontWeight:300}}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section style={{background:'var(--ivory-dark)',padding:'4rem 2rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'24px',maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          {[['200+','Couples who chose Vowite'],['5','Stunning themes crafted'],['10k+','Guests who said "Woah"'],['4.9★','Average couple rating']].map(([val,lbl]) => (
            <div key={lbl} className="fade-up">
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'52px',fontWeight:500,color:'var(--gold-dark)',lineHeight:1}}>{val}</div>
              <div style={{fontSize:'13px',color:'var(--espresso-mid)',marginTop:'6px',lineHeight:1.4,fontWeight:300}}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{padding:'5rem 2rem',maxWidth:'900px',margin:'0 auto'}}>
        <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold-dark)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>The people behind Vowite</p>
        <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--espresso)',marginBottom:'3rem'}}>Built by people who <em style={{fontStyle:'italic',color:'var(--gold)'}}>love</em> weddings</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px'}}>
          {[['N','Naveen','Founder & Designer','Obsessed with beautiful design and Indian weddings. Started Vowite after one too many blurry PDF invites on WhatsApp.'],['V','The Vowite Team','Design & Delivery','A small, passionate team that builds and delivers every done-for-you invite with care and attention to detail.'],['❤','Our couples','The heart of Vowite','Every feature we build is inspired by real couples and their feedback. You shape what Vowite becomes.']].map(([init,name,role,bio]) => (
            <div key={name} className="fade-up" style={{textAlign:'center'}}>
              <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'linear-gradient(135deg,rgba(201,168,76,0.2),rgba(242,196,206,0.3))',border:'0.5px solid rgba(201,168,76,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Great Vibes',cursive",fontSize:'28px',color:'var(--gold-dark)',margin:'0 auto 1rem'}}>{init}</div>
              <div style={{fontSize:'16px',fontWeight:500,color:'var(--espresso)',marginBottom:'4px'}}>{name}</div>
              <div style={{fontSize:'13px',color:'var(--gold-dark)',marginBottom:'8px'}}>{role}</div>
              <div style={{fontSize:'12px',color:'var(--espresso-mid)',lineHeight:1.6,fontWeight:300}}>{bio}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMISE */}
      <section style={{background:'var(--espresso)',padding:'5rem 2rem'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <p className="fade-up" style={{fontSize:'11px',letterSpacing:'0.12em',color:'var(--gold)',fontWeight:500,textTransform:'uppercase',textAlign:'center',marginBottom:'0.5rem'}}>Our promise to you</p>
          <h2 className="fade-up" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:500,textAlign:'center',color:'var(--ivory)',marginBottom:0}}>Everything we do is for <em style={{fontStyle:'italic',color:'var(--gold)'}}>your moment</em></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px',marginTop:'3rem'}}>
            {[['🔒','Your data is safe','We never sell or share your personal information. Your invite details stay private and secure.'],['⚡','Fast & reliable','Your invite loads in under 2 seconds anywhere in the world. We use global infrastructure so guests never wait.'],['💬','Real support','You get a real person — not a bot. Reach us on WhatsApp and we\'ll respond within 2 hours.'],['🌍','Works everywhere','Your guests in Mumbai, Dubai, New York or Singapore all get the same beautiful experience.']].map(([icon,title,desc]) => (
              <div key={title} className="fade-up" style={{background:'rgba(255,253,247,0.05)',border:'0.5px solid rgba(201,168,76,0.15)',borderRadius:'16px',padding:'1.5rem'}}>
                <div style={{fontSize:'24px',marginBottom:'0.75rem'}}>{icon}</div>
                <div style={{fontSize:'14px',fontWeight:500,color:'var(--ivory)',marginBottom:'6px'}}>{title}</div>
                <div style={{fontSize:'12px',color:'rgba(255,253,247,0.4)',lineHeight:1.6,fontWeight:300}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'5rem 2rem'}}>
        <div className="fade-up" style={{background:'linear-gradient(135deg,var(--espresso),#5C3D22)',borderRadius:'24px',padding:'4rem 2rem',textAlign:'center',maxWidth:'900px',margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(28px,5vw,52px)',color:'var(--ivory)',fontWeight:500,marginBottom:'0.75rem'}}>Ready to make your invite <em style={{color:'var(--gold)',fontStyle:'italic'}}>unforgettable?</em></h2>
          <p style={{color:'rgba(255,253,247,0.5)',fontSize:'16px',marginBottom:'2rem',fontWeight:300}}>Join hundreds of couples who chose to honour their wedding with a Vowite.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/#themes" style={{background:'var(--gold)',color:'var(--espresso)',padding:'13px 32px',borderRadius:'100px',fontSize:'14px',fontWeight:500,textDecoration:'none'}}>Browse themes ✦</Link>
            <Link href="/contact" style={{background:'transparent',color:'rgba(255,253,247,0.6)',padding:'13px 32px',borderRadius:'100px',fontSize:'14px',textDecoration:'none',border:'0.5px solid rgba(255,255,255,0.2)'}}>Done for you →</Link>
          </div>
        </div>
      </section>

    </>
  )
}