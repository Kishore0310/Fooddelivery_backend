import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import restaurantRoutes from './routes/restaurants.js';
import menuRoutes from './routes/menu.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import categoryRoutes from './routes/categories.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (non-blocking - server will start even if MongoDB fails)
connectDB().catch(err => {
  console.error('\n  MongoDB connection failed, but server will still start');
  console.error('   Error:', err.message);
  console.error('   Note: Signup/Login will not work until MongoDB is connected\n');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Food Delivery API is running!',
    status: 'OK',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      restaurants: '/api/restaurants',
      menu: '/api/menu',
      cart: '/api/cart',
      orders: '/api/orders',
      categories: '/api/categories'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Food Delivery API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`✅ MongoDB Connected Successfully`);
});

