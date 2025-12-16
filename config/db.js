import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery';
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.error(`   URI: ${process.env.MONGODB_URI ? 'mongodb+srv://...' : 'mongodb://localhost:27017/fooddelivery'}`);
    throw error; // Don't exit, let the server start anyway
  }
};

export default connectDB;

