import express from 'express';
import Order from '../models/Order.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/orders - Get all orders for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    let orders;
    try {
      orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    } catch (dbError) {
      const fs = await import('fs/promises');
      const path = await import('path');
      const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
      try {
        const data = await fs.readFile(ordersFile, 'utf8');
        const allOrders = JSON.parse(data);
        orders = allOrders.filter(o => o.userId === req.user._id.toString());
      } catch (e) {
        orders = [];
      }
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order', message: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { cart, deliveryAddress, paymentMethod } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const platformFee = 2;
    const total = itemTotal + deliveryFee + platformFee;

    const orderData = {
      userId: req.user._id,
      items: cart,
      itemTotal,
      deliveryFee,
      platformFee,
      total,
      deliveryAddress: deliveryAddress || 'Not provided',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Placed',
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000),
      createdAt: new Date()
    };

    let savedOrder;
    try {
      const order = new Order(orderData);
      savedOrder = await order.save();
    } catch (dbError) {
      const fs = await import('fs/promises');
      const path = await import('path');
      const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
      let orders = [];
      try {
        const data = await fs.readFile(ordersFile, 'utf8');
        orders = JSON.parse(data);
      } catch (e) {}
      savedOrder = { _id: Date.now().toString(), ...orderData };
      orders.push(savedOrder);
      await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
    }

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Failed to create order', message: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', message: error.message });
  }
});

export default router;








