import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem.js';
import { readData } from '../utils/dataStorage.js';

dotenv.config();

const seedMenuItems = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery');
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Read data from JSON file
    const menuItems = await readData('menuItems');
    
    // Remove the id field and let MongoDB generate _id
    const itemsToInsert = menuItems.map(item => {
      const { id, ...itemWithoutId } = item;
      return itemWithoutId;
    });

    // Insert menu items
    const insertedItems = await MenuItem.insertMany(itemsToInsert);
    console.log(`✅ Seeded ${insertedItems.length} menu items to MongoDB`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding menu items:', error);
    process.exit(1);
  }
};

seedMenuItems();