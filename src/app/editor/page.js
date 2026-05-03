'use client'
// NOTE: The full editor is in the old HTML project (editor.html)
// This page needs to be fully migrated from editor.html
// The editor is complex (~1000 lines) and requires careful migration
// For now, this redirects to the HTML version until migration is complete

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function EditorPage() {
  const searchParams = useSearchParams()
  const theme = searchParams.get('theme') || 'sindoor'
  const id = searchParams.get('id') || ''

  useEffect(() => {
    // Temporary redirect to old HTML editor while migration is in progress
    // TODO: Replace this with the full React editor
    const url = id
      ? `/editor-legacy.html?theme=${theme}&id=${id}`
      : `/editor-legacy.html?theme=${theme}`
    window.location.href = url
  }, [])

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: 'var(--ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '2px solid rgba(201,168,76,0.2)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} :root{--gold:#C9A84C;--ivory:#FFFDF7;}`}</style>
        <p style={{ color: 'var(--espresso-mid)', fontSize: '14px' }}>Loading editor...</p>
      </div>
    </div>
  )
}
