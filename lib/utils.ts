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
  return getNamesByGender(current.gender)
    .filter((n) => n.slug !== current.slug)
    .filter((n) => n.origin === current.origin || n.name[0] === current.name[0])
    .slice(0, limit);
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";