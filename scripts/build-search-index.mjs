import fs from "node:fs";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const all = [...read("data/boy-names.json"), ...read("data/girl-names.json")];

const slim = all.map(({ slug, name, gender, meaning }) => ({
  slug,
  name,
  gender,
  meaning,
}));

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/search-index.json", JSON.stringify(slim));
console.log(`Search index built: ${slim.length} names`);
