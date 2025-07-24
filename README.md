# 📚 AniChaLibra

**AniChaLibra** is a lightweight, anime-themed character database built for developers, anime fans, and toolmakers who need structured, categorized character data for various uses (search systems, bots, games, etc).

---

## 🔍 Overview

AniChaLibra organizes anime characters in a clean and structured JSON format that includes:

- 🧑‍🎤 **Character Details**: Name, age, gender, personality, image link...
- 📺 **Anime Info**: Title, Character Role.
- 👨‍👩‍👧 **Relatives**: Includes familial relationships (father, mother, sibling, etc.) if available.

Example:
```json
    {
        "id": "1",
        "character": {
            "name": "Keigo Asano",
            "age": "27",
            "birth": "April-1",
            "gender": "Male",
            "race": "Human",
            "status": "Alive",
            "appearances": "Chapter 213",
            "married": "no",
            "personality": "Keigo is usually a goofy and extremely hyper-active boy, often using overly-dramatic movements and words to act out his feelings. He enjoys watching fireworks, playing role-playing games, and going to beach parties.",
            "image": "https://th.bing.com/th/id/OIP.NjJ2tQeJrkK0u98BioVMFwAAAA?w=261&h=300&c=10&rs=1&bgcl=fffffe&r=0&o=6&pid=23.1"
        },
        "anime": {
            "name": "Bleach",
            "quote": "Did you guys hear a truck crashed into Ichigo's house!!!",
            "role": "Supporting"
        },
        "relatives": {
            "sister": "Mizuho Asano"
        }
    },
```
## 🗂️ File Structure

```txt
📁 data/
└── animeChDB.json   # All characters stored in a unified JSON file
Characters are not stored in separate files — everything is centralized in animeChDB.json.
```

## ⚙️ How to Use
You can fetch and parse the character data in your applications, Discord bots, or web interfaces.

Example using fetch in JavaScript:

```js
fetch('https://raw.githubusercontent.com/serin3/AniChaLibra/master/data/animeChDB.json')
  .then(res => res.json())
  .then(data => {
    const keigo = data.find(c => c.name.includes("Keigo"));
    console.log(keigo);
  });
```

---


## 📌 Notes
relatives will only be included when the character has known relatives.

All entries are manually curated to ensure quality and consistency.

The `id` is a unique integer for every character.

Character images are externally hosted (mostly from official sources or anime galleries).