import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  cuisine: String,
  rating: Number,
  deliveryTime: String,
  costForTwo: String,
  image: String,
  offers: [String],
  promoted: Boolean
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

async function seedRestaurants() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://vrkishore8_db_user:kishore03@cluster0.p4stwy9.mongodb.net/fooddelivery?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Connected to MongoDB');

    // Clear existing restaurants
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    // Read restaurant data
    const restaurantsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/restaurants.json'), 'utf8')
    );

    // Insert restaurants
    await Restaurant.insertMany(restaurantsData);
    console.log(`Seeded ${restaurantsData.length} restaurants`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding restaurants:', error);
    process.exit(1);
  }
}

seedRestaurants();