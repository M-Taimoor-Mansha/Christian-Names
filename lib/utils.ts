import boys from "@/data/boy-names.json";
import girls from "@/data/girl-names.json";
import type { BabyName, Gender } from "./types";

export * from "./types";

export const boyNames = boys as BabyName[];
export const girlNames = girls as BabyName[];
export const allNames: BabyName[] = [...boyNames, ...girlNames];

export function getNamesByGender(gender: Gender): BabyName[] {
  return gender === "boy" ? boyNames : girlNames;
}

export function getNameBySlug(slug: string): BabyName | undefined {
  return allNames.find((n) => n.slug === slug);
}

export function filterByLetter(list: BabyName[], letter: string): BabyName[] {
  if (!letter || letter.toUpperCase() === "ALL") return list;
  return list.filter((n) =>
    n.name.toUpperCase().startsWith(letter.toUpperCase())
  );
}

export function getRelatedNames(current: BabyName, limit = 6): BabyName[] {
  // If relatedNames are explicitly listed, prefer them
  if (current.relatedNames && current.relatedNames.length > 0) {
    const explicit = allNames.filter((n) =>
      current.relatedNames?.includes(n.name) && n.slug !== current.slug
    );
    if (explicit.length > 0) return explicit.slice(0, limit);
  }

  return getNamesByGender(current.gender)
    .filter((n) => n.slug !== current.slug)
    .filter((n) => n.origin === current.origin || n.name[0] === current.name[0])
    .slice(0, limit);
}

export function getBiblicalNames(limit?: number): BabyName[] {
  const list = allNames.filter((n) => n.biblical);
  return limit ? list.slice(0, limit) : list;
}

export function getNamesByOrigin(origin: string, limit?: number): BabyName[] {
  const norm = origin.trim().toLowerCase();
  const list = allNames.filter((n) => n.origin.toLowerCase() === norm);
  return limit ? list.slice(0, limit) : list;
}

export function sanitizeUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
