import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// GET /api/restaurants - Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Build search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.cuisine = { $regex: category, $options: 'i' };
    }

    const restaurants = await Restaurant.find(query).sort({ promoted: -1, rating: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants', message: error.message });
  }
});

// GET /api/restaurants/:id - Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ id: parseInt(req.params.id) });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurant', message: error.message });
  }
});

export default router;








