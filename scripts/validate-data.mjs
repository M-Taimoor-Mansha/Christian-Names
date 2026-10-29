import fs from "node:fs";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const files = [
  { path: "data/boy-names.json", gender: "boy", target: 1500 },
  { path: "data/girl-names.json", gender: "girl", target: 1500 },
];

const seenSlugs = new Map();
const seenNamesPerGender = { boy: new Set(), girl: new Set() };
const allNamesSet = new Set();
const meaningFrequencies = new Map();
let pronunciationCount = { boy: 0, girl: 0 };
let errors = 0;

const fail = (msg) => {
  errors++;
  console.error("ERROR:", msg);
};

// 1. Structural and field validation
for (const { path, gender, target } of files) {
  const list = read(path);
  console.log(`${path}: ${list.length} names (target: ${target})`);

  if (list.length !== target) {
    fail(`${path}: expected exactly ${target} names, found ${list.length}`);
  }

  for (const n of list) {
    const label = `${path} -> ${n.name ?? "(no name)"}`;

    for (const f of ["slug", "name", "gender", "meaning", "origin", "reference"]) {
      if (typeof n[f] !== "string" || !n[f].trim()) fail(`${label}: missing or empty "${f}"`);
    }

    if (typeof n.biblical !== "boolean") fail(`${label}: "biblical" must be true/false`);
    if (n.gender !== gender) fail(`${label}: gender should be "${gender}"`);

    if (n.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n.slug)) {
      fail(`${label}: bad slug "${n.slug}" (use lowercase letters, numbers, hyphens)`);
    }

    // Duplicate slug check across both categories
    if (n.slug) {
      if (seenSlugs.has(n.slug)) {
        fail(`${label}: duplicate slug "${n.slug}" (also in ${seenSlugs.get(n.slug)})`);
      } else {
        seenSlugs.set(n.slug, path);
      }
    }

    // Duplicate name within same gender check
    if (n.name) {
      const lower = n.name.trim().toLowerCase();
      if (seenNamesPerGender[gender].has(lower)) {
        fail(`${label}: duplicate name "${n.name}" within ${gender} category`);
      } else {
        seenNamesPerGender[gender].add(lower);
      }
      allNamesSet.add(n.name.trim());
    }

    // Pronunciation tracking
    if (typeof n.pronunciation === "string" && n.pronunciation.trim()) {
      pronunciationCount[gender]++;
    }

    // Meaning frequency tracking for boilerplate detection
    if (typeof n.meaning === "string" && n.meaning.trim()) {
      const m = n.meaning.trim();
      meaningFrequencies.set(m, (meaningFrequencies.get(m) || 0) + 1);
    }
  }
}

// 2. Referential integrity check for relatedNames
for (const { path } of files) {
  const list = read(path);
  for (const n of list) {
    if (Array.isArray(n.relatedNames)) {
      for (const rel of n.relatedNames) {
        if (!allNamesSet.has(rel)) {
          fail(`${path} -> ${n.name}: relatedName "${rel}" not found in dataset`);
        }
      }
    }
  }
}

// 3. Search index consistency check
if (fs.existsSync("public/search-index.json")) {
  const searchIndex = read("public/search-index.json");
  if (searchIndex.length !== seenSlugs.size) {
    fail(`public/search-index.json count (${searchIndex.length}) does not match dataset size (${seenSlugs.size})`);
  }
} else {
  console.warn("WARNING: public/search-index.json not found (will be built during prebuild)");
}

// 4. Pronunciation coverage reporting
const totalPron = pronunciationCount.boy + pronunciationCount.girl;
const totalRecords = seenSlugs.size;
console.log("\n--- Pronunciation Coverage ---");
console.log(`Boys with pronunciation:  ${pronunciationCount.boy} / 1500 (${((pronunciationCount.boy / 1500) * 100).toFixed(1)}%)`);
console.log(`Girls with pronunciation: ${pronunciationCount.girl} / 1500 (${((pronunciationCount.girl / 1500) * 100).toFixed(1)}%)`);
console.log(`Total coverage:           ${totalPron} / ${totalRecords} (${((totalPron / totalRecords) * 100).toFixed(1)}%)`);

// 5. Editorial boilerplate detector report (informing, not failing)
console.log("\n--- Editorial Boilerplate Detection ---");
const highFreq = Array.from(meaningFrequencies.entries())
  .filter(([, count]) => count > 15)
  .sort((a, b) => b[1] - a[1]);

if (highFreq.length > 0) {
  console.log(`Notice: ${highFreq.length} definition(s) appear with frequency > 15:`);
  for (const [m, count] of highFreq) {
    console.log(`  [${count}x]: "${m}"`);
  }
} else {
  console.log("No high-frequency repetitive definitions detected (all <= 15).");
}

if (errors) {
  console.error(`\nValidation FAILED with ${errors} error(s).`);
  process.exit(1);
}

console.log(`\nAll validation passed successfully! Exactly ${seenSlugs.size} unique names (1,500 boys + 1,500 girls).`);
