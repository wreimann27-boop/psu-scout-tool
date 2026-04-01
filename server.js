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
      'x-api-key': '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',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  res.json({ result: data.content[0].text });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});