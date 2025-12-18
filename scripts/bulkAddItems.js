import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const bulkAddItems = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery');
  
  const items = [
    {
      name: "Mongo Burger",
      price: 199,
      description: "Database special burger",
      veg: false,
      restaurantId: 2
    },
    {
      name: "Collection Pasta",
      price: 249,
      description: "Document-style pasta",
      veg: true,
      restaurantId: 3
    }
  ];
  
  const insertedItems = await MenuItem.insertMany(items);
  console.log(`✅ Added ${insertedItems.length} items:`, insertedItems);
  process.exit(0);
};

bulkAddItems().catch(console.error);