import express from 'express';
import { readData } from '../utils/dataStorage.js';

const router = express.Router();

// GET /api/restaurants - Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await readData('restaurants');
    const { search, category } = req.query;

    let filtered = restaurants;

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchLower) ||
        r.cuisine.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (category) {
      const categoryLower = category.toLowerCase();
      filtered = filtered.filter(r =>
        r.cuisine.toLowerCase().includes(categoryLower)
      );
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants', message: error.message });
  }
});

// GET /api/restaurants/:id - Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurants = await readData('restaurants');
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurant', message: error.message });
  }
});

export default router;








