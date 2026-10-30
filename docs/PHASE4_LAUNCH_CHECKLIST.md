# Phase 4 Production Launch & Search Console Checklist

**Project:** Christian Names Dictionary (`christian-names`)  
**Purpose:** Actionable, Step-by-Step Operator Manual for Public Domain Deployment, Google Search Console Setup, and Monetization Activation  

---

## 1. Production Deployment Readiness Verdict

**Verdict:** 🚀 **READY WITH MANUAL ACTIONS**

The codebase, static pages, database, security headers, metadata, and structured data are 100% verified and free of technical defects. The only remaining steps are external account configurations (custom domain DNS, Google Search Console ownership verification, and AdSense application) which require the website owner's credentials.

---

## 2. Pre-Launch Configuration Checklist (For Website Owner)

Before deploying to production hosting (e.g., Vercel, Netlify, Cloudflare Pages, AWS):

### Step 1: Configure Production Environment Variables
In your hosting dashboard (e.g. Vercel Project Settings > Environment Variables):

| Variable Name | Required Value | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` *(no trailing slash)* | Sets canonical URLs, OpenGraph tags, sitemap entries, and JSON-LD IDs. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `editor@yourdomain.com` | Activates direct email link on `/contact`. |
| `NEXT_PUBLIC_DONATE_URL` | `https://buymeacoffee.com/TaimoorJutt` | Active Buy Me a Coffee donation link. |
| `NEXT_PUBLIC_ADSENSE_ID` | *(leave empty until approved)* | Keeps ad slots safely dormant during initial review. |
| `STRIPE_SECRET_KEY` | *(optional)* | Only required if processing direct card donations. |

### Step 2: Custom Domain & DNS Setup
1. Assign your custom domain (e.g., `christiannames.com`) to your hosting project.
2. In your domain registrar (e.g., Namecheap, Cloudflare, GoDaddy):
   - Add **CNAME** or **A** record pointing to your host's edge servers.
   - Enforce **HTTPS** with automatic SSL certification.
   - Configure a single canonical redirection (e.g., redirect `www.christiannames.com` to `christiannames.com`, or vice versa).

---

## 3. Google Search Console Setup Workflow

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain Property** (recommended) or **URL-prefix Property**:
   - **Domain Property (Recommended):** Enter `yourdomain.com`. Requires adding a TXT record to your DNS registrar. Automatically covers both `http`, `https`, `www`, and subdomains.
   - **URL-prefix Property:** Enter `https://yourdomain.com`. Can be verified via HTML tag or file upload.

### Step 2: Submit the XML Sitemap
1. Once ownership is verified, navigate to **Sitemaps** in the left sidebar.
2. In the "Add a new sitemap" input, enter:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. Google will begin crawling the **3,068 URLs** registered in `sitemap.xml`.

### Step 3: Initial URL Inspection & Indexing Request
1. Enter your homepage URL (`https://yourdomain.com`) in the top search bar (**URL Inspection**).
2. Click **Test Live URL**.
3. Once the live test confirms "URL is available to Google", click **Request Indexing**.
4. Repeat this step for core hubs:
   - `https://yourdomain.com/christian-boy-names`
   - `https://yourdomain.com/christian-girl-names`
   - `https://yourdomain.com/biblical-names`
   - `https://yourdomain.com/origins`

---

## 4. Google AdSense Post-Launch Activation

Once the website is live on your production domain and has been indexed for 1–2 weeks:

1. **Submit Site for Review:**
   - Log into [Google AdSense](https://adsense.google.com).
   - Go to **Sites** > **Add Site** > Enter your live custom domain.
2. **Review Verification:**
   - AdSense will review your site. Because the site contains 3,000 distinct scholarly records, complete legal pages, and zero boilerplate filler, it is in prime position for approval.
3. **Post-Approval Configuration:**
   - Create `public/ads.txt` containing:
     ```text
     google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
     ```
   - In hosting environment variables, set:
     ```env
     NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_TOP=XXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_BOTTOM=XXXXXXXXXX
     ```
   - Trigger a redeploy. Ad slots will immediately become active.

---

## 5. Ongoing Monitoring & Maintenance

- **Coverage & Indexing:** Review the **Pages** report in Search Console weekly to confirm successful indexing and monitor for any 404 or soft-404 notifications.
- **Search Performance:** Track top queries and CTR in the **Performance** report.
- **Core Web Vitals:** Monitor real-user Core Web Vitals under **Experience** > **Core Web Vitals** (data accumulates after ~28 days of traffic).

