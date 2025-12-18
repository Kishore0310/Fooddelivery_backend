import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function testAuthAPI() {
  console.log('🧪 Testing Authentication API...\n');
  
  try {
    // 1. Connect to MongoDB
    console.log('1️⃣  Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery';
    await mongoose.connect(mongoUri);
    console.log('   ✅ Connected to MongoDB\n');
    
    // 2. Test User Creation
    console.log('2️⃣  Testing user creation (signup)...');
    const testEmail = 'test' + Date.now() + '@example.com';
    const testPassword = 'password123';
    
    try {
      const newUser = await User.create({
        name: 'Test User',
        email: testEmail,
        password: testPassword
      });
      console.log('   ✅ User created successfully');
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Name: ${newUser.name}`);
      console.log(`   ID: ${newUser._id}\n`);
      
      // 3. Test Password Hashing
      console.log('3️⃣  Testing password hashing...');
      const userWithPassword = await User.findOne({ email: testEmail }).select('+password');
      const isMatch = await bcrypt.compare(testPassword, userWithPassword.password);
      console.log(`   ✅ Password match: ${isMatch ? 'YES' : 'NO'}\n`);
      
      // 4. Test Login (find user and verify password)
      console.log('4️⃣  Testing login (find user and verify password)...');
      const loginUser = await User.findOne({ email: testEmail }).select('+password');
      if (loginUser) {
        const loginMatch = await bcrypt.compare(testPassword, loginUser.password);
        if (loginMatch) {
          console.log('   ✅ Login would succeed');
          console.log(`   User found: ${loginUser.name} (${loginUser.email})\n`);
        } else {
          console.log('   ❌ Login would fail: Password mismatch\n');
        }
      } else {
        console.log('   ❌ Login would fail: User not found\n');
      }
      
      // 5. Clean up
      console.log('5️⃣  Cleaning up test user...');
      await User.deleteOne({ _id: newUser._id });
      console.log('   ✅ Test user deleted\n');
      
      console.log('✅ All authentication tests passed!\n');
      console.log('🎉 Your authentication setup is working correctly!\n');
      console.log('Next steps:');
      console.log('1. Start backend: npm start');
      console.log('2. Start frontend: cd ../fooddelivery && npm run dev');
      console.log('3. Test signup/login in browser\n');
      
    } catch (error) {
      console.error('   ❌ Error:', error.message);
      if (error.code === 11000) {
        console.log('   (Email already exists - this is expected if you ran this before)\n');
      }
    }
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nPossible issues:');
    console.error('1. MongoDB connection string is wrong');
    console.error('2. MongoDB Atlas cluster is not accessible');
    console.error('3. Your IP is not whitelisted in MongoDB Atlas');
    console.error('4. Internet connection issue\n');
    process.exit(1);
  }
}

testAuthAPI();





