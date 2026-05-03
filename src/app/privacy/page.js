import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = { title: 'Privacy Policy — Vowite' }

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', fontWeight: 500, marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--espresso-mid)', fontSize: '13px', marginBottom: '2rem' }}>Last updated: January 2026</p>
          {[['Information we collect','We collect information you provide directly, including your name, email address, wedding details, and photos you upload to your invite.'],['How we use your information','We use your information to create and host your wedding invite, process payments, send you important updates, and improve our service.'],['Data storage','Your invite data is stored securely on Supabase servers. Photos and media are stored encrypted. We never sell your data to third parties.'],['Guest data','RSVP responses from your guests are stored and accessible only to you through your couple dashboard.'],['Cookies','We use essential cookies to keep you logged in. We do not use advertising or tracking cookies.'],['Data deletion','You can request deletion of your account and all associated data by contacting us at hello.vowite@gmail.com.'],['Contact','For privacy concerns, email hello.vowite@gmail.com.']].map(([title, text]) => (
            <div key={title} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</h2>
              <p style={{ color: 'var(--espresso-mid)', lineHeight: 1.7, fontWeight: 300 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
