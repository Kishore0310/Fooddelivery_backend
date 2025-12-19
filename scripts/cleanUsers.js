import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const cleanUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery');
    console.log('✅ Connected to MongoDB');

    const result = await User.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} users with plain text passwords`);
    console.log('✅ Database cleaned. Please signup again with new accounts.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

cleanUsers();