'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [invite, setInvite] = useState(null)
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/auth'); return }
    setUser(session.user)

    const { data: inv } = await supabase.from('invites').select('*').eq('couple_id', session.user.id).single()
    setInvite(inv)

    if (inv?.rsvp_enabled) {
      const { data: r } = await supabase.from('rsvps').select('*').eq('invite_id', inv.id).order('created_at', { ascending: false })
      setRsvps(r || [])
    }
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  function copyLink() {
    if (!invite) return
    navigator.clipboard.writeText(`${window.location.origin}/invite/${invite.slug}`)
    alert('Link copied!')
  }

  function downloadCSV() {
    if (!rsvps.length) { alert('No RSVPs yet!'); return }
    const rows = [['Name', 'Phone', 'Events', 'Status', 'Date']]
    rsvps.forEach(r => rows.push([r.guest_name, r.guest_phone, (r.events || []).join(' | '), r.status, new Date(r.created_at).toLocaleDateString()]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'vowite-guests.csv'
    a.click()
  }

  const confirmed = rsvps.filter(r => r.status === 'confirmed').length
  const pending = rsvps.filter(r => r.status === 'pending').length
  const declined = rsvps.filter(r => r.status === 'declined').length
  const d = invite?.data || {}
  const inviteLink = invite ? `${typeof window !== 'undefined' ? window.location.origin : 'https://vowite.com'}/invite/${invite.slug}` : ''

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: '#f8f5f0', minHeight: '100vh' }}>
      <style>{`
        @media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>

      {/* TOPBAR */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '56px', background: 'rgba(255,253,247,0.95)', backdropFilter: 'blur(8px)', borderBottom: '0.5px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
        <Link href="/"><Image src="/images/logo.png" alt="Vowite" height={36} width={120} style={{ height: '36px', width: 'auto' }} /></Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--espresso-mid)' }}>{user?.email}</span>
          <button onClick={signOut} style={{ fontSize: '13px', color: 'var(--espresso-mid)', background: 'none', border: '0.5px solid rgba(44,26,14,0.2)', padding: '6px 14px', borderRadius: '100px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Sign out</button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 2rem 4rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ width: '32px', height: '32px', border: '2px solid rgba(201,168,76,0.2)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : !invite ? (
          <>
            <div style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 500, marginBottom: '4px' }}>Welcome to Vowite 👋</h1>
              <p style={{ fontSize: '14px', color: 'var(--espresso-mid)', fontWeight: 300 }}>Your wedding invite dashboard</p>
            </div>
            <div style={{ background: 'white', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>💌</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 500, marginBottom: '0.5rem' }}>Your invite is waiting to be made</h2>
              <p style={{ fontSize: '14px', color: 'var(--espresso-mid)', fontWeight: 300, marginBottom: '2rem' }}>Pick a theme and start building your wedding invite in minutes.</p>
              <Link href="/#themes" style={{ display: 'inline-block', background: 'var(--espresso)', color: 'var(--ivory)', padding: '14px 32px', borderRadius: '100px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Browse themes ✦</Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 500, marginBottom: '4px' }}>Welcome back, {d.name1 || 'there'} 👋</h1>
              <p style={{ fontSize: '14px', color: 'var(--espresso-mid)', fontWeight: 300 }}>Here's your Vowite dashboard</p>
            </div>

            {/* INVITE CARD */}
            <div style={{ background: 'white', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '24px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 500 }}>{d.name1 || 'Partner 1'} & {d.name2 || 'Partner 2'}</div>
                  <div style={{ fontSize: '13px', color: 'var(--espresso-mid)', marginTop: '4px', textTransform: 'capitalize' }}>{invite.theme} theme</div>
                </div>
                <span style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, background: invite.is_published ? 'rgba(76,175,130,0.1)' : 'rgba(201,168,76,0.1)', color: invite.is_published ? '#2e7d57' : 'var(--gold-dark)', border: invite.is_published ? '0.5px solid rgba(76,175,130,0.3)' : '0.5px solid rgba(201,168,76,0.3)' }}>
                  {invite.is_published ? 'Published ✓' : 'Draft'}
                </span>
              </div>

              {invite.is_published && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--ivory)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '13px', color: 'var(--espresso-mid)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inviteLink}</span>
                  <button onClick={copyLink} style={{ background: 'var(--espresso)', color: 'var(--ivory)', border: 'none', padding: '7px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", flexShrink: 0 }}>Copy link</button>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href={`/editor?id=${invite.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, background: 'var(--espresso)', color: 'var(--ivory)', textDecoration: 'none' }}>✏️ Edit invite</Link>
                {invite.is_published && (
                  <button onClick={() => { const msg = encodeURIComponent(`You're invited! ${inviteLink}`); window.open(`https://wa.me/?text=${msg}`, '_blank') }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, background: '#25D366', color: 'white', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>📲 Share on WhatsApp</button>
                )}
                {invite.is_published && (
                  <a href={`/invite/${invite.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, background: 'transparent', color: 'var(--espresso)', border: '0.5px solid rgba(44,26,14,0.2)', textDecoration: 'none' }}>👁 Preview</a>
                )}
                {rsvps.length > 0 && (
                  <button onClick={downloadCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, background: 'transparent', color: 'var(--espresso)', border: '0.5px solid rgba(44,26,14,0.2)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>⬇ Guest list CSV</button>
                )}
              </div>
            </div>

            {/* STATS */}
            {invite.rsvp_enabled && (
              <>
                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '1.5rem' }}>
                  {[[rsvps.length,'Total RSVPs'],[confirmed,'Confirmed'],[pending,'Pending'],[declined,'Declined']].map(([num,lbl]) => (
                    <div key={lbl} style={{ background: 'white', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '36px', fontWeight: 600, lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: '12px', color: 'var(--espresso-mid)', marginTop: '4px', fontWeight: 300 }}>{lbl}</div>
                    </div>
                  ))}
                </div>

                {rsvps.length > 0 && (
                  <div style={{ background: 'white', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '0.5px solid rgba(201,168,76,0.15)', fontSize: '15px', fontWeight: 500 }}>Guest list</div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead><tr>{['Guest','Events','Status','Date'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 500, color: 'var(--espresso-mid)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '0.5px solid rgba(201,168,76,0.15)' }}>{h}</th>)}</tr></thead>
                        <tbody>
                          {rsvps.map(r => (
                            <tr key={r.id}>
                              <td style={{ padding: '10px 16px', color: 'var(--espresso-mid)', borderBottom: '0.5px solid rgba(201,168,76,0.06)' }}>{r.guest_name}</td>
                              <td style={{ padding: '10px 16px', color: 'var(--espresso-mid)', borderBottom: '0.5px solid rgba(201,168,76,0.06)' }}>{(r.events || []).join(', ')}</td>
                              <td style={{ padding: '10px 16px', borderBottom: '0.5px solid rgba(201,168,76,0.06)' }}>
                                <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 500, background: r.status === 'confirmed' ? 'rgba(76,175,130,0.1)' : 'rgba(201,168,76,0.1)', color: r.status === 'confirmed' ? '#2e7d57' : 'var(--gold-dark)' }}>{r.status}</span>
                              </td>
                              <td style={{ padding: '10px 16px', color: 'var(--espresso-mid)', borderBottom: '0.5px solid rgba(201,168,76,0.06)' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
