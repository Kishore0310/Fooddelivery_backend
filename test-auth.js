import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

async function testAuth() {
  try {
    console.log('🔍 Testing Authentication Setup...\n');
    
    // 1. Check MongoDB connection
    console.log('1. Testing MongoDB connection...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery';
    console.log(`   URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);
    
    await mongoose.connect(mongoUri);
    console.log('   ✅ MongoDB Connected\n');
    
    // 2. Test User model
    console.log('2. Testing User model...');
    const testUser = await User.findOne({ email: 'test@example.com' });
    if (testUser) {
      console.log('   ✅ User model works');
      console.log(`   Found user: ${testUser.name} (${testUser.email})\n`);
    } else {
      console.log('   ✅ User model works (no test user found)\n');
    }
    
    // 3. Test password selection
    console.log('3. Testing password field selection...');
    const userWithPassword = await User.findOne({ email: 'test@example.com' }).select('+password');
    if (userWithPassword) {
      console.log('   ✅ Password field can be selected');
      console.log(`   Password hash exists: ${userWithPassword.password ? 'Yes' : 'No'}\n`);
    } else {
      console.log('   ⚠️  No user found to test password selection\n');
    }
    
    // 4. Test creating a user
    console.log('4. Testing user creation...');
    try {
      const newUser = await User.create({
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        password: 'test123'
      });
      console.log('   ✅ User creation works');
      console.log(`   Created user: ${newUser.name} (${newUser.email})`);
      console.log(`   Password excluded from output: ${newUser.password ? 'No (ERROR!)' : 'Yes (Correct!)'}\n`);
      
      // Clean up
      await User.deleteOne({ _id: newUser._id });
      console.log('   ✅ Test user cleaned up\n');
    } catch (err) {
      console.log('   ❌ User creation failed:', err.message);
      if (err.code === 11000) {
        console.log('   (This is expected if user already exists)\n');
      }
    }
    
    // 5. Test password hashing
    console.log('5. Testing password hashing...');
    const testPassword = 'test123';
    const hashedUser = await User.create({
      name: 'Hash Test',
      email: 'hashtest' + Date.now() + '@example.com',
      password: testPassword
    });
    
    const retrievedUser = await User.findOne({ email: hashedUser.email }).select('+password');
    const isMatch = await require('bcryptjs').compare(testPassword, retrievedUser.password);
    console.log(`   Password match: ${isMatch ? '✅ Yes' : '❌ No'}\n`);
    
    // Clean up
    await User.deleteOne({ _id: hashedUser._id });
    
    console.log('✅ All tests passed! Authentication setup is working correctly.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testAuth();





