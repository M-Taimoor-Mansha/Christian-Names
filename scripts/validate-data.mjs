import fs from "node:fs";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const files = [
  { path: "data/boy-names.json", gender: "boy", target: 1500 },
  { path: "data/girl-names.json", gender: "girl", target: 1500 },
];

const seen = new Map();
let errors = 0;
const fail = (msg) => {
  errors++;
  console.error("ERROR:", msg);
};

for (const { path, gender, target } of files) {
  const list = read(path);
  console.log(`${path}: ${list.length} names (target: ${target})`);

  if (list.length !== target) {
    fail(`${path}: expected exactly ${target} names, found ${list.length}`);
  }

  for (const n of list) {
    const label = `${path} -> ${n.name ?? "(no name)"}`;

    for (const f of ["slug", "name", "gender", "meaning", "origin", "reference"]) {
      if (typeof n[f] !== "string" || !n[f].trim()) fail(`${label}: missing "${f}"`);
    }
    if (typeof n.biblical !== "boolean") fail(`${label}: "biblical" must be true/false`);
    if (n.gender !== gender) fail(`${label}: gender should be "${gender}"`);
    if (n.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n.slug)) {
      fail(`${label}: bad slug "${n.slug}" (use lowercase letters, numbers, hyphens)`);
    }
    if (n.slug) {
      if (seen.has(n.slug)) fail(`${label}: duplicate slug "${n.slug}" (also in ${seen.get(n.slug)})`);
      else seen.set(n.slug, path);
    }
  }
}

if (errors) {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}

console.log(`\nAll validation passed successfully! Exactly ${seen.size} unique names (1,500 boys + 1,500 girls).`);
