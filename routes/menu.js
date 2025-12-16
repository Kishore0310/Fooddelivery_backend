import express from 'express';
import { readData } from '../utils/dataStorage.js';

const router = express.Router();

// GET /api/menu/restaurant/:id - Get menu items for a restaurant
router.get('/restaurant/:id', async (req, res) => {
  try {
    const menuItems = await readData('menuItems');
    const restaurantId = parseInt(req.params.id);
    
    const items = menuItems.filter(item => item.restaurantId === restaurantId);

    if (items.length === 0) {
      return res.status(404).json({ error: 'No menu items found for this restaurant' });
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items', message: error.message });
  }
});

// GET /api/menu/item/:id - Get single menu item
router.get('/item/:id', async (req, res) => {
  try {
    const menuItems = await readData('menuItems');
    const item = menuItems.find(item => item.id === parseInt(req.params.id));

    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu item', message: error.message });
  }
});

export default router;


