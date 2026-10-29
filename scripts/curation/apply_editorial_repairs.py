import json
import sys
sys.path.insert(0, '.')

from scripts.curation.boys_hebrew_lexicon import HEBREW_BOYS_DATA
from scripts.curation.boys_hebrew_lexicon_part2 import HEBREW_BOYS_PART2
from scripts.curation.girls_etymology_repair import GIRLS_REPAIR_DATA

boys = json.load(open('data/boy-names.json', encoding='utf-8'))
girls = json.load(open('data/girl-names.json', encoding='utf-8'))

all_hebrew_boys = {**HEBREW_BOYS_DATA, **HEBREW_BOYS_PART2}

# 1. PROCESS BOYS
new_boys = []
for b in boys:
    # A) Replace jochebed with linus
    if b['slug'] == 'jochebed':
        new_boys.append({
            "slug": "linus",
            "name": "Linus",
            "gender": "boy",
            "meaning": "Flax; delicate song",
            "origin": "Greek",
            "biblical": True,
            "reference": "2 Timothy 4:21 — Early Christian companion of Saint Paul in Rome, historically commemorated as an early bishop of the Church.",
            "pronunciation": "LY-nus",
            "variants": ["Linos"],
            "relatedNames": ["Paul", "Timothy"]
        })
        continue

    # B) Update Hebrew generic boys
    if b['name'] in all_hebrew_boys:
        meaning, origin, ref, pron = all_hebrew_boys[b['name']]
        b['meaning'] = meaning
        b['origin'] = origin
        b['reference'] = ref
        b['pronunciation'] = pron
    
    new_boys.append(b)

# 2. PROCESS GIRLS
new_girls = []
for g in girls:
    slug = g['slug']

    # A) Canonicalize jochebed-girl to jochebed
    if slug == 'jochebed-girl':
        new_girls.append({
            "slug": "jochebed",
            "name": "Jochebed",
            "gender": "girl",
            "meaning": "Yahweh is glory; the Lord is glorious",
            "origin": "Hebrew",
            "biblical": True,
            "reference": "Exodus 6:20; Numbers 26:59 — Mother of Moses, Aaron, and Miriam, renowned for her faith in hiding infant Moses.",
            "pronunciation": "JOK-uh-bed",
            "variants": ["Yokheved"],
            "relatedNames": ["Moses", "Aaron", "Miriam"]
        })
        continue

    # B) Replace 7 erroneous male/misattributed entries
    if slug == 'george-girl':
        new_girls.append({
            "slug": "bithiah",
            "name": "Bithiah",
            "gender": "girl",
            "meaning": "Daughter of Yahweh",
            "origin": "Hebrew",
            "biblical": True,
            "reference": "1 Chronicles 4:18 — Egyptian princess who joined the covenant people of Judah.",
            "pronunciation": "bith-EYE-uh",
            "variants": ["Bityah"],
            "relatedNames": ["Mered"]
        })
        continue

    if slug == 'john-girl':
        new_girls.append({
            "slug": "sherah",
            "name": "Sherah",
            "gender": "girl",
            "meaning": "Kinswoman; flesh",
            "origin": "Hebrew",
            "biblical": True,
            "reference": "1 Chronicles 7:24 — Ephraimite woman builder who founded Lower and Upper Beth-horon.",
            "pronunciation": "SHEE-ruh",
            "variants": ["Sheerah"],
            "relatedNames": ["Ephraim"]
        })
        continue

    if slug == 'james-girl':
        new_girls.append({
            "slug": "tryphena",
            "name": "Tryphena",
            "gender": "girl",
            "meaning": "Delicate; refined",
            "origin": "Greek",
            "biblical": True,
            "reference": "Romans 16:12 — Early Christian woman of Rome commended by Paul for her faithful labor in the Lord.",
            "pronunciation": "try-FEE-nuh",
            "variants": ["Triphena"],
            "relatedNames": ["Tryphosa", "Paul"]
        })
        continue

    if slug == 'thomas-girl':
        new_girls.append({
            "slug": "kassia",
            "name": "Kassia",
            "gender": "girl",
            "meaning": "Cassia spice; fragrant cinnamon",
            "origin": "Greek",
            "biblical": False,
            "reference": "Saint Kassia (c. 810–865), celebrated Byzantine Christian hymnographer, poet, and abbess.",
            "pronunciation": "KASH-uh",
            "variants": ["Kassiani", "Casia"],
            "relatedNames": ["Keziah"]
        })
        continue

    if slug == 'joseph-girl':
        new_girls.append({
            "slug": "olympias",
            "name": "Olympias",
            "gender": "girl",
            "meaning": "Heavenly; of Mount Olympus",
            "origin": "Greek",
            "biblical": False,
            "reference": "Saint Olympias the Deaconess (c. 368–408), noblewoman, philanthropist, and friend of Saint John Chrysostom.",
            "pronunciation": "oh-LIM-pee-us",
            "variants": ["Olympia"],
            "relatedNames": ["Chrysostom"]
        })
        continue

    if slug == 'leo-girl':
        new_girls.append({
            "slug": "anthusa",
            "name": "Anthusa",
            "gender": "girl",
            "meaning": "Flowering; blooming",
            "origin": "Greek",
            "biblical": False,
            "reference": "Saint Anthusa of Antioch (4th century), pious Christian mother of Saint John Chrysostom who raised him in the faith.",
            "pronunciation": "an-THOO-suh",
            "variants": ["Anthousa"],
            "relatedNames": ["Olympias"]
        })
        continue

    if slug == 'zelophehad-girl':
        new_girls.append({
            "slug": "emmelia",
            "name": "Emmelia",
            "gender": "girl",
            "meaning": "Harmony; graceful melody",
            "origin": "Greek",
            "biblical": False,
            "reference": "Saint Emmelia of Caesarea (4th century), revered Christian mother of Saint Basil the Great, Saint Gregory of Nyssa, and Saint Macrina.",
            "pronunciation": "eh-MEE-lee-uh",
            "variants": ["Emelia"],
            "relatedNames": ["Basil", "Macrina"]
        })
        continue

    # C) Update generic girls using GIRLS_REPAIR_DATA
    if g['name'] in GIRLS_REPAIR_DATA:
        meaning, origin, ref, pron = GIRLS_REPAIR_DATA[g['name']]
        g['meaning'] = meaning
        g['origin'] = origin
        g['reference'] = ref
        g['pronunciation'] = pron
    else:
        m = g.get('meaning', '')
        if m == 'Noble and gracious; pure of heart':
            g['meaning'] = f"Traditional {g.get('origin', 'Latin')} name; historically signifying grace and nobility of spirit."
        elif m == 'Joyous; beloved daughter of grace':
            g['meaning'] = f"Traditional English pet name and affectionate diminutive, signifying family joy."
        elif m == 'Noble in spirit; blessed':
            g['meaning'] = f"Historical European name passed through Christian families, denoting blessedness."
        elif m == 'Graceful little one; pledged to God':
            g['meaning'] = f"Traditional French diminutive, denoting gentleness and dedicated faith."
        elif m == 'Biblical woman of faith':
            g['meaning'] = f"Old Testament woman recorded in biblical genealogical and narrative accounts."

    new_girls.append(g)

# Sort alphabetically by name
new_boys.sort(key=lambda x: x['name'])
new_girls.sort(key=lambda x: x['name'])

# Filter relatedNames to ensure 100% referential integrity
all_names_set = {b['name'] for b in new_boys} | {g['name'] for g in new_girls}
for item in new_boys + new_girls:
    if item.get('relatedNames'):
        item['relatedNames'] = [r for r in item['relatedNames'] if r in all_names_set]

# Save updated datasets
with open('data/boy-names.json', 'w', encoding='utf-8') as f:
    json.dump(new_boys, f, ensure_ascii=False, indent=2)

with open('data/girl-names.json', 'w', encoding='utf-8') as f:
    json.dump(new_girls, f, ensure_ascii=False, indent=2)

print("Saved updated data/boy-names.json and data/girl-names.json successfully!")
print(f"Boys count: {len(new_boys)}, Girls count: {len(new_girls)}")

