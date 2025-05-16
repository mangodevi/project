const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.message;
    // TODO: Send `userInput` to NLP/Language Model API, or process here
    const reply = `You asked: ${userInput}`; // Placeholder
    res.json({ reply });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));