import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery';

// Sample items – adjust as needed
const menuItems = [
  {
    restaurantId: 1,
    name: 'Margherita Pizza',
    price: 199,
    description: 'Classic pizza with tomato and mozzarella',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop',
    veg: true,
  },
  {
    restaurantId: 1,
    name: 'Pepperoni Pizza',
    price: 249,
    description: 'Spicy pepperoni with cheese',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop',
    veg: false,
  },
  {
    restaurantId: 2,
    name: 'Veggie Burger',
    price: 149,
    description: 'Crispy veggie patty with fresh veggies',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a7290022?w=200&h=200&fit=crop',
    veg: true,
  },
  {
    restaurantId: 2,
    name: 'Chicken Burger',
    price: 179,
    description: 'Juicy chicken patty with special sauce',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
    veg: false,
  },
  {
    restaurantId: 3,
    name: 'Hyderabadi Biryani',
    price: 299,
    description: 'Authentic Hyderabadi style biryani',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop',
    veg: false,
  },
];

async function seedMenuItems() {
  try {
    console.log(`Connecting to MongoDB: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing menu items (optional; comment out if you want to keep existing)
    await MenuItem.deleteMany({});
    console.log('🧹 Cleared existing menu items');

    const inserted = await MenuItem.insertMany(menuItems);
    console.log(`✅ Inserted ${inserted.length} menu items`);
  } catch (error) {
    console.error('❌ Error seeding menu items:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seedMenuItems();



