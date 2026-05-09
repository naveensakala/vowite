
export const metadata = { title: 'Privacy Policy — Vowite' }

export default function PrivacyPage() {
  const sections = [
    ['1. Information we collect', 'We collect information you provide directly when you create an account, fill in the contact form, upload photos or music to your invite, or submit an RSVP response as a guest. This may include your name, email address, WhatsApp number, wedding details, and any photos or media you upload.'],
    ['2. How we use your information', 'We use the information we collect to create and host your wedding invite, process your payment, respond to your inquiries, send updates about your invite, and improve our service. We do not sell, rent, or share your personal information with third parties for marketing purposes.'],
    ['3. Photos and media', 'Photos, music and videos you upload are stored securely and used only to display your invite to your guests. We do not use your personal photos for any other purpose. You can request deletion of your media at any time by contacting us.'],
    ['4. RSVP data', 'Guest RSVP responses (name, phone number, events attending) are shared only with the couple who created the invite. We do not use guest data for any other purpose.'],
    ['5. Payments', 'All payments are processed securely through Razorpay. We do not store your card or payment details on our servers. Razorpay\'s privacy policy applies to all payment transactions.'],
    ['6. Cookies', 'We use minimal cookies to keep you logged in and remember your preferences. We do not use tracking or advertising cookies.'],
    ['7. Data retention', 'Your invite data is retained for 1 year from the date of purchase. After that, your invite goes offline unless renewed. You can request deletion of your data at any time by emailing hello.vowite@gmail.com.'],
    ['8. Your rights', 'You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and withdraw consent at any time. To exercise any of these rights, email us at hello.vowite@gmail.com.'],
    ['9. Security', 'We use industry-standard security measures to protect your data. All data is transmitted over HTTPS. However, no method of transmission over the internet is 100% secure.'],
    ['10. Changes to this policy', 'We may update this privacy policy from time to time. We will notify you of significant changes by email or by posting a notice on our website.'],
    ['11. Contact us', 'If you have any questions about this privacy policy, please contact us at hello.vowite@gmail.com or via WhatsApp.'],
  ]

  return (
    <>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 2rem 5rem', fontFamily: "'DM Sans',sans-serif" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>Privacy <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Policy</em></h1>
        <p style={{ fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '3rem' }}>Last updated: May 2026</p>
        <p style={{ fontSize: '15px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>At Vowite, we take your privacy seriously. This policy explains what information we collect, how we use it, and how we protect it.</p>
        <div style={{ height: '0.5px', background: 'rgba(201,168,76,0.2)', marginBottom: '2rem' }}></div>
        {sections.map(([title, text]) => (
          <div key={title}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 500, color: 'var(--espresso)', margin: '2.5rem 0 0.75rem' }}>{title}</h2>
            <p style={{ fontSize: '15px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>{text}</p>
          </div>
        ))}
      </div>
    </>
  )
}