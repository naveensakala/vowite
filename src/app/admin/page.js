'use client'
// NOTE: Admin dashboard needs to be migrated from admin.html
// For now redirecting to the HTML version

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    window.location.href = '/admin-legacy.html'
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p>Loading admin...</p>
    </div>
  )
}
