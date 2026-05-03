import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = { title: 'Terms & Conditions — Vowite' }

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', fontWeight: 500, marginBottom: '0.5rem' }}>Terms & Conditions</h1>
          <p style={{ color: 'var(--espresso-mid)', fontSize: '13px', marginBottom: '2rem' }}>Last updated: January 2026</p>
          {[['Acceptance','By using Vowite, you agree to these terms. If you do not agree, please do not use the service.'],['Service','Vowite provides a platform for creating and sharing digital wedding invitations. Your invite is hosted for 1 year from the date of purchase.'],['Payment','All payments are one-time and non-refundable once your invite has been published. If there is a technical issue preventing publication, please contact us.'],['Content','You are responsible for the content you upload. Do not upload copyrighted music or images without proper licensing. We reserve the right to remove content that violates these terms.'],['Privacy','We handle your data as described in our Privacy Policy.'],['Limitation of liability','Vowite is not liable for any indirect, incidental, or consequential damages arising from your use of the service.'],['Changes','We may update these terms at any time. Continued use of the service constitutes acceptance of updated terms.'],['Contact','For questions about these terms, email hello.vowite@gmail.com.']].map(([title, text]) => (
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
