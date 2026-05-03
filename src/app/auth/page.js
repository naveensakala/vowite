'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState('login')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPass, setSignupPass] = useState('')
  const [loginMsg, setLoginMsg] = useState(null)
  const [signupMsg, setSignupMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  async function doLogin(e) {
    e.preventDefault()
    if (!loginEmail || !loginPass) { setLoginMsg({ type: 'error', text: 'Please fill in all fields' }); return }
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass })
    setLoading(false)
    if (error) { setLoginMsg({ type: 'error', text: error.message }); return }
    router.push('/dashboard')
  }

  async function doSignup(e) {
    e.preventDefault()
    if (!signupName || !signupEmail || !signupPass) { setSignupMsg({ type: 'error', text: 'Please fill in all fields' }); return }
    if (signupPass.length < 6) { setSignupMsg({ type: 'error', text: 'Password must be at least 6 characters' }); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email: signupEmail, password: signupPass, options: { data: { name: signupName } } })
    setLoading(false)
    if (error) { setSignupMsg({ type: 'error', text: error.message }); return }
    setSignupMsg({ type: 'success', text: 'Account created! You can now sign in.' })
  }

  const inputStyle = { width: '100%', padding: '12px 16px', border: '0.5px solid rgba(44,26,14,0.2)', borderRadius: '12px', fontSize: '14px', fontFamily: "'DM Sans',sans-serif", color: 'var(--espresso)', background: 'var(--ivory)', outline: 'none' }

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: 'var(--ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <style>{`
        input:focus { border-color: var(--gold) !important; }
        .auth-tab { cursor: pointer; transition: all 0.2s; }
      `}</style>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/"><Image src="/images/logo.png" alt="Vowite" height={48} width={160} style={{ height: '48px', width: 'auto' }} /></Link>
        </div>
        <div style={{ background: 'white', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 8px 40px rgba(44,26,14,0.08)' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 500, textAlign: 'center', marginBottom: '0.4rem' }}>Welcome to Vowite</h1>
          <p style={{ fontSize: '14px', color: 'var(--espresso-mid)', textAlign: 'center', marginBottom: '2rem', fontWeight: 300 }}>Create or manage your wedding invite</p>

          {/* TABS */}
          <div style={{ display: 'flex', background: 'rgba(201,168,76,0.06)', borderRadius: '100px', padding: '4px', marginBottom: '2rem' }}>
            {['login','signup'].map(t => (
              <button key={t} className="auth-tab" onClick={() => setTab(t)} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: '100px', fontSize: '14px', border: 'none', background: tab === t ? 'var(--espresso)' : 'transparent', color: tab === t ? 'var(--ivory)' : 'var(--espresso-mid)', fontWeight: tab === t ? 500 : 400, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer' }}>
                {t === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {/* LOGIN */}
          {tab === 'login' && (
            <form onSubmit={doLogin}>
              <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '6px' }}>Email</label><input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="you@email.com" style={inputStyle} /></div>
              <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '6px' }}>Password</label><input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="••••••••" style={inputStyle} /></div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'var(--espresso)', color: 'var(--ivory)', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans',sans-serif", opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Signing in...' : 'Sign in ✦'}
              </button>
              {loginMsg && <div style={{ marginTop: '1rem', padding: '10px', borderRadius: '10px', fontSize: '13px', background: loginMsg.type === 'error' ? 'rgba(220,53,53,0.08)' : 'rgba(76,175,130,0.08)', color: loginMsg.type === 'error' ? '#c0392b' : '#27ae60', textAlign: 'center' }}>{loginMsg.text}</div>}
            </form>
          )}

          {/* SIGNUP */}
          {tab === 'signup' && (
            <form onSubmit={doSignup}>
              <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '6px' }}>Your name</label><input type="text" value={signupName} onChange={e => setSignupName(e.target.value)} placeholder="Priya & Arjun" style={inputStyle} /></div>
              <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '6px' }}>Email</label><input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="you@email.com" style={inputStyle} /></div>
              <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '6px' }}>Password</label><input type="password" value={signupPass} onChange={e => setSignupPass(e.target.value)} placeholder="Min 6 characters" style={inputStyle} /></div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'var(--espresso)', color: 'var(--ivory)', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans',sans-serif", opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Creating...' : 'Create account ✦'}
              </button>
              {signupMsg && <div style={{ marginTop: '1rem', padding: '10px', borderRadius: '10px', fontSize: '13px', background: signupMsg.type === 'error' ? 'rgba(220,53,53,0.08)' : 'rgba(76,175,130,0.08)', color: signupMsg.type === 'error' ? '#c0392b' : '#27ae60', textAlign: 'center' }}>{signupMsg.text}</div>}
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--gold-dark)', textDecoration: 'none' }}>← Back to Vowite</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
