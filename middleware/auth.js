import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    let user;
    try {
      user = await User.findById(decoded.id);
      if (!user) {
        const fs = await import('fs/promises');
        const path = await import('path');
        const usersFile = path.join(process.cwd(), 'data', 'users.json');
        const data = await fs.readFile(usersFile, 'utf8');
        const users = JSON.parse(data);
        user = users.find(u => u._id === decoded.id);
      }
    } catch (dbError) {
      const fs = await import('fs/promises');
      const path = await import('path');
      const usersFile = path.join(process.cwd(), 'data', 'users.json');
      const data = await fs.readFile(usersFile, 'utf8');
      const users = JSON.parse(data);
      user = users.find(u => u._id === decoded.id);
    }
    
    if (!user) {
      req.user = { _id: decoded.id, email: decoded.email, name: decoded.name };
    } else {
      req.user = user;
    }
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};