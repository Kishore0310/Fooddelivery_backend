import express from 'express';
import { readData, writeData } from '../utils/dataStorage.js';

const router = express.Router();

// Helper to get or create cart for a user
async function getCart(userId = 'default') {
  const carts = await readData('carts');
  if (!carts[userId]) {
    carts[userId] = [];
    await writeData('carts', carts);
  }
  return carts[userId];
}

// GET /api/cart - Get user's cart
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const cart = await getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart', message: error.message });
  }
});

// POST /api/cart/add - Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId = 'default', item, restaurantId, restaurantName } = req.body;

    if (!item || !restaurantId || !restaurantName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const carts = await readData('carts');
    if (!carts[userId]) {
      carts[userId] = [];
    }

    const cart = carts[userId];
    const existingItem = cart.find(
      cartItem => cartItem.id === item.id && cartItem.restaurantId === restaurantId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
        restaurantId,
        restaurantName
      });
    }

    carts[userId] = cart;
    await writeData('carts', carts);

    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart', message: error.message });
  }
});

// POST /api/cart/remove - Remove item from cart
router.post('/remove', async (req, res) => {
  try {
    const { userId = 'default', itemId, restaurantId } = req.body;

    if (!itemId || !restaurantId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const carts = await readData('carts');
    if (!carts[userId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cart = carts[userId];
    const item = cart.find(
      cartItem => cartItem.id === itemId && cartItem.restaurantId === restaurantId
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const index = cart.findIndex(
        cartItem => cartItem.id === itemId && cartItem.restaurantId === restaurantId
      );
      cart.splice(index, 1);
    }

    carts[userId] = cart;
    await writeData('carts', carts);

    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart', message: error.message });
  }
});

// DELETE /api/cart/clear - Clear user's cart
router.delete('/clear', async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const carts = await readData('carts');
    carts[userId] = [];
    await writeData('carts', carts);

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart', message: error.message });
  }
});

// GET /api/cart/total - Get cart total
router.get('/total', async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const cart = await getCart(userId);

    const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = itemTotal > 0 ? 40 : 0;
    const platformFee = itemTotal > 0 ? 2 : 0;
    const total = itemTotal + deliveryFee + platformFee;

    res.json({
      itemTotal: itemTotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      platformFee: platformFee.toFixed(2),
      total: total.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate total', message: error.message });
  }
});

export default router;


