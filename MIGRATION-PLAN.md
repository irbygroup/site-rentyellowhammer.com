# Yellowhammer Hospitality: WordPress → Next.js/Vercel Migration Plan

## Current State Assessment

### Hosting & Stack
- **Host:** SiteGround (ssh.rentyellowhammer.com)
- **CMS:** WordPress 6.x with OceanWP theme
- **Page Builder:** Elementor + Beaver Builder (bb-plugin)
- **Forms:** Gravity Forms (contact + getting started)
- **Chat:** Tidio (replacing with Chatwoot)
- **Plugins:** 35+ installed (most are tracking, SEO, or caching)
- **Domain DNS:** GoDaddy (migrating to Cloudflare)

### Content Inventory
| Content | Count |
|---------|-------|
| Published Pages | 22 (13 meaningful, rest are thank-you/success pages) |
| Blog Posts | 3 (generic placeholders — dropping) |
| Original Images | ~367 files |
| Total Upload Size | 855 MB |
| Gallery: Courtyard | 38 photos |
| Gallery: Oak & Fountain | 29 photos |
| Gallery: Hallett-Irby House | 40+ photos |

### Subdomains
- **str.rentyellowhammer.com** — Dead. Just a SiteGround "Under Construction" placeholder. No content. Dropping.
- **yellowhammerhospitality.com** — Symlinked to rentyellowhammer.com on SiteGround. Will redirect via Cloudflare.

---

## Final Tech Stack

```
Framework:      Next.js 15 (App Router)
Styling:        Tailwind CSS 4
Database:       Neon (serverless Postgres)
Forms:          Next.js Route Handlers → Neon + SendGrid + FollowUpBoss
Spam Protection: Cloudflare Turnstile (invisible CAPTCHA, free)
Email:          SendGrid (existing account)
CRM:            FollowUpBoss (existing — auto-create leads on form submit)
Live Chat:      Chatwoot (open-source, cloud to start) + auto-create FUB leads from chats
Booking:        BookedDirectly (existing iframe embed)
Analytics:      GA4 + GTM + Meta/Facebook/Instagram Pixel (script tags)
Custom Events:  GA4 events on form_submitted, chat_opened, call_clicked, gallery_viewed
Images:         Vercel Image Optimization (automatic WebP/AVIF)
Deployment:     Vercel (free tier)
DNS:            Cloudflare (migrating from GoDaddy)
Repo:           GitHub → Vercel auto-deploy
```

---

## Architecture Overview

```
                    ┌─────────────┐
                    │  Cloudflare  │
                    │  DNS + CDN   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Vercel     │
                    │  (Next.js)   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌──▼───┐ ┌──────▼──────┐
       │    Neon DB   │ │ Send │ │ FollowUp    │
       │  (Postgres)  │ │ Grid │ │ Boss API    │
       └─────────────┘ └──────┘ └─────────────┘
                                       │
              ┌────────────────────────┘
              │
       ┌──────▼──────┐
       │  Chatwoot    │
       │ (live chat)  │
       └─────────────┘
```

### Form Submission Flow
```
User submits form
  → POST /api/contact (Next.js Route Handler)
    → 1. Validate & sanitize input
    → 2. INSERT into Neon DB (leads table)
    → 3. Send notification email via SendGrid to info@rentyellowhammer.com
    → 4. Create person + inquiry event in FollowUpBoss
         (reuse patterns from venue-scrapper/app/fub.py)
    → 5. Return success to client
```

### FollowUpBoss Integration (from your existing code)
```
Auth:     Basic Auth (Base64 of fub_api_key + ":")
Headers:  X-System: IRBY-GROUP-FUB-API
          X-System-Key: <fub_system_key>
Base URL: https://api.followupboss.com/v1

On form submit:
  1. POST /events — Create inquiry event with embedded person data
     {
       "source": "RentYellowhammer.com",
       "system": "IRBY-GROUP-FUB-API",
       "type": "Inquiry",
       "message": "<event type> inquiry for <venue>",
       "person": {
         "firstName": "...",
         "lastName": "...",
         "emails": [{"value": "..."}],
         "phones": [{"value": "..."}],
         "tags": ["Website"],
         "stage": "YH | Hot Lead",
         "source": "RentYellowhammer.com",
         "customPrimaryVenueInterest": "<selected venue>"
       }
     }
  2. POST /notes — Create note with full form details
     {
       "personId": <from step 1>,
       "subject": "Website Inquiry Details",
       "body": "[Website Inquiry]\nVenue: ...\nEvent Type: ...\n..."
     }

Rate limiting: Retry up to 5x on 429, respect Retry-After header
```

---

## Project Structure

```
site-rentyellowhammer.com/
├── app/
│   ├── layout.tsx                    # Root layout (nav, footer, scripts)
│   ├── page.tsx                      # Home
│   ├── courtyard-on-dauphin/
│   │   ├── page.tsx                  # Venue page
│   │   └── gallery/page.tsx          # Gallery (or flat URL — see below)
│   ├── oak-and-fountain/
│   │   ├── page.tsx
│   │   └── gallery/page.tsx
│   ├── hallet-irby-house/
│   │   ├── page.tsx
│   │   └── gallery/page.tsx
│   ├── short-term-rental-suites/page.tsx
│   ├── contact/page.tsx
│   ├── about/page.tsx
│   ├── getting-started/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-of-use/page.tsx
│   └── api/
│       ├── contact/route.ts          # Form handler → Turnstile + Neon + SendGrid + FUB
│       └── chatwoot-webhook/route.ts # Chatwoot → FUB lead creation
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── VenueCard.tsx
│   ├── Gallery.tsx                   # Image grid + lightbox
│   ├── ContactForm.tsx               # Client component with validation
│   ├── TestimonialSlider.tsx
│   ├── FloatingCallButton.tsx
│   └── ChatwootWidget.tsx            # Chatwoot embed
├── lib/
│   ├── db.ts                         # Neon client (@neondatabase/serverless)
│   ├── sendgrid.ts                   # SendGrid email helper
│   ├── followupboss.ts               # FUB API client (from venue-scrapper patterns)
│   ├── turnstile.ts                  # Cloudflare Turnstile verification
│   ├── analytics.ts                  # GA4 custom event helpers
│   └── venues.ts                     # Venue data (static)
├── public/
│   ├── images/                       # Venue images (organized by venue)
│   ├── logos/                         # Brand logos
│   └── favicon.png
├── .env.local                        # Local secrets (not committed)
├── vercel.json                       # Redirects
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

### Environment Variables (.env.local)
```env
# Neon Database
DATABASE_URL=postgresql://...@ep-xxx.us-east-2.aws.neon.tech/yellowhammer?sslmode=require

# SendGrid
SENDGRID_API_KEY=SG.xxx
NOTIFICATION_EMAIL=info@rentyellowhammer.com

# FollowUpBoss
FUB_API_KEY=fka_04vJAWTFCdGmAGhNwphGeIzFwRnHnd1xIA
FUB_API_BASE_URL=https://api.followupboss.com/v1
FUB_SYSTEM_HEADER=IRBY-GROUP-FUB-API
FUB_SYSTEM_KEY=030938a81990fdb76c245fcb1473ce9a

# Chatwoot
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://app.chatwoot.com  # or self-hosted URL
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=xxx
CHATWOOT_API_ACCESS_TOKEN=xxx                           # For webhook verification + API calls

# Cloudflare Turnstile (spam protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxx                      # Public — rendered in form
TURNSTILE_SECRET_KEY=xxx                                # Server-side — validates token

# Analytics (public — ok to expose)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx
NEXT_PUBLIC_GTM_ID=GTM-xxx
NEXT_PUBLIC_META_PIXEL_ID=xxx
```

---

## Neon Database Schema

```sql
-- Lead submissions from website forms
CREATE TABLE leads (
  id            SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  venue         TEXT NOT NULL,          -- 'courtyard' | 'oak-fountain' | 'hallett-irby'
  event_type    TEXT NOT NULL,          -- 'wedding' | 'party' | 'meeting' | 'other'
  event_detail  TEXT,                   -- Free text if "other" selected
  message       TEXT,
  source_page   TEXT,                   -- URL path where form was submitted
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,

  -- FollowUpBoss sync
  fub_person_id TEXT,                   -- FUB person ID after creation
  fub_synced    BOOLEAN DEFAULT FALSE,
  fub_synced_at TIMESTAMPTZ,
  fub_error     TEXT,                   -- Last error if sync failed

  -- SendGrid
  email_sent    BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMPTZ,

  -- Metadata
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_fub_synced ON leads(fub_synced);
CREATE INDEX idx_leads_venue ON leads(venue);
```

---

## Execution Plan

### Phase 1: Infrastructure & DNS (Day 1)

**Step 1.1 — Migrate DNS from GoDaddy to Cloudflare**

You have existing migration tooling at `frappe-dev-work/gitops/tools/dns-migration/` (branch `tool/godaddy-cf-migration`). For this single domain:

1. Create Cloudflare zone for `rentyellowhammer.com` (and `yellowhammerhospitality.com`)
2. Export current DNS records from GoDaddy:
   ```bash
   # Using your existing script, or manually for just 1 domain:
   curl -s -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET" \
     "https://api.godaddy.com/v1/domains/rentyellowhammer.com/records" | jq .
   ```
3. Import DNS records into Cloudflare zone
4. Update nameservers at GoDaddy to point to Cloudflare's assigned NS
5. Wait for propagation (~24-48h, usually faster)
6. Verify with `dig rentyellowhammer.com NS`

**Needed from you:** GoDaddy API key + secret (not in your .env.secrets). Or we can just do this manually in the GoDaddy dashboard for 1 domain — it's faster than scripting it.

**Step 1.2 — Create Neon Database**
1. Sign up at neon.tech (free tier: 0.5 GB storage, autoscaling)
2. Create project "yellowhammer"
3. Create database "yellowhammer"
4. Run the schema SQL above
5. Copy connection string to `.env.local`

**Step 1.3 — Set up Chatwoot**

Two options:

| | Chatwoot Cloud | Self-hosted |
|---|---|---|
| Setup | Sign up → add website channel → get embed token | Docker Compose on a VPS |
| Cost | Free up to 1 agent | ~$5/mo VPS |
| Maintenance | None | Updates, backups |
| **Recommendation** | **Start here** | Migrate later if needed |

Setup steps:
1. Create Chatwoot account (cloud or self-hosted)
2. Create "Website" channel for rentyellowhammer.com
3. Configure inbox (name, greeting, business hours, auto-assignment)
4. Get the website token
5. Add `NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN` to env

Chatwoot embed component:
```tsx
// components/ChatwootWidget.tsx
"use client";
import { useEffect } from "react";

export function ChatwootWidget() {
  useEffect(() => {
    window.chatwootSettings = {
      position: "right",
      type: "standard",
      launcherTitle: "Chat with us",
    };
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.chatwootSDK?.run({
        websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN,
        baseUrl: process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL,
      });
    };
    document.head.appendChild(script);
  }, []);
  return null;
}
```

**Step 1.4 — Initialize Next.js Project**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
npm install @neondatabase/serverless @sendgrid/mail
```

### Phase 2: Asset Export & Core Build (Day 2)

**Step 2.1 — Export media from WordPress via SSH**
```bash
# On SiteGround — tar originals only (skip thumbnails + cache)
cd www/rentyellowhammer.com/public_html
find wp-content/uploads -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.svg" \) \
  -not -name "*-[0-9]*x[0-9]*.*" \
  -not -path "*/siteground-optimizer*" \
  -not -path "*/elementor*" \
  | tar czf /tmp/media-export.tar.gz -T -

# Download via SCP
scp -P 18765 -i /tmp/ryh-ssh/id_ed25519 \
  u1050-gh7hg6xlaasv@ssh.rentyellowhammer.com:/tmp/media-export.tar.gz ./
```

**Step 2.2 — Export page content via WP-CLI**
```bash
# On SiteGround
cd www/rentyellowhammer.com/public_html
wp post list --post_type=page --post_status=publish \
  --fields=ID,post_title,post_name,post_content --format=json > /tmp/pages-export.json
```

**Step 2.3 — Build root layout + shared components**
- Root layout: HTML head (meta, fonts, analytics scripts), Header, Footer, Chatwoot
- Color scheme: dark backgrounds, gold/yellow (#f9d342) accents
- Fonts: Montserrat + Hind (Google Fonts via next/font)
- Header: Logo + nav + phone CTA (251-333-RENT)
- Footer: 3 venue logos, addresses, social links, legal links
- FloatingCallButton: Fixed bottom-right on mobile

**Step 2.4 — Build reusable components**
- `VenueCard` — Image + title + address + description + CTA
- `Gallery` — CSS grid + lightbox (GLightbox, ~4KB)
- `TestimonialSlider` — Minimal JS carousel
- `ContactForm` — Client component with validation + submit to `/api/contact`

### Phase 3: Build All Pages (Days 3–4)

**Step 3.1 — Homepage**
- Hero section with background image + headline + CTAs
- 3 venue cards (Courtyard, Oak & Fountain, Hallett-Irby)
- "Book Your Private Tour Today" CTA section
- Company overview

**Step 3.2 — Venue Pages (x3)**
Each follows the same template:
- Hero with venue logo + 3 CTAs (Call, See The Space, Schedule Visit)
- Welcome text + tagline
- 3 service sections (Weddings, Corporate, Office/Reunions)
- Detailed description (rental hours, amenities, event types)
- Testimonials section
- Gallery preview + link to full gallery
- Contact CTA

**Step 3.3 — Gallery Pages (x3)**
- Responsive image grid (3 cols desktop, 2 tablet, 1 mobile)
- GLightbox for full-screen viewing
- Floor plan images
- Testimonials below

**Step 3.4 — Short Term Rental Suites**
- 3 venue cards with descriptions
- BookedDirectly iframe: `<iframe src="https://irbyrents.bookeddirectly.com" />`

**Step 3.5 — Contact Page**
- Intro text about Mobile, AL
- ContactForm (→ `/api/contact` → Neon + SendGrid + FUB)
- 3 venue addresses with Google Maps links
- Phone + email

**Step 3.6 — About Page**
- Company description
- 3 team member cards (Megan Dearing, Kristen Irby, Jared Irby)
- Venue overview cards

**Step 3.7 — Getting Started**
- Same ContactForm component (pre-select venue if linked from venue page)

**Step 3.8 — Legal Pages**
- Privacy Policy + Terms of Use (plain text)

### Phase 4: Form Backend — Neon + SendGrid + FollowUpBoss (Day 4)

**Step 4.1 — `/app/api/contact/route.ts`**

```typescript
// Pseudocode — actual implementation will be ~80 lines
export async function POST(request: Request) {
  const body = await request.json();

  // 1. Validate
  const { firstName, lastName, email, phone, venue, eventType, message } = validate(body);

  // 2. Save to Neon
  const lead = await db.query(
    `INSERT INTO leads (first_name, last_name, email, phone, venue, event_type, message, source_page)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [firstName, lastName, email, phone, venue, eventType, message, body.sourcePage]
  );

  // 3. Send email via SendGrid (fire-and-forget with error capture)
  await sendNotificationEmail({ firstName, lastName, email, phone, venue, eventType, message });

  // 4. Create lead in FollowUpBoss (fire-and-forget with error capture)
  const fubResult = await createFubLead({ firstName, lastName, email, phone, venue, eventType, message });

  // 5. Update lead record with FUB sync status
  await db.query(
    `UPDATE leads SET fub_person_id=$1, fub_synced=$2, fub_synced_at=NOW() WHERE id=$3`,
    [fubResult.personId, true, lead.id]
  );

  return Response.json({ success: true });
}
```

**Step 4.2 — `lib/followupboss.ts`**

Port the pattern from `venue-scrapper/app/fub.py`:
- Basic Auth with API key
- `X-System` + `X-System-Key` headers
- `POST /events` to create inquiry + person in one call
- `POST /notes` to attach form details
- Retry on 429 with `Retry-After` header
- Source: `"RentYellowhammer.com"` (distinguishes from Eventective leads)
- Tags: `["Website"]`
- Stage: `"YH | Hot Lead"`
- Custom field: `customPrimaryVenueInterest` → selected venue

**Step 4.3 — Cloudflare Turnstile (spam protection)**

Turnstile is Cloudflare's free, invisible CAPTCHA replacement. Most users never see a challenge.

1. Create Turnstile widget in Cloudflare dashboard (Sites → Turnstile)
2. Set type to "Managed" (auto-decides if challenge is needed)
3. Add site key + secret key to env vars

Client side (in ContactForm.tsx):
```tsx
// Invisible Turnstile widget — renders as a hidden div
<div id="turnstile-container" />
// On mount: window.turnstile.render("#turnstile-container", { sitekey, callback: setToken })
// Include token in form submission body
```

Server side (in /api/contact/route.ts):
```typescript
// Verify token before processing form
const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  method: "POST",
  body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: body.turnstileToken }),
});
const { success } = await turnstileRes.json();
if (!success) return Response.json({ error: "Spam check failed" }, { status: 422 });
```

**Step 4.4 — `lib/sendgrid.ts`**

```typescript
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendNotificationEmail(lead: Lead) {
  await sgMail.send({
    to: process.env.NOTIFICATION_EMAIL,
    from: "noreply@rentyellowhammer.com",  // Must be verified sender in SendGrid
    subject: `New ${lead.eventType} inquiry — ${lead.venue}`,
    text: `Name: ${lead.firstName} ${lead.lastName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nVenue: ${lead.venue}\nEvent: ${lead.eventType}\n\n${lead.message}`,
  });
}
```

**Step 4.5 — Chatwoot → FollowUpBoss Webhook**

Auto-create FUB leads when a visitor starts a Chatwoot conversation:

1. In Chatwoot dashboard: Settings → Integrations → Webhooks
2. Add webhook URL: `https://rentyellowhammer.com/api/chatwoot-webhook`
3. Subscribe to event: `conversation_created`

`/app/api/chatwoot-webhook/route.ts`:
```typescript
export async function POST(request: Request) {
  const body = await request.json();

  // Only process new conversations with contact info
  if (body.event !== "conversation_created") return Response.json({ ok: true });

  const contact = body.conversation?.meta?.sender;
  if (!contact?.email && !contact?.phone_number) return Response.json({ ok: true });

  // Parse name
  const [firstName, ...rest] = (contact.name || "Chat Visitor").split(" ");
  const lastName = rest.join(" ") || "";

  // 1. Save to Neon
  await db.query(
    `INSERT INTO leads (first_name, last_name, email, phone, venue, event_type, source_page)
     VALUES ($1,$2,$3,$4,'unknown','chat','chatwoot')`,
    [firstName, lastName, contact.email, contact.phone_number]
  );

  // 2. Create FUB lead
  await createFubLead({
    firstName, lastName,
    email: contact.email,
    phone: contact.phone_number,
    venue: "Unknown",
    eventType: "Chat Inquiry",
    source: "RentYellowhammer.com (Chat)",
    tags: ["Website", "Chatwoot"],
  });

  return Response.json({ ok: true });
}
```

**Step 4.6 — GA4 Custom Analytics Events**

`lib/analytics.ts`:
```typescript
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}
```

Events fired automatically:
| Event | Trigger | Params |
|-------|---------|--------|
| `form_submitted` | Contact/Getting Started form success | `venue`, `event_type` |
| `chat_opened` | Chatwoot widget opened | `page` |
| `call_clicked` | Phone CTA or floating call button clicked | `venue`, `location` (header/footer/floating) |
| `gallery_viewed` | Gallery page loaded | `venue` |
| `virtual_tour_clicked` | "See The Space" CTA clicked | `venue` |
| `booking_started` | BookedDirectly iframe loaded | — |

These show up in GA4 → Reports → Engagement → Events. You can build conversion funnels from them.

### Phase 5: SEO & Performance (Day 5)

**Step 5.1 — SEO**
- `next-sitemap` for auto-generated sitemap.xml + robots.txt
- `<title>` and `<meta description>` per page
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (LocalBusiness schema per venue)

**Step 5.2 — URL Preservation (Critical)**

Keep ALL existing URLs identical — no redirects needed for core pages:

| URL | Status |
|-----|--------|
| `/` | Same |
| `/courtyard-on-dauphin/` | Same |
| `/oak-and-fountain/` | Same |
| `/hallet-irby-house/` | Same |
| `/courtyard-on-dauphin-gallery/` | Same (keep flat) |
| `/oak-and-fountain-gallery/` | Same (keep flat) |
| `/hallet-irby-house-gallery/` | Same (keep flat) |
| `/short-term-rental-suites/` | Same |
| `/contact/` | Same |
| `/about/` | Same |
| `/getting-started/` | Same |
| `/privacy-policy/` | Same |
| `/terms-of-use/` | Same |

**vercel.json** — Redirects for dropped pages only:
```json
{
  "redirects": [
    { "source": "/form-submission-success-:path*", "destination": "/contact/", "permanent": true },
    { "source": "/thank-you-for-your-interest-:path*", "destination": "/getting-started/", "permanent": true },
    { "source": "/minimal-portfolio-post-:path*", "destination": "/", "permanent": true }
  ]
}
```

**Step 5.3 — Image Optimization**
- Use Next.js `<Image>` component for automatic responsive srcset + WebP/AVIF
- Vercel Image Optimization handles format conversion at edge
- Lazy-load all below-fold images
- Target: 855MB raw → ~100MB optimized

**Step 5.4 — Performance Targets**
- Lighthouse: 95+ all categories
- FCP < 1.5s
- Page weight < 500KB (excluding gallery images on scroll)

### Phase 6: Deploy & Cutover (Day 6)

**Step 6.1 — GitHub + Vercel**
1. `git init` → push to GitHub (private repo under irbygroup org)
2. Import in Vercel dashboard
3. Framework: Next.js (auto-detected)
4. Add all env vars in Vercel project settings
5. Deploy to `*.vercel.app` preview URL

**Step 6.2 — Test on Preview URL**
- All pages render correctly
- Forms submit → check Neon DB, SendGrid email, FUB lead created
- Chatwoot widget loads and connects
- BookedDirectly iframe works
- Mobile responsive
- All external links work (virtual tours, Google Calendar)

**Step 6.3 — DNS Cutover (Cloudflare)**

By this point DNS should already be on Cloudflare (from Phase 1). Update records:

```
# rentyellowhammer.com
Type  Name   Content              Proxy
A     @      76.76.21.21          ON (orange cloud)
CNAME www    cname.vercel-dns.com ON

# yellowhammerhospitality.com — redirect to rentyellowhammer.com
# Use Cloudflare Page Rule or Redirect Rule:
#   yellowhammerhospitality.com/* → https://rentyellowhammer.com/$1 (301)
```

In Vercel: Add custom domains `rentyellowhammer.com` + `www.rentyellowhammer.com`

SSL: Automatic via both Cloudflare (edge) and Vercel (origin)

**Step 6.4 — Drop str.rentyellowhammer.com**
- It's a dead placeholder page. Don't create a Cloudflare DNS record for it.
- If the subdomain was ever indexed, add a redirect rule or just let it 404.

**Step 6.5 — Decommission WordPress**
1. Keep SiteGround running 2 weeks as fallback
2. Take final backup: `wp db export` + tar uploads
3. Verify everything works on new stack
4. Cancel SiteGround hosting

### Phase 7: Uptime Monitoring (Day 7)

Uptime Kuma provides status monitoring with alerting. Two instances create a watchdog pattern —
if vm-primary dies, truenas-hallett detects it independently and alerts you.

**Step 7.1 — Deploy truenas-hallett Uptime Kuma** (code already committed to gitops)

```bash
# On TrueNAS
ssh jaredirby@truenas-hallett
cd /mnt/storage-pool/application_configs/gitops/truenas-hallett
git pull

# Create data directory
sudo mkdir -p /mnt/storage-pool/application_configs/uptime-kuma

# Start the service
sudo docker compose up -d uptime-kuma

# Add local DNS entry for status.officeapps.irbygroup.com
./setup_local_dns.sh
```

**Step 7.2 — Configure truenas-hallett Uptime Kuma**

1. Open `https://status.officeapps.irbygroup.com` (Authelia login first)
2. Create admin account on first launch
3. Set up notification channels:
   - **Email** (SendGrid SMTP): `smtp.sendgrid.net:587`, API key as password, to: `jared@irbygroup.com`
   - **Slack/Discord** (optional): webhook URL
4. Add monitors:

| Monitor | Type | URL/Host | Interval | Alert |
|---------|------|----------|----------|-------|
| Uptime Kuma (vm-primary) | HTTP(s) | `https://status.admin.build365.app` | 60s | Yes |
| Traefik (vm-primary) | HTTP(s) | `https://traefik.primary.build365.app` | 60s | Yes |
| Portainer (vm-primary) | HTTP(s) | `https://portainer.admin.build365.app` | 60s | Yes |
| Homepage (vm-primary) | HTTP(s) | `https://admin.build365.app` | 60s | Yes |
| Grafana (vm-primary) | HTTP(s) | `https://grafana.admin.build365.app` | 60s | Yes |
| rentyellowhammer.com (current WP) | HTTP(s) | `https://rentyellowhammer.com` | 60s | Yes |
| rentyellowhammer.com (Vercel, post-migration) | HTTP(s) | `https://rentyellowhammer.com` | 60s | Yes |

**Step 7.3 — Configure vm-primary Uptime Kuma**

The vm-primary instance (`status.admin.build365.app`) already exists. Add reciprocal monitoring:

1. Open `https://status.admin.build365.app`
2. Add monitors:

| Monitor | Type | URL/Host | Interval | Alert |
|---------|------|----------|----------|-------|
| Uptime Kuma (truenas-hallett) | HTTP(s) | `https://status.officeapps.irbygroup.com` | 60s | Yes |
| TrueNAS Web UI | HTTP(s) | `https://nas.officeapps.irbygroup.com` | 60s | Yes |
| rentyellowhammer.com | HTTP(s) | `https://rentyellowhammer.com` | 60s | Yes |

**Step 7.4 — Watchdog pattern**

```
vm-primary Uptime Kuma ←──monitors──→ truenas-hallett Uptime Kuma
         │                                       │
         ├── monitors rentyellowhammer.com        ├── monitors all vm-primary services
         ├── monitors truenas-hallett services     ├── monitors rentyellowhammer.com
         └── alerts via email/slack               └── alerts via email/slack
```

If either server goes down, the other detects it and alerts you.
Both independently monitor rentyellowhammer.com for maximum coverage.

---

## What You Need to Provide Before Starting

| Item | Status |
|------|--------|
| GoDaddy login (to change nameservers) | **Needed** |
| GoDaddy API key + secret (if scripting migration) | **Needed** (or do manually in dashboard for 1 domain) |
| Cloudflare account + API token | Have it |
| Cloudflare Turnstile site key + secret | **Create in CF dashboard** |
| SendGrid API key | Have it |
| SendGrid verified sender (noreply@rentyellowhammer.com) | **Verify in SendGrid** |
| FUB API key + system key | Have it |
| Neon account + database | **Create (free)** |
| Chatwoot account + website channel | **Create (free cloud)** |
| GitHub repo (irbygroup org) | **Create** |

### Decisions (All Finalized)
| Decision | Resolution |
|----------|-----------|
| Framework | Next.js 15 (future-proof for dynamic features) |
| Gallery URLs | Keep flat (`/courtyard-on-dauphin-gallery/`) — no redirects |
| Forms | Next.js Route Handlers → Neon + SendGrid + FUB (no third-party form service) |
| Spam protection | Cloudflare Turnstile (invisible, free) |
| Chat | Chatwoot cloud (free tier to start) |
| Chatwoot → FUB | Yes — auto-create leads from chat conversations |
| FUB webhook back | Yes — update Neon DB when lead stage changes in FUB |
| UTM tracking | Yes — capture from URL params, store in leads table |
| Analytics events | Yes — form_submitted, chat_opened, call_clicked, gallery_viewed, etc. |
| yellowhammerhospitality.com | Redirect to rentyellowhammer.com via Cloudflare |
| str.rentyellowhammer.com | Drop (dead placeholder) |
| Blog posts | Drop (placeholder content) |
| Error monitoring | Skip Sentry — Vercel logs + fub_error column sufficient for now |
| Email templates | Yes — branded HTML template via SendGrid |
| Uptime monitoring | Uptime Kuma watchdog: truenas-hallett ↔ vm-primary (code committed to gitops) |

---

## Cost Comparison

| | Current (WordPress/SiteGround) | New Stack |
|---|---|---|
| Hosting | ~$15-35/mo (SiteGround) | $0 (Vercel free tier) |
| DNS | GoDaddy (~$10/yr) | $0 (Cloudflare free) |
| Database | Included in WP | $0 (Neon free: 0.5GB) |
| Forms | Gravity Forms ($59/yr) | $0 (built-in) |
| Chat | Tidio ($0-29/mo) | $0 (Chatwoot free tier) |
| Email | N/A | $0 (SendGrid free: 100/day) |
| CRM | FUB (existing) | FUB (existing, no change) |
| Monitoring | None | $0 (Uptime Kuma, self-hosted) |
| **Total** | **~$25-50/mo** | **$0/mo** |

---

## What You Gain

| | Before | After |
|---|---|---|
| Page load | 3-5s | < 1s |
| Lighthouse | ~60-70 | 95+ |
| Security | WP plugins, PHP vulns | Static + serverless, no attack surface |
| Maintenance | Plugin/PHP/WP updates weekly | Zero — git push |
| Lead pipeline | Manual (Gravity Forms email → check FUB) | Automatic (form → DB + email + FUB in <2s) |
| Chat | Tidio (proprietary) | Chatwoot (open-source, you own the data) |
| DNS | GoDaddy (slow, no CDN) | Cloudflare (global CDN, DDoS protection, edge rules) |
| Uptime | 99.9% | 99.99% (Vercel edge) |
| Monitoring | None | Uptime Kuma watchdog (vm-primary ↔ truenas-hallett) |
| Vendor lock-in | WordPress + SiteGround + Tidio + Gravity Forms | Everything open-source or easily replaceable |

---

## All Decisions Finalized — Ready to Build

All 7 open questions have been resolved and incorporated into the plan above:
1. UTM tracking — Yes, included
2. FUB webhook back — Yes, included
3. Chatwoot → FUB — Yes, included (Step 4.5)
4. Branded email templates — Yes, included
5. Spam protection — Cloudflare Turnstile (Step 4.3)
6. Custom GA4 events — Yes, included (Step 4.6)
7. Error monitoring — Skip Sentry for now, use Vercel logs + DB error column
8. Uptime monitoring — Uptime Kuma watchdog (truenas-hallett ↔ vm-primary), code committed
