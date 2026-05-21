# 📚 AniChaLibra

**AniChaLibra** is a lightweight, anime-themed character database built for developers, anime fans, and toolmakers who need structured, categorized character data for various uses (search systems, bots, games, etc).

---

## 🔍 Overview

AniChaLibra organizes anime characters in a clean and structured JSON format that includes:

- 🧑‍🎤 **Character Details**: Name, Personality, image link
- 📜 **Biological Information**: Age, Birth, Status...
- 📺 **Anime Info**: Title, Character Role.
- 👨‍👩‍👧 **Relationships**: Includes familial relationships (father, mother, sibling, etc.) if available.

Example:
```json
    {
    "id": "23",
    "character": {
      "name": "Rimuru Tempest",
      "personality": "Rimuru is an eccentric and childish person by nature but this shouldn't be mistaken for immaturity and naivety. Underneath the surface, Rimuru is constantly analyzing, planning, and weighing the pros and cons of their actions, taking the smart move in the long term over more rash and emotional decisions",
      "image": "https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/b/bf/Demon_Lord_Rimuru_Anime.png/revision/latest?cb=20220307101435"
    },
    "biologicalInfo": {
      "age": "5",
      "birth": "Feb-20",
      "gender": "Non-binary",
      "race": "Slime",
      "status": "Alive",
      "martial_status": "single"
    },
    "anime": {
      "name": "Tensei Shitara Slime Datta Ken",
      "quote": "It's simple. I want to create a world where life is as convenient as I wish it to be. A comfortable world where everyone can laugh and enjoy their lives as much as possible. That's what I truly and honestly want",
      "appearances": "Chapter 1",
      "role": "Main"
    },
    "relationships": {
      "daughter": "Shinsha",
      "partner": "Ciel"
    }
  }
```

## 🆕 Add Character Feature (v5.0.0)

✨ New in version 5.0.0: You can now add your own characters to the local database using the new Add Character panel!

## ✅ Features

Simple web form for submitting a new character.

Automatically prevents duplicates (by checking names).

Instant integration into the local JSON file.

Includes client-side validation and feedback messages.

## 🔒 Note

This feature is available only in local environments or via authorized tools. It doesn't affect the remote GitHub version unless synced manually.

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

---

## ➕ Add Character Panel

To use the character-adding panel:

1. Clone or download the project locally.
2. Ensure you have `animeChDB.json` inside the correct `/data` directory.
3. Run a local development server (e.g. with **Live Server**, Express, or similar).
4. Open the **Add Character** page from the interface.
5. Submissions will directly modify your local `animeChDB.json`.

> ⚠️ Changes will not persist or work unless a proper local environment is active
