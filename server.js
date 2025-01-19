require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/home'); // Redirect to the home page
});

// Define routes for serving HTML pages
app.get('/journal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'journal.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/entries', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'entries.html'));
});

// Journal route (For adding new journal entries)
app.post('/journal', async (req, res) => {
    const { entry } = req.body;
    if (!entry) {
        return res.status(400).json({ message: 'Entry is required.' });
    }

    try {
        // Fetch a quote from the API Ninjas Quotes API
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } // Your API key from .env
        });

        const quote = response.data[0]; // Extract the first quote from the response

        res.status(201).json({
            message: 'New journal entry added!',
            entry,
            inspirationalQuote: `${quote.quote} - ${quote.author}`
        });
    } catch (error) {
        console.error('Error fetching quote:', error.message);
        res.status(500).json({ 
            message: 'Journal entry added, but there was an error fetching the quote.',
            entry,
            error: error.message
        });
    }
});

// Entries route (For viewing past journal entries)
app.get('/entries/data', (req, res) => {
    const entries = [
        { id: 1, entry: 'I am grateful for the sunshine.', timestamp: new Date() },
        { id: 2, entry: 'I am grateful for my family.', timestamp: new Date() }
    ];
    res.status(200).json({ entries });
});

// Prompt route (using pre-defined prompts)
const prompts = [
    "What made you smile today?",
    "What is one thing you're looking forward to tomorrow?",
    "What is something beautiful you noticed today?",
    "Who is someone you're grateful for and why?",
    "What is one kind thing someone did for you recently?",
    "What is a skill or talent you’re thankful for?",
    "What’s a favorite memory that brings you joy?",
    "What is something in nature that you appreciate?",
    "What’s a small thing that made your day better today?",
    "What is something you’ve learned recently that you're grateful for?",
    "What is something challenging that has made you stronger?",
    "What is a mistake you made that taught you something valuable?",
    "What is a past experience you’re thankful for?",
    "Who has positively impacted your life, and how?",
    "What is one thing you have now that you once wished for?",
    "What is a piece of technology you’re grateful for and why?",
    "What is a piece of advice you’re thankful to have received?",
    "What is your favorite comfort food, and why do you love it?",
    "What is your favorite book, movie, or music that brings you joy?",
    "What is a tradition or holiday you’re thankful for?",
    "Imagine you’ve traveled back in time. What’s one thing you’d tell your younger self to be grateful for?",
    "Write about the last time you felt deeply connected to someone.",
    "Describe a place that makes you feel peaceful and thankful.",
    "Write about a moment of kindness you witnessed or experienced.",
    "If your gratitude were a color, what would it be and why?",
    "What is a goal you’ve achieved that you’re proud of?",
    "What’s a quality in yourself that you’re thankful for?",
    "What’s one thing about your body or health that you appreciate?",
    "What’s one thing you’ve improved at recently?",
    "What’s a challenge you’ve overcome that you're grateful for?"
];

app.get('/prompt', (req, res) => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    res.status(200).json({ prompt: randomPrompt });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



