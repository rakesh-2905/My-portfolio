const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse urlencoded form bodies
app.use(express.urlencoded({ extended: true }));
// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

const SUB_FILE = path.join(__dirname, 'submissions.json');

// Ensure submissions file exists
try {
  if (!fs.existsSync(SUB_FILE)) fs.writeFileSync(SUB_FILE, '[]', 'utf8');
} catch (err) {
  console.error('Could not create submissions file:', err);
}

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const entry = {
    id: Date.now(),
    name, email, message,
    receivedAt: new Date().toISOString()
  };
  try {
    const raw = fs.readFileSync(SUB_FILE, 'utf8') || '[]';
    const arr = JSON.parse(raw);
    arr.push(entry);
    fs.writeFileSync(SUB_FILE, JSON.stringify(arr, null, 2), 'utf8');
    return res.status(200).json({ ok: true, entryId: entry.id });
  } catch (err) {
    console.error('Write error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Small API to fetch submissions (for testing)
app.get('/submissions', (req, res) => {
  try {
    const raw = fs.readFileSync(SUB_FILE, 'utf8') || '[]';
    return res.json(JSON.parse(raw));
  } catch (err) {
    return res.status(500).json({ error: 'Cannot read submissions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
