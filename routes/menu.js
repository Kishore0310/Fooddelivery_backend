import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/menu/restaurant/:id - Get menu items for a restaurant
router.get('/restaurant/:id', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);
    const items = await MenuItem.find({ restaurantId });

    if (items.length === 0) {
      return res.status(404).json({ error: 'No menu items found for this restaurant' });
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items', message: error.message });
  }
});

// GET /api/menu/items - Get all menu items
router.get('/items', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items', message: error.message });
  }
});

// GET /api/menu/item/:id - Get single menu item
router.get('/item/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu item', message: error.message });
  }
});

// POST /api/menu/item - Create a new menu item (NO auth required for easy testing)
router.post('/item', async (req, res) => {
  try {
    const { restaurantId, name, price, description, image, veg } = req.body;

    // Validate required fields
    if (!restaurantId || !name || price === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['restaurantId', 'name', 'price'] 
      });
    }

    const newItem = new MenuItem({
      restaurantId: parseInt(restaurantId),
      name,
      price: Number(price),
      description: description || '',
      image: image || '',
      veg: veg !== undefined ? Boolean(veg) : true
    });

    const savedItem = await newItem.save();
    console.log('✅ New food item added to MongoDB:', savedItem.name);

    res.status(201).json({
      message: 'Menu item created successfully',
      item: savedItem
    });
  } catch (error) {
    console.error('❌ Failed to create menu item:', error.message);
    res.status(500).json({ error: 'Failed to create menu item', message: error.message });
  }
});

// PUT /api/menu/item/:id - Update an existing menu item
router.put('/item/:id', async (req, res) => {
  try {
    const { restaurantId, name, price, description, image, veg } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        ...(restaurantId && { restaurantId: parseInt(restaurantId) }),
        ...(name && { name }),
        ...(price != null && { price: Number(price) }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(veg !== undefined && { veg: Boolean(veg) })
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({
      message: 'Menu item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu item', message: error.message });
  }
});

// DELETE /api/menu/item/:id - Delete a menu item (requires authentication)
router.delete('/item/:id', authenticateToken, async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({
      message: 'Menu item deleted successfully',
      item: deletedItem
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item', message: error.message });
  }
});

export default router;

