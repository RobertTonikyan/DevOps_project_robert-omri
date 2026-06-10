const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});


app.get('/admin-panel', (req, res) => {
    res.send("Welcome to the Secret Admin Panel!");
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});