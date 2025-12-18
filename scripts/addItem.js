import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const addItem = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery');
  
  const newItem = await MenuItem.create({
    name: "MongoDB Special Pizza",
    price: 349,
    description: "Added directly via MongoDB script",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
    veg: true,
    restaurantId: 1
  });
  
  console.log('✅ Item added:', newItem);
  process.exit(0);
};

addItem().catch(console.error);