if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/api/scout', async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  if (!data.content || !data.content[0]) {
    console.error('Claude API error:', JSON.stringify(data));
    res.status(500).json({ error: 'Claude API error', details: data });
    return;
  }
  res.json({ result: data.content[0].text });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});