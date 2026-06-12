const express = require('express');
const path = require('path');
const { Pool } = require('pg'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/todo_db'
});

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                task TEXT NOT NULL
            );
        `);
        console.log("Successfully connected to PostgreSQL and verified tables.");
        
        app.listen(PORT, () => {
            console.log(`Server is running successfully on port ${PORT}`);
        });
    } catch (err) {
        console.error("Database initialization failed:", err.message);
        process.exit(1);
    }
}
initDB();


app.get('/api/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ error: "Task is required" });
        
        const result = await pool.query(
            'INSERT INTO todos (task) VALUES ($1) RETURNING *',
            [task]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});