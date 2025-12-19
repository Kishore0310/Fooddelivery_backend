import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const TOKEN_EXPIRY = '7d';

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('Signup request received:', { name, email, password: password ? '***' : 'missing' });

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('Signup failed: Email already exists');
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password
    });

    console.log('User created successfully:', user.email);

    const token = generateToken(user);
    res.status(201).json({ 
      message: 'Signup successful', 
      token, 
      user 
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Failed to sign up', message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login request received:', { email, password: password ? '***' : 'missing' });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email (explicitly select password field)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      console.log('Login failed: User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Stored password hash:', user.password ? 'exists' : 'missing');
    console.log('Password to compare:', password ? 'provided' : 'missing');
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Login failed: Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Login successful:', user.email);
    const token = generateToken(user);
    res.json({ 
      message: 'Login successful', 
      token, 
      user 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login', message: error.message });
  }
});

export default router;
