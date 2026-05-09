import Link from 'next/link'

export const metadata = { title: 'Terms & Conditions — Vowite' }

export default function TermsPage() {
  const sections = [
    ['1. About Vowite', 'Vowite is a digital wedding invite platform that allows couples to create, customise and share interactive wedding invites. We offer both self-serve and done-for-you services.'],
    ['2. Eligibility', 'You must be at least 18 years old to use Vowite. By using our service, you confirm that you meet this requirement.'],
    ['3. Account & orders', 'When you place an order, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.'],
    ['4. Payments', 'All prices are listed in Indian Rupees (INR). Payments are processed securely via Razorpay. By completing a purchase, you agree to pay the amount shown at checkout.'],
    ['5. Refund policy', 'We want you to be completely happy with your Vowite. Self-serve plans: Full refund within 24 hours of purchase if the invite has not been published. Done-for-you plans: Full refund if requested before we begin building. No refund once work has commenced. After publishing: No refunds once the invite has been published. To request a refund, email hello.vowite@gmail.com within the eligible period.'],
    ['6. Hosting & availability', 'Your invite is hosted for 1 year from the date of publishing. After 1 year, the invite will go offline unless you renew hosting. We aim for 99.9% uptime but cannot guarantee uninterrupted service.'],
    ['7. Your content', 'You retain ownership of all content you upload — photos, music, text and videos. By uploading content, you grant Vowite a limited licence to store and display it as part of your invite. You must ensure you have the right to use any content you upload.'],
    ['8. Done-for-you service', 'Standard delivery is within 48 hours of receiving all required information. Rush delivery is within 24 hours. Standard includes 2 revision rounds, Rush includes 3. Final approval from you is required before publishing.'],
    ['9. Prohibited uses', 'You may not use Vowite to create invites for illegal purposes, upload malicious content, attempt to hack or disrupt our service, or resell our service without permission.'],
    ['10. Intellectual property', 'All Vowite themes, designs, code and branding are owned by Vowite. You may not copy, reproduce or distribute our templates or designs without written permission.'],
    ['11. Limitation of liability', 'Vowite is not liable for any indirect, incidental or consequential damages arising from your use of our service. Our total liability shall not exceed the amount you paid for your order.'],
    ['12. Changes to terms', 'We may update these terms from time to time. Continued use of Vowite after changes constitutes acceptance of the new terms.'],
    ['13. Governing law', 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Bengaluru, Karnataka.'],
    ['14. Contact us', null],
  ]

  return (
    <>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '6rem 2rem 5rem', fontFamily: "'DM Sans',sans-serif" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.5rem' }}>Terms & <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Conditions</em></h1>
        <p style={{ fontSize: '13px', color: 'var(--espresso-mid)', marginBottom: '3rem' }}>Last updated: May 2026</p>
        <p style={{ fontSize: '15px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>Please read these terms carefully before using Vowite. By accessing or using our service, you agree to be bound by these terms.</p>
        <div style={{ height: '0.5px', background: 'rgba(201,168,76,0.2)', marginBottom: '2rem' }}></div>
        {sections.map(([title, text]) => (
          <div key={title}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 500, color: 'var(--espresso)', margin: '2.5rem 0 0.75rem' }}>{title}</h2>
            {text ? <p style={{ fontSize: '15px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>{text}</p> : (
              <p style={{ fontSize: '15px', color: 'var(--espresso-mid)', lineHeight: 1.8, fontWeight: 300 }}>For any questions about these terms, please contact us at <a href="mailto:hello.vowite@gmail.com" style={{ color: 'var(--gold-dark)', textDecoration: 'none' }}>hello.vowite@gmail.com</a> or via WhatsApp.</p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}