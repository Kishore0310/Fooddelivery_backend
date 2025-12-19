import express from 'express';
import Order from '../models/Order.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/orders - Get all orders for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
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
    console.log('Order request received:', {
      userId: req.user._id,
      body: req.body
    });

    const { cart, deliveryAddress, paymentMethod } = req.body;

    if (!cart || cart.length === 0) {
      console.log('Cart is empty');
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const platformFee = 2;
    const total = itemTotal + deliveryFee + platformFee;

    console.log('Order calculations:', { itemTotal, deliveryFee, platformFee, total });

    const orderData = {
      userId: req.user._id,
      items: cart,
      itemTotal,
      deliveryFee,
      platformFee,
      total,
      deliveryAddress: deliveryAddress || 'Not provided',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000)
    };

    console.log('Creating order with data:', orderData);
    const order = new Order(orderData);
    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder._id);

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Order creation failed:', {
      error: error.message,
      stack: error.stack,
      name: error.name
    });
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








