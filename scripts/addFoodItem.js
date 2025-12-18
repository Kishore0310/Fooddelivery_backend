import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const addFoodItem = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery');
    console.log('✅ Connected to MongoDB');

    // Get input from command line arguments
    const args = process.argv.slice(2);
    if (args.length < 3) {
      console.log('Usage: node scripts/addFoodItem.js <name> <price> <restaurantId> [description] [veg]');
      console.log('Example: node scripts/addFoodItem.js "Cheese Pizza" 299 1 "Delicious cheese pizza" true');
      process.exit(1);
    }

    const [name, price, restaurantId, description = '', veg = 'true'] = args;

    const newItem = await MenuItem.create({
      name,
      price: Number(price),
      restaurantId: Number(restaurantId),
      description,
      veg: veg === 'true',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop'
    });

    console.log('✅ Food item added successfully:');
    console.log(`   Name: ${newItem.name}`);
    console.log(`   Price: ₹${newItem.price}`);
    console.log(`   Restaurant ID: ${newItem.restaurantId}`);
    console.log(`   ID: ${newItem._id}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding food item:', error.message);
    process.exit(1);
  }
};

addFoodItem();