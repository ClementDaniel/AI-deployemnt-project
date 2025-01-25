import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.post('/api/predict', async (req: Request, res: Response) => {
  const { text } = req.body; // Expecting the key 'text' as input.

  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  try {
    // Call the Flask API
    const response = await axios.post('http://localhost:5001/predict', { text });
    return res.json(response.data);
  } catch (error: any) {
    console.error('Error calling the Flask API:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch prediction from ML service',
      details: error.message,
    });
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
