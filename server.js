require('dotenv').config();
const express = require('express');
const path = require('path');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const firebaseConfig = require('public/js/firebaseAPI'); 

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/home'); 
});

app.get('/journal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'journal.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/entries', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'entries.html'));
});

app.get('/entries/data', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'journalEntries'));
        const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json({ entries });
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Failed to fetch journal entries.', error: error.message });
    }
});
// app.get('/entries/data', (req, res) => {
//     const entries = [
//         { id: 1, entry: 'I am grateful for the sunshine.', timestamp: new Date() },
//         { id: 2, entry: 'I am grateful for my family.', timestamp: new Date() }
//     ];
//     res.status(200).json({ entries });
// });

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

app.post('/journal', async (req, res) => {
    const { prompt, response } = req.body;
    if (!prompt || !response) {
      return res.status(400).json({ message: 'Prompt and response are required.' });
    }
  
    try {
      const entry = { prompt, response, timestamp: new Date() };
      await db.collection('journalEntries').add(entry);
      res.status(201).json({ message: 'Journal entry saved successfully.' });
    } catch (error) {
      console.error('Error saving entry:', error);
      res.status(500).json({ message: 'Failed to save journal entry.' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



