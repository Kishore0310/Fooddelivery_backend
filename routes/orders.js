import express from 'express';
import { readData, writeData, getNextId } from '../utils/dataStorage.js';

const router = express.Router();

// GET /api/orders - Get all orders for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const orders = await readData('orders');
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const orders = await readData('orders');
    const order = orders.find(o => o.id === parseInt(req.params.id));

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order', message: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { userId = 'default', cart, deliveryAddress, paymentMethod } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate totals
    const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const platformFee = 2;
    const total = itemTotal + deliveryFee + platformFee;

    // Create order
    const order = {
      id: await getNextId('orders'),
      userId,
      items: cart,
      itemTotal: itemTotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      platformFee: platformFee.toFixed(2),
      total: total.toFixed(2),
      deliveryAddress: deliveryAddress || 'Not provided',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Placed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 mins from now
    };

    // Save order
    const orders = await readData('orders');
    orders.push(order);
    await writeData('orders', orders);

    // Clear cart after order
    const carts = await readData('carts');
    carts[userId] = [];
    await writeData('carts', carts);

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', message: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const orders = await readData('orders');
    const order = orders.find(o => o.id === parseInt(req.params.id));

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await writeData('orders', orders);

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', message: error.message });
  }
});

export default router;


