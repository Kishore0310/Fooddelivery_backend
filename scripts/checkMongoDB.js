import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const checkMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery');
    console.log('✅ Connected to MongoDB');
    
    const count = await MenuItem.countDocuments();
    console.log(`📊 Total menu items in database: ${count}`);
    
    const items = await MenuItem.find().limit(3);
    console.log('📋 Sample items:', items);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

checkMongoDB();