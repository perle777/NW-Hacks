const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Placeholder Login Route
app.post('/login', (req, res) => {
    res.send('Login endpoint');
});

// Placeholder Signup Route
app.post('/signup', (req, res) => {
    res.send('Signup endpoint');
});

// Placeholder Gratitude Entries Route
app.post('/entries', (req, res) => {
    res.send('Add gratitude entry');
});

app.get('/entries', (req, res) => {
    res.send('Fetch gratitude entries');
});

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
