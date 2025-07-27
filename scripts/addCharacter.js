const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/pageStyle', express.static(path.join(__dirname, '..', 'pageStyle')));

app.get('/add-character', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'char-uploader.html'));
});

const dbPath = path.join(__dirname, '..', 'data', 'animeChDB.json');

function loadDatabase() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (err) {
    return [];
  }
}

function generateSequentialId(db) {
  if (db.length === 0) return '1';
  
  const numericIds = db
    .map(entry => parseInt(entry.id))
    .filter(id => !isNaN(id));
  
  const maxId = Math.max(...numericIds, 0);
  return (maxId + 1).toString();
}

app.post('/add-character', (req, res) => {
  const data = req.body;

  const db = loadDatabase();

  const inputName = (data.character?.name_en || '').toLowerCase().trim().replace(/\s+/g, ' ');

const isDuplicate = db.some(entry => {
  const existingName = (entry.character?.name_en || '').toLowerCase().trim().replace(/\s+/g, ' ');
  return existingName === inputName;
});

if (isDuplicate) {
  return res.status(400).json({ success: false, message: 'This character is already in the list' });
}

  const id = generateSequentialId(db);

  const cleaned = {
    id,
    character: {},
    anime: {},
    relatives: {}
  };

  ['character', 'anime', 'relatives'].forEach(section => {
    for (const key in data[section]) {
      const value = data[section][key];
      if (value && value.trim() !== '') {
        cleaned[section][key] = value.trim();
      }
    }
  });

  db.push(cleaned);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

  res.json({ success: true, message: 'New character successfully saved', id });
});

app.listen(PORT, () => {
  console.log(`✅ Server Live on: http://localhost:${PORT}/add-character`);
});
