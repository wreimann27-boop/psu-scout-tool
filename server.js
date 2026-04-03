if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const supabase = createClient(
  'https://xgqugeopquhrtgtncwmw.supabase.co',
  'sb_publishable_3Ak5z4Wz7j3GedvFOu2gAw_z0qeYODf'
);

// Scout a player via Claude
app.post('/api/scout', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!data.content || !data.content[0]) {
      console.error('Claude API error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Claude API error', details: data });
    }

    res.json({ result: data.content[0].text });

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get all players from Supabase
app.get('/api/players', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});