
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const STORAGE_DIR = path.join(__dirname, '../data/storage');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
    // Initialize with empty files if they don't exist
    ['heroes.json', 'warHeroes.json', 'places.json'].forEach(file => {
        fs.writeFileSync(path.join(STORAGE_DIR, file), '[]');
    });
}

// Get data
app.get('/api/data/:filename', (req, res) => {
    const filename = req.params.filename + '.json';
    const filePath = path.join(STORAGE_DIR, filename);

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.json([]);
        }
    } else {
        res.json([]);
    }
});

// Save data
app.post('/api/data/:filename', (req, res) => {
    const filename = req.params.filename + '.json';
    const filePath = path.join(STORAGE_DIR, filename);
    const data = req.body;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
