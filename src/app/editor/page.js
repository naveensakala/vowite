'use client'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function EditorRedirect() {
  const searchParams = useSearchParams()
  const theme = searchParams.get('theme') || 'sindoor'
  const id = searchParams.get('id') || ''

  useEffect(() => {
    const url = id
      ? `/editor-legacy.html?theme=${theme}&id=${id}`
      : `/editor-legacy.html?theme=${theme}`
    window.location.href = url
  }, [])

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: '#FFFDF7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '2px solid rgba(201,168,76,0.2)', borderTopColor: '#C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: '#5C3D22', fontSize: '14px' }}>Loading editor...</p>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorRedirect />
    </Suspense>
  )
}