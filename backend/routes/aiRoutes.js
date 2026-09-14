import express from 'express';
import { askQuestion, explainConcept } from '../controllers/aiController.js';

const router = express.Router();

// Main endpoint: Ask question and get answer in regional language
router.post('/ask', askQuestion);

// Secondary endpoint: Explain a concept
router.post('/explain', explainConcept);

// Status check
router.get('/status', (req, res) => {
  res.json({ 
    status: 'API working',
    timestamp: new Date().toISOString()
  });
});

export default router;
