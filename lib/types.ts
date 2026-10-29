export type Gender = "boy" | "girl";

export interface BabyName {
  slug: string;
  name: string;
  gender: Gender;
  meaning: string;
  origin: string;
  biblical: boolean;
  reference?: string;
  pronunciation?: string;
  variants?: string[];
  relatedNames?: string[];
  editorialNotes?: string;
  sources?: string[];
}

export type SearchItem = Pick<BabyName, "slug" | "name" | "gender" | "meaning">;

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const fuseOptions = {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "meaning", weight: 0.3 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
};
