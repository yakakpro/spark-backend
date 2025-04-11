
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = 'resonance-log.json';

app.use(cors());
app.use(express.json());

app.get('/api/resonance', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/resonance', (req, res) => {
  try {
    const incoming = req.body;
    const old = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) : [];
    const updated = [...old, { ...incoming, time: new Date().toISOString() }];
    fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2));
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save resonance.' });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 Spark backend listening on port ${PORT}`);
});
