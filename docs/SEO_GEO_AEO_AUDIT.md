# SEO, GEO, and AEO Audit & Strategy

**Project:** Christian Names Dictionary  
**Date:** October 29, 2026  
**Focus:** Technical Crawlability, On-Page SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and Structured Data  

---

## 1. Technical SEO Audit

### Current Status vs Required Standard

| Area | Current State | Defect / Opportunity | Target Fix |
|---|---|---|---|
| **Crawlable Tree** | Only `/`, `/christian-boy-names`, `/christian-girl-names`, and 300 name pages. | Missing alphabetical hubs (`/names/letter/[letter]`), biblical hubs (`/biblical-names`), and origin hubs (`/origins/[origin]`). | Create static category and letter hubs to provide rich internal link equity and crawl paths. |
| **Robots.txt** | Disallows `/api/`, links to `sitemap.xml`. | Working correctly; domain defaults to `http://localhost:3000` if `NEXT_PUBLIC_SITE_URL` unset. | Keep clean and ensure production canonical URL resolution. |
| **XML Sitemap** | Statically lists only 300 names and basic pages. | Needs to list all 3,000 name pages and all new curated category hubs. | Generate dynamic sitemap entries covering all 3,000 names and category routes. |
| **Canonicals** | Self-referencing relative canonicals via `metadataBase`. | Correct architecture; relies on `SITE_URL`. | Preserve and extend across all new pages and letter hubs. |
| **Rendering Strategy** | Next.js SSG (`generateStaticParams`). | Fast, crawlable, pre-rendered HTML for search bots. | Retain SSG for all 3,000 name pages and collection routes. |
| **Internal Linking** | Basic "See also" and Prev/Next links on name detail. | Missing contextual breadcrumbs to alphabetical and origin hubs. | Add multi-level breadcrumbs and cross-links by origin, theme, and first letter. |

---

## 2. Structured Data (Schema.org) Audit

### Current Findings
1. **Article Schema on Name Pages:** Name pages currently declare `@type: "Article"` with publisher `Organization`. While syntactically valid, a dictionary entry is more accurately represented as a lexical or definitional resource (`WebPage`, `ItemPage`, or `DefinedTerm`).
2. **Missing SearchAction on Homepage:** The homepage lacks a `WebSite` schema declaring a search action (`potentialAction: SearchAction`), which aids Google in presenting a site search box in SERPs.
3. **Breadcrumbs:** Current `BreadcrumbList` has only 3 levels (Home > Boy/Girl > Name). Introducing letter hubs and origin hubs enables richer breadcrumbs: `Home > Boy Names > Letter A > Aaron`.

### Target Schema Architecture
- **Homepage (`/`):**
  ```json
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Christian Names",
    "url": "https://christiannames.org",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://christiannames.org/names/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  ```
- **Name Detail Page (`/names/[slug]`):**
  ```json
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://christiannames.org/names/aaron#webpage",
        "url": "https://christiannames.org/names/aaron",
        "name": "Aaron - Christian Name Meaning, Origin & Bible Reference",
        "description": "Meaning, biblical significance, and origin of the name Aaron.",
        "breadcrumb": { "@id": "https://christiannames.org/names/aaron#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://christiannames.org/names/aaron#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christiannames.org" },
          { "@type": "ListItem", "position": 2, "name": "Boy Names", "item": "https://christiannames.org/christian-boy-names" },
          { "@type": "ListItem", "position": 3, "name": "Aaron", "item": "https://christiannames.org/names/aaron" }
        ]
      }
    ]
  }
  ```

---

## 3. Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO)

Modern search engines and AI answer engines (ChatGPT, Google Gemini/AI Overviews, Perplexity) reward direct, verifiable, authoritative answers that answer natural language questions.

### Editorial Guidelines for Name Detail Pages
1. **Direct Answer Paragraph:** Provide an explicit summary within the first 60 words answering:
   - What does the name mean?
   - What is its linguistic origin?
   - Is it in the Bible, and who bore the name?
2. **Natural Question Headings (AEO-optimized):**
   - *What does the name [Name] mean?*
   - *Where does the name [Name] originate?*
   - *Is [Name] in the Bible?*
   - *Who was [Name] in biblical history?*
   - *What are common variants of [Name]?*
3. **Citable Scripture Citations:**
   - Always cite Book, Chapter, and Verse (e.g., `Exodus 4:14`, `Luke 1:13`, `1 Samuel 25:3`).
   - Quote or explain the exact role of the biblical figure without hyperbole.
4. **Distinction Between Biblical and Traditional Christian Names:**
   - Clearly delineate between direct biblical figures (e.g., *David*, *Peter*, *Mary*) and traditional/historical Christian names of saints, martyrs, or virtue names (e.g., *Faith*, *Grace*, *Francis*, *Christopher*).
   - Never invent biblical appearances for post-biblical or Germanic names.

