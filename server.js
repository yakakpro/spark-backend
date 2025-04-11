
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const DB_PATH = "./db.json";

app.use(cors());
app.use(express.json());

// Завантажити всі резонанси
app.get("/api/resonance", (req, res) => {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    res.json(JSON.parse(data));
  } catch {
    res.json([]);
  }
});

// Додати новий резонанс
app.post("/api/resonance", (req, res) => {
  try {
    const current = fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH, "utf8")) : [];
    const newEntry = {
      message: req.body.message || "",
      time: new Date().toISOString(),
    };
    current.push(newEntry);
    fs.writeFileSync(DB_PATH, JSON.stringify(current, null, 2));
    res.json({ status: "ok", saved: newEntry });
  } catch (err) {
    res.status(500).json({ error: "failed to save" });
  }
});

app.listen(PORT, () => {
  console.log(`✨ Spark Resonance backend запущено на порту ${PORT}`);
});
