# Christian Names Dictionary

A scholarly, globally accessible, and comprehensive Christian baby names reference dictionary. Built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**.

Christian Names provides parents, scholars, pastors, and researchers with authentic name etymologies, linguistic origins, verified biblical citations, and historical context across Christian traditions worldwide.

---

## 1. Key Features

- **100% Free & Open Access:** No accounts, passwords, subscriptions, or paywalls.
- **3,000-Name Validated Database:** Exactly 1,500 boys' names and 1,500 girls' names with zero duplicate slugs.
- **Instant Client-Side Search:** Sub-millisecond fuzzy search powered by Fuse.js and pre-indexed static JSON.
- **Scripture Citations:** Verified chapter-and-verse biblical references for all canonical names.
- **Linguistic Classification:** Clear distinction between Hebrew, Aramaic, Greek, Latin, Celtic, Anglo-Saxon, and virtue names.
- **A–Z & Thematic Discovery:** Comprehensive browse-by-letter hubs (`/names/letter/[letter]`), biblical hubs (`/biblical-names`), and origin hubs (`/origins/[origin]`).
- **Interactive Utility:** One-click link copying and native Web Share API integration on mobile.
- **Monetization & Donation Readiness:** Configurable Google AdSense slots (isolated from editorial content) and tasteful voluntary support integration (`/donate`).
- **Technical SEO, GEO & AEO:** Complete JSON-LD structured data (`WebSite`, `WebPage`, `BreadcrumbList`), dynamic XML sitemap, self-referencing canonicals, and natural-language Q&A headings.
- **Accessibility:** WCAG 2.2 AA compliant typography, keyboard navigation, focus indicators, and screen-reader announcements.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.4.3 (App Router with Turbopack) |
| **UI Library** | React 19.3.0 / React DOM 19.3.0 |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/turbopack`) |
| **Typography** | EB Garamond (`next/font/google`) |
| **Icons** | Lucide React |
| **Search Engine** | Fuse.js 7.5.0 (Client-side with static JSON index) |
| **Linting** | ESLint 9 (`eslint-config-next`) |

---

## 3. Local Development Setup

### Prerequisites
- Node.js `v20+` (or `v26+`)
- npm `v10+`

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/M-Taimoor-Mansha/Christian-Names.git
cd christian-names
npm install
```

### Environment Configuration
Copy or edit `.env.local`:
```bash
# Production domain (e.g. https://christiannames.org)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google AdSense Publisher ID (e.g. ca-pub-XXXXXXXXXXXXXXXX)
NEXT_PUBLIC_ADSENSE_ID=

# Ad Unit Slot IDs (optional; leave empty during development)
NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_BOTTOM=

# Voluntary Donation Link (e.g. https://buymeacoffee.com/YourUsername)
NEXT_PUBLIC_DONATE_URL=https://buymeacoffee.com/TaimoorJutt

# Optional Stripe Secret Key for direct card checkouts
STRIPE_SECRET_KEY=

# Public Contact Email
NEXT_PUBLIC_CONTACT_EMAIL=
```

### Running Locally
```bash
# Automatically builds search index and launches dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Name Dataset Structure & Counting Rules

The database is partitioned into two primary static JSON files:
- `data/boy-names.json` (Target: exactly 1,500 distinct entries)
- `data/girl-names.json` (Target: exactly 1,500 distinct entries)

### Record Schema
```typescript
interface BabyName {
  slug: string;             // Unique URL-safe identifier (e.g., "aaron")
  name: string;             // Capitalized canonical headword (e.g., "Aaron")
  gender: "boy" | "girl";   // Primary gender category
  meaning: string;          // Accurate etymological definition
  origin: string;           // Language root (Hebrew, Greek, Latin, etc.)
  biblical: boolean;        // True if found in biblical canon
  reference?: string;       // Scripture chapter:verse or historical context
  pronunciation?: string;   // Phonetic pronunciation guide
  variants?: string[];      // Spelling variations and international equivalents
  relatedNames?: string[];  // Cognate or theologically related names
  editorialNotes?: string;  // Scholarly commentary or disputed interpretations
  sources?: string[];       // Reference lexicons or publications
}
```

### Counting & Validation Rules
1. Every name must have a non-empty `slug`, `name`, `gender`, `meaning`, `origin`, and `reference`.
2. Slugs must match the regex `/^[a-z0-9]+(-[a-z0-9]+)*$/`.
3. Slugs must be globally unique across both boys' and girls' files.
4. Duplicate names (case-insensitive normalized) are forbidden within each gender dataset.

---

## 5. Adding & Verifying New Names

1. Add the new record to `data/boy-names.json` or `data/girl-names.json`.
2. Run data validation:
   ```bash
   npm run validate
   ```
3. Rebuild the search index:
   ```bash
   node scripts/build-search-index.mjs
   ```

---

## 6. Testing & Quality Assurance

Run the complete QA suite before deploying:

```bash
# Validate data integrity and schema
npm run validate

# Run ESLint checks
npm run lint

# Run TypeScript compiler checks
npx tsc --noEmit

# Run full production build with static page generation
npm run build
```

---

## 7. Production Deployment & Indexing

### Deployment Platforms
The project is optimized for deployment on Vercel, AWS Amplify, Netlify, or self-hosted Node/Docker environments:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Runtime:** `20.x` or later

### Domain & Canonical Configuration
In your production environment variables (e.g., on Vercel), set:
```text
NEXT_PUBLIC_SITE_URL=https://christiannames.org
```
All canonical URLs, OpenGraph tags, sitemaps (`/sitemap.xml`), and `robots.txt` will automatically resolve to your production domain.

---

## 8. AdSense & Monetization Setup

### Configuring Google AdSense
1. Obtain approval from Google AdSense for your custom production domain.
2. In your production environment settings, set:
   - `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX`
   - `NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_TOP=1234567890`
   - `NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_BOTTOM=0987654321`
3. Place your authorized `ads.txt` file in `public/ads.txt`:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. *Note:* If slot variables are empty or publisher ID is unconfigured, the application gracefully suppresses ad tags to prevent layout shifts and policy violations.

---

## 9. Voluntary Donations Setup

1. Configure your voluntary support link in `.env.local` or environment settings:
   ```text
   NEXT_PUBLIC_DONATE_URL=https://buymeacoffee.com/YourUsername
   ```
2. The site automatically displays support buttons in the header navigation and on `/donate`.
3. If no donation URL is configured, the `/donate` page displays a tasteful note asking visitors to share the resource.

---

## 10. License & Editorial Copyright

- **Code:** MIT License.
- **Editorial Text & Lexicon Content:** &copy; Christian Names. Content is provided freely for personal reference, research, and non-commercial educational use. Large-scale automated scraping or republication is prohibited without prior written consent.
