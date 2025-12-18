import express from 'express';
import { readData } from '../utils/dataStorage.js';

const router = express.Router();

// GET /api/categories - Get all food categories
router.get('/', async (req, res) => {
  try {
    const categories = await readData('categories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', message: error.message });
  }
});

export default router;








