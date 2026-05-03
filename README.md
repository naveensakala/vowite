# Vowite — Wedding Invite Platform

## Overview
Vowite is a Next.js web application for creating and sharing interactive digital wedding invitations. Couples can customize their invite, publish it, and share it via WhatsApp. Guests can view the invite and RSVP directly.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Hosting**: Vercel
- **Payments**: Razorpay (to be integrated)

## Project Structure
```
src/
├── app/
│   ├── page.js              # Landing page
│   ├── layout.js            # Root layout
│   ├── not-found.js         # 404 page
│   ├── auth/page.js         # Sign in / Sign up
│   ├── dashboard/page.js    # Couple dashboard
│   ├── editor/page.js       # Invite editor
│   ├── invite/[slug]/page.js # Guest invite page
│   ├── themes/
│   │   ├── page.js          # All themes listing
│   │   └── [id]/page.js     # Theme detail preview
│   ├── admin/page.js        # Admin dashboard
│   ├── about/page.js
│   ├── pricing/page.js
│   ├── contact/page.js
│   ├── privacy/page.js
│   └── terms/page.js
├── components/
│   ├── Navbar.js            # Shared navbar (all public pages)
│   ├── Footer.js            # Shared footer
│   └── WhatsAppButton.js    # Floating WhatsApp CTA
├── lib/
│   ├── supabase.js          # Supabase client + helpers
│   └── themes.js            # Theme configs + defaults
└── styles/
    └── globals.css          # Global styles + CSS variables
```

## Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://kopmbvpvgclrnchrdpty.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Supabase Schema
```sql
-- couples: user accounts
couples (id, email, name, is_admin, created_at)

-- invites: each couple's invite
invites (id, couple_id, slug, theme, data jsonb, is_published, rsvp_enabled, created_at, updated_at)

-- rsvps: guest responses
rsvps (id, invite_id, guest_name, guest_phone, events jsonb, status, created_at)

-- themes: theme config managed by admin
themes (id, name, category, price, tag, is_active, sort_order)

-- coupons: discount codes
coupons (id, code, discount_type, discount_value, max_uses, used_count, is_active, created_at)
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourusername/vowite.git
git push -u origin main
```
Then import the repo in Vercel and add the environment variables.

## Key Pages
| URL | Description |
|-----|-------------|
| `/` | Landing page |
| `/themes` | Browse all themes |
| `/themes/sindoor` | Sindoor theme preview |
| `/editor` | Invite editor |
| `/auth` | Sign in / Sign up |
| `/dashboard` | Couple's invite dashboard |
| `/invite/[slug]` | Guest invite page |
| `/admin` | Admin dashboard (admin only) |

## Admin Access
To make a user admin, run this SQL in Supabase:
```sql
update couples set is_admin = true where email = 'your@email.com';
```

## Themes
Currently available:
- **sindoor** — North Indian Hindu
- **maangalyam** — South Indian
- **midnight** — Modern Luxury
- **gulabi** — Floral Romance
- **keerthana** — Traditional South Indian

## Invite Data Structure (jsonb)
```json
{
  "name1": "Priya",
  "name2": "Arjun",
  "wdate": "2026-02-15",
  "wcity": "Chennai",
  "blessing": "शुभ विवाह",
  "subtext": "With the blessings of God",
  "aboveNames": "Together with their families",
  "lovestory": "Met at a rainy bus stop...",
  "dateDisplay": "15th February 2026",
  "footerQuote": "Thank you for being part of our forever",
  "events": [{"icon":"💍","name":"Wedding","time":"9:00 AM","venue":"Temple","map":"","on":true}],
  "photos": ["base64..."],
  "font": "Great Vibes",
  "videoId": "youtube_id",
  "musicName": "song.mp3",
  "musicSrc": "base64..."
}
```

## Pending Tasks
- [ ] Editor page (complex — convert from HTML)
- [ ] Admin page (convert from HTML)  
- [ ] Razorpay payment integration
- [ ] Email confirmation flow
- [ ] Supabase Storage for photos/music (replace base64)
- [ ] About, Pricing, Contact, Privacy, Terms pages
- [ ] WhatsApp phone number in WhatsAppButton.js

## Go-Live Checklist
- [ ] Enable email confirmation in Supabase Auth
- [ ] Customise confirmation email template with Vowite branding
- [ ] Set up Razorpay account and add payment
- [ ] Connect vowite.com domain to Vercel
- [ ] Replace WhatsApp number in WhatsAppButton.js
- [ ] Update OG image URL to production domain
