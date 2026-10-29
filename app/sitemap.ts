import type { MetadataRoute } from "next";
import { SITE_URL, allNames, ALPHABET } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${SITE_URL}/christian-boy-names`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/christian-girl-names`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/biblical-names`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/sources`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/donate`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Alphabetical browsing hubs
  const letterPages: MetadataRoute.Sitemap = ALPHABET.map((l) => ({
    url: `${SITE_URL}/names/letter/${l.toLowerCase()}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Unique origin hubs
  const uniqueOrigins = Array.from(
    new Set(allNames.map((n) => n.origin.toLowerCase()))
  );
  const originPages: MetadataRoute.Sitemap = uniqueOrigins.map((origin) => ({
    url: `${SITE_URL}/origins/${origin}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Individual name pages
  const namePages: MetadataRoute.Sitemap = allNames.map((n) => ({
    url: `${SITE_URL}/names/${n.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...letterPages, ...originPages, ...namePages];
}
