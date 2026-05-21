const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/pageStyle', express.static(path.join(__dirname, '..', 'pageStyle')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'scripts')));
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/add-character', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'char-uploader.html'));
});

const dbPath = path.join(__dirname, '..', 'data', 'animeChDB.json');

function loadDatabase() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (err) {
    console.error('Database load error:', err);
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
  try {
    const data = req.body;
    console.log('📨 طلب جديد استقبل:', JSON.stringify(data).slice(0, 100) + '...');

    const db = loadDatabase();

    const inputName = (data.character?.name || '').toLowerCase().trim().replace(/\s+/g, ' ');

    if (!inputName) {
      console.log('❌ خطأ: اسم الشخصية مطلوب');
      return res.status(400).json({ success: false, message: 'Character name is required' });
    }

    const isDuplicate = db.some(entry => {
      const existingName = (entry.character?.name || '').toLowerCase().trim().replace(/\s+/g, ' ');
      return existingName === inputName;
    });

    if (isDuplicate) {
      console.log('⚠️ تحذير: هذه الشخصية موجودة بالفعل:', inputName);
      return res.status(400).json({ success: false, message: 'This character is already in the list' });
    }

    const id = generateSequentialId(db);

    const cleaned = {
      id,
      character: {},
      biologicalInfo: {},
      anime: {},
      relationships: {}
    };

    if (data.character) {
      for (const key in data.character) {
        const value = data.character[key];
        if (value && typeof value === 'string' && value.trim() !== '') {
          cleaned.character[key] = value.trim();
        }
      }
    }

    if (data.biologicalInfo) {
      for (const key in data.biologicalInfo) {
        const value = data.biologicalInfo[key];
        if (value && typeof value === 'string' && value.trim() !== '') {
          cleaned.biologicalInfo[key] = value.trim();
        }
      }
    }

    if (data.anime) {
      for (const key in data.anime) {
        const value = data.anime[key];
        if (value && typeof value === 'string' && value.trim() !== '') {
          cleaned.anime[key] = value.trim();
        }
      }
    }

    if (data.relationships) {
      for (const key in data.relationships) {
        const value = data.relationships[key];
        if (value && typeof value === 'string' && value.trim() !== '') {
          cleaned.relationships[key] = value.trim();
        }
      }
    }

    db.push(cleaned);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

    console.log('✅ تمت إضافة شخصية جديدة برقم ID:', id);
    res.json({ success: true, message: 'New character successfully saved', id });
  } catch (err) {
    console.error('❌ خطأ في الخادم:', err);
    res.status(500).json({ success: false, message: 'Server error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 🚀 Server Live on: http://localhost:${PORT}/`);
  console.log(`📝 Search page: http://localhost:${PORT}/search`);
  console.log(`📝 Add character page: http://localhost:${PORT}/add-character`);
  console.log(`📝 API endpoint: POST http://localhost:${PORT}/add-character`);
  console.log(`💾 Database: ${dbPath}`);
});
