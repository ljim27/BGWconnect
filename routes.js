app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.get(sql, [itemId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});