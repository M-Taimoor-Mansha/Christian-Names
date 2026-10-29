# scripts/curation/builder_boys_3.py
import json

DATA = [
    # K
    ("Kadmiel", "God is the ancient one; God comes before", "Hebrew", True, "Ezra 2:40 — Levite leader who oversaw the rebuilding of the foundation of the Temple.", "KAD-mee-el", [], ["Jeshua", "Zerubbabel"]),
    ("Kareah", "Bald; smooth head", "Hebrew", True, "Jeremiah 40:8 — Father of Johanan and Jonathan, leaders who supported Gedaliah.", "kuh-REE-uh", [], ["Johanan", "Jeremiah"]),
    ("Kedar", "Dark-skinned; mighty fortress; solemn", "Hebrew", True, "Genesis 25:13 — Second son of Ishmael and ancestor of a renowned nomadic desert people.", "KEE-dar", [], ["Ishmael", "Nebaioth"]),
    ("Kemuel", "Raised by God; assembly of God", "Hebrew", True, "Genesis 22:21 — Son of Nahor, brother of Abraham, and father of Aram.", "KEM-yoo-el", [], ["Nahor", "Bethuel"]),
    ("Kenan", "Possessor; buyer; craftsman", "Hebrew", True, "Genesis 5:9 — Patriarch in the line of Seth, son of Enosh and father of Mahalalel.", "KEE-nan", ["Cainan"], ["Enosh", "Mahalalel"]),
    ("Kenaz", "Hunter; possession", "Hebrew", True, "Genesis 36:11 — Grandson of Esau and clan chieftain in Edom; also father of Othniel.", "KEE-naz", [], ["Othniel", "Caleb"]),
    ("Kish", "Bow; power; entangled", "Hebrew", True, "1 Samuel 9:1 — Father of King Saul, a wealthy and influential man of Benjamin.", "KISH", [], ["Saul", "Abner"]),
    ("Kohath", "Assembly; congregation; obedience", "Hebrew", True, "Genesis 46:11 — Second son of Levi and grandfather of Moses and Aaron.", "KOH-hath", [], ["Levi", "Amram"]),
    ("Korah", "Baldness; ice; frost", "Hebrew", True, "Exodus 6:21 — Levite leader whose sons later became renowned temple singers and psalmodists.", "KOH-ruh", [], ["Elkanah", "Heman"]),

    # L
    ("Lael", "Belonging to God; consecrated to God", "Hebrew", True, "Numbers 3:24 — Father of Eliasaph, leader of the Gershonite Levites in the wilderness.", "LAY-el", [], ["Eliasaph", "Gershon"]),
    ("Lamech", "Powerful; vigorous youth", "Hebrew", True, "Genesis 5:28 — Father of Noah who prophesied comfort through his son.", "LAY-mek", [], ["Noah", "Methuselah"]),
    ("Lemuel", "Dedicated to God; belonging to God", "Hebrew", True, "Proverbs 31:1 — Wise king whose mother taught him justice, sobriety, and mercy.", "LEM-yoo-el", [], ["Solomon", "David"]),
    ("Lot", "Covering; veil; concealed", "Hebrew", True, "Genesis 11:27 — Nephew of Abraham who journeyed with him into the land of Canaan.", "LOT", [], ["Abraham", "Haran"]),

    # M
    ("Machir", "Sold; precious acquisition", "Hebrew", True, "Genesis 50:23 — Eldest son of Manasseh whose children were brought up on Joseph's knees.", "MAY-ker", [], ["Manasseh", "Joseph"]),
    ("Mahalaleel", "Praise of God; splendor of the Almighty", "Hebrew", True, "Genesis 5:12 — Patriarch in the line of Seth, father of Jared.", "muh-HAL-uh-lee-el", ["Mahalalel"], ["Kenan", "Jared"]),
    ("Mahli", "Sick; weak; gentle melody", "Hebrew", True, "Exodus 6:19 — Son of Merari and grandson of Levi in priestly service.", "MAH-lye", [], ["Merari", "Mushi"]),
    ("Mahlon", "Sickly; mild song; forgive", "Hebrew", True, "Ruth 1:2 — Firstborn son of Elimelech and Naomi, and first husband of Ruth.", "MAH-lon", [], ["Ruth", "Naomi"]),
    ("Malchiel", "God is my king", "Hebrew", True, "Genesis 46:17 — Grandson of Asher and founder of the Malchielite clan.", "MAL-kee-el", [], ["Beriah", "Asher"]),
    ("Malchiram", "My king is exalted", "Hebrew", True, "1 Chronicles 3:18 — Son of King Jeconiah in the royal Davidic line.", "mal-KYE-rum", [], ["Jeconiah", "Zerubbabel"]),
    ("Malchishua", "King of salvation; royal rescuer", "Hebrew", True, "1 Samuel 14:49 — Son of King Saul who fought bravely on Mount Gilboa.", "mal-kih-SHOO-uh", [], ["Saul", "Jonathan"]),
    ("Malchus", "King; counselor", "Greek", True, "John 18:10 — Servant of the high priest whose severed ear was miraculously healed by Jesus.", "MAL-kus", [], ["Peter", "Jesus"]),
    ("Manoah", "Rest; tranquil peace", "Hebrew", True, "Judges 13:2 — Devout father of Samson to whom the Angel of the Lord appeared.", "muh-NOH-uh", [], ["Samson", "Dan"]),
    ("Medad", "Loving; affection of God", "Hebrew", True, "Numbers 11:26 — Elder in Israel who prophesied in the camp under the Spirit of God.", "MEE-dad", [], ["Eldad", "Moses"]),
    ("Melchizedek", "King of righteousness; king of peace", "Hebrew", True, "Genesis 14:18 — King of Salem and priest of God Most High who blessed Abraham.", "mel-KIZ-eh-dek", ["Melchisedec"], ["Abraham", "David"]),
    ("Menahem", "Comforter; consoler", "Hebrew", True, "2 Kings 15:14 — King of Israel who reigned ten years in Samaria.", "MEN-uh-hem", [], ["Gadi", "Pekahiah"]),
    ("Mephibosheth", "Exterminator of shame; humble heir", "Hebrew", True, "2 Samuel 4:4 — Beloved crippled son of Jonathan to whom David showed steadfast lovingkindness.", "meh-FIB-oh-sheth", ["Merib-Baal"], ["Jonathan", "David"]),
    ("Merari", "Bitter; strong soul; sorrowful", "Hebrew", True, "Genesis 46:11 — Third son of Levi and founder of the Merarite Levites.", "meh-RAH-rye", [], ["Levi", "Mahli"]),
    ("Mered", "Rebellion; boldness", "Hebrew", True, "1 Chronicles 4:17 — Son of Ezrah of the tribe of Judah who married Bithiah.", "MEE-red", [], ["Bithiah", "Judah"]),
    ("Meshach", "Guest of the king; agile servant", "Babylonian", True, "Daniel 1:7 — Hebrew youth Mishael renamed in Babylon, who survived the fiery furnace.", "MEE-shak", ["Mishael"], ["Shadrach", "Abednego"]),
    ("Methuselah", "Man of the dart; his death sends forth", "Hebrew", True, "Genesis 5:21 — Longest-lived patriarch in Scripture, living 969 years.", "meh-THOO-zuh-luh", [], ["Enoch", "Lamech"]),
    ("Micaiah", "Who is like Yahweh?", "Hebrew", True, "1 Kings 22:8 — Faithful prophet who boldly spoke truth before Kings Ahab and Jehoshaphat.", "my-KAY-yuh", ["Micah"], ["Ahab", "Jehoshaphat"]),
    ("Mishael", "Who is what God is?", "Hebrew", True, "Daniel 1:6 — Companion of Daniel who chose fidelity to God over the king's luxuries.", "MISH-ay-el", ["Meshach"], ["Daniel", "Azariah"]),
    ("Mordecai", "Dedicated to God; little man; pure heart", "Persian", True, "Esther 2:5 — Godly cousin and guardian of Queen Esther who delivered the Jewish people.", "MOR-duh-kye", [], ["Esther", "Ahasuerus"]),

    # N
    ("Naaman", "Pleasant; delightful; beautiful", "Hebrew", True, "2 Kings 5:1 — Syrian commander whose leprosy was healed through the prophet Elisha.", "NAY-uh-mun", [], ["Elisha", "Gehazi"]),
    ("Nadab", "Generous; noble giver", "Hebrew", True, "Exodus 6:23 — Eldest son of Aaron the high priest.", "NAY-dab", [], ["Aaron", "Abihu"]),
    ("Nahor", "Snorting; piercing breath; courageous", "Hebrew", True, "Genesis 11:26 — Grandfather and brother of the patriarch Abraham.", "NAY-hor", [], ["Abraham", "Terah"]),
    ("Nahshon", "Enchanter; swift serpent; noble prince", "Hebrew", True, "Exodus 6:23 — Prince of Judah in the wilderness and ancestor of King David.", "NAH-shon", ["Naashon"], ["Aaron", "Salmon"]),
    ("Nahum", "Comfort; consoler", "Hebrew", True, "Nahum 1:1 — Prophet of Elkosh who proclaimed God's justice and deliverance.", "NAY-hum", [], ["Jonah", "Micah"]),
    ("Naphtali", "My struggle; my wrestling", "Hebrew", True, "Genesis 30:8 — Sixth son of Jacob and forefather of the Galilean tribe of Naphtali.", "NAF-tuh-lye", [], ["Jacob", "Bilhah"]),
    ("Neariah", "Servant of Yahweh; child of God", "Hebrew", True, "1 Chronicles 3:22 — Son of Shemaiah in the royal lineage of Judah.", "nee-uh-RYE-uh", [], ["Shemaiah", "David"]),
    ("Nebat", "Beholder; aspect; sprout", "Hebrew", True, "1 Kings 11:26 — Father of Jeroboam I, king of Israel.", "NEE-bat", [], ["Jeroboam", "Solomon"]),
    ("Neriah", "Lamp of Yahweh; light of God", "Hebrew", True, "Jeremiah 32:12 — Father of Baruch the scribe and Seraiah the royal chamberlain.", "neh-RYE-uh", [], ["Baruch", "Jeremiah"]),
    ("Nimshi", "Drawn out; rescued from danger", "Hebrew", True, "1 Kings 19:16 — Grandfather of King Jehu of Israel.", "NIM-shye", [], ["Jehu", "Jehoshaphat"]),
    ("Nun", "Fish; continuity; flourishing life", "Hebrew", True, "Exodus 33:11 — Father of Joshua, the great general and successor of Moses.", "NOON", [], ["Joshua", "Moses"]),

    # O
    ("Obed", "Servant; worshiper of God", "Hebrew", True, "Ruth 4:17 — Son of Boaz and Ruth, father of Jesse and grandfather of King David.", "OH-bed", [], ["Boaz", "Ruth"]),
    ("Obed-Edom", "Servant of Edom; worshiper", "Hebrew", True, "2 Samuel 6:10 — Faithful Gittite in whose home the Ark rested with great blessing.", "oh-bed-EE-dum", [], ["David", "Asaph"]),
    ("Oded", "Restorer; encourager", "Hebrew", True, "2 Chronicles 15:1 — Prophet who encouraged King Asa to reform worship in Judah.", "OH-ded", [], ["Asa", "Azariah"]),
    ("Omar", "Eloquent speaker; high; flourishing", "Hebrew", True, "Genesis 36:11 — Grandson of Esau and clan chieftain in Edom.", "OH-mar", [], ["Esau", "Eliphaz"]),
    ("Omri", "My sheaf; bundle of wheat; servant of Yahweh", "Hebrew", True, "1 Kings 16:16 — King of Israel who founded Samaria as the capital.", "OM-rye", [], ["Ahab", "Jehu"]),
    ("Onan", "Strong; vigorous; active", "Hebrew", True, "Genesis 38:4 — Second son of Judah born in Canaan.", "OH-nan", [], ["Judah", "Er"]),
    ("Oren", "Pine tree; cedar; fragrant wood", "Hebrew", True, "1 Chronicles 2:25 — Son of Jerahmeel of the tribe of Judah.", "OH-ren", [], ["Jerahmeel", "Ram"]),
    ("Othniel", "Lion of God; strength of the Almighty", "Hebrew", True, "Judges 3:9 — First judge of Israel who delivered the people from the king of Mesopotamia.", "OTH-nee-el", [], ["Caleb", "Achsah"]),

    # P
    ("Paltiel", "Deliverance of God; God is my rescue", "Hebrew", True, "Numbers 34:26 — Prince of the tribe of Issachar who helped divide the Promised Land.", "PAL-tee-el", ["Phaltiel"], ["Issachar", "Moses"]),
    ("Pedaiah", "Redemption of Yahweh; ransomed by God", "Hebrew", True, "1 Chronicles 3:18 — Father of Zerubbabel in 1 Chronicles genealogies.", "ped-AY-yuh", [], ["Zerubbabel", "Jeconiah"]),
    ("Pekah", "Open-eyed; watchful; vigilant", "Hebrew", True, "2 Kings 15:25 — King of Israel, son of Remaliah.", "PEE-kuh", [], ["Remaliah", "Ahaz"]),
    ("Pekahiah", "Yahweh has opened the eyes", "Hebrew", True, "2 Kings 15:22 — King of Israel, son of Menahem.", "pek-uh-HYE-uh", [], ["Menahem", "Pekah"]),
    ("Peleg", "Division; canal of living water", "Hebrew", True, "Genesis 10:25 — Patriarch in whose days the earth was divided.", "PEE-leg", [], ["Eber", "Joktan"]),
    ("Perez", "Breach; breaking forth with power", "Hebrew", True, "Genesis 38:29 — Twin son of Judah and Tamar, ancestor of King David and Jesus Christ.", "PEER-ez", ["Pharez"], ["Judah", "Tamar"]),
    ("Phinehas", "Mouth of brass; oracle of bold faith", "Hebrew", True, "Numbers 25:7 — Zealously faithful high priest who made atonement for Israel.", "FIN-ee-us", ["Phineas"], ["Eleazar", "Aaron"]),
    ("Putiel", "Afflicted of God; dedicated to God", "Hebrew", True, "Exodus 6:25 — Father-in-law of Eleazar the high priest.", "PYOO-tee-el", [], ["Eleazar", "Phinehas"]),

    # R
    ("Ram", "High; exalted; majestic", "Hebrew", True, "Ruth 4:19 — Ancestor of King David in the genealogy of Boaz.", "RAM", [], ["Hezron", "Amminadab"]),
    ("Rechab", "Rider; horseman; chariot driver", "Hebrew", True, "Jeremiah 35:6 — Forefather of the Rechabites praised for exemplary obedience.", "REE-kab", [], ["Jonadab", "Jeremiah"]),
    ("Rehoboam", "He broadens the people; sovereign of the nation", "Hebrew", True, "1 Kings 11:43 — Son of Solomon who succeeded him as king of Judah.", "ree-huh-BOH-um", [], ["Solomon", "Abijah"]),
    ("Reu", "Friend; shepherd companion", "Hebrew", True, "Genesis 11:18 — Patriarch in the genealogy from Noah to Abraham.", "REE-yoo", [], ["Peleg", "Serug"]),
    ("Reuel", "Friend of God", "Hebrew", True, "Exodus 2:18 — Priest of Midian and father-in-law of Moses, also called Jethro.", "ROO-el", ["Jethro"], ["Moses", "Zipporah"]),
    ("Rohgah", "Outcry; fearless champion", "Hebrew", True, "1 Chronicles 7:34 — Son of Shamer of the tribe of Asher.", "ROH-guh", [], ["Shamer", "Asher"]),
    ("Rufus", "Red-haired; ruddy; strong", "Latin", True, "Romans 16:13 — Prominent Christian believer chosen in the Lord, son of Simon of Cyrene.", "ROO-fus", [], ["Simon", "Paul"])
]

print(f"Builder 3 defined {len(DATA)} boys names.")
