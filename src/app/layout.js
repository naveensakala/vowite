import '../styles/globals.css'

export const metadata = {
  title: 'Vowite — Make it Memorable',
  description: 'Beautiful interactive wedding invites with live countdowns, photo galleries, music and RSVP tracking. Share on WhatsApp in seconds. Made for Indian weddings.',
  openGraph: {
    title: 'Vowite — Make it Memorable',
    description: 'Beautiful interactive wedding invites your guests will never forget.',
    images: ['/images/temple1.jpg'],
    url: 'https://vowite.com',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
