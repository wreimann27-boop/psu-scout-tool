require('dotenv').config();const express = require('express');
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
```

`Ctrl + S`.

**Step 2 — Create a .env file for local use**

Create a new file in your `my-first-app` folder called `.env` and paste this in with your real key:
```
ANTHROPIC_API_KEY=your-real-key-here
```

No quotes around the key. `Ctrl + S`.

**Step 3 — Add .env to .gitignore**

Open `.gitignore` and add a second line:
```
node_modules
.env,
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