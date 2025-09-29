const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve all static files (HTML, JS, CSS, images) from "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
