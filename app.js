const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve frontend files

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'frontend/assets'); // Save images in the 'assets' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// Connect to the database
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// POST Route for creating a new item
app.post('/items', upload.single('item-image'), (req, res) => {
    const { title, description, price, category, location } = req.body;
    const image = req.file ? req.file.filename : 'default-image.jpg'; // Use uploaded image or default

    const sql = `
        INSERT INTO items (title, description, price, category, location, image) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [title, description, price, category, location, image];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Error inserting item:', err.message);  // Log error
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json({ success: true, id: this.lastID });
        }
    }); // Ensure this bracket is closed properly
}); // Ensure this bracket is closed properly
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
