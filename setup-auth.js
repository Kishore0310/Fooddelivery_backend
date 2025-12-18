import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Setting up authentication...\n');

// 1. Check/Create .env file
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from env.example...');
  if (fs.existsSync(envExamplePath)) {
    let envContent = fs.readFileSync(envExamplePath, 'utf-8');
    
    // Fix MongoDB URI
    envContent = envContent.replace(
      /MONGODB_URI=['"]([^'"]+)['"]/,
      (match, uri) => {
        let newUri = uri;
        // Remove appName parameter
        if (newUri.includes('?appName=')) {
          newUri = newUri.split('?')[0];
        }
        // Add database name if not present
        if (!newUri.includes('/fooddelivery')) {
          newUri = newUri.replace(/\/$/, '') + '/fooddelivery?retryWrites=true&w=majority';
        }
        return `MONGODB_URI=${newUri}`;
      }
    );
    
    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log('✅ .env file created!\n');
  } else {
    // Create default .env
    const defaultEnv = `PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/fooddelivery
`;
    fs.writeFileSync(envPath, defaultEnv, 'utf-8');
    console.log('✅ .env file created with default values!\n');
    console.log('⚠️  Please update MONGODB_URI with your MongoDB connection string\n');
  }
} else {
  console.log('✅ .env file already exists\n');
  
  // Fix existing .env if needed
  let envContent = fs.readFileSync(envPath, 'utf-8');
  let updated = false;
  
  // Fix MongoDB URI with quotes
  if (envContent.match(/MONGODB_URI=['"]/)) {
    envContent = envContent.replace(
      /MONGODB_URI=['"]([^'"]+)['"]/,
      (match, uri) => {
        let newUri = uri;
        if (newUri.includes('?appName=')) {
          newUri = newUri.split('?')[0];
        }
        if (!newUri.includes('/fooddelivery')) {
          newUri = newUri.replace(/\/$/, '') + '/fooddelivery?retryWrites=true&w=majority';
        }
        updated = true;
        return `MONGODB_URI=${newUri}`;
      }
    );
  } else {
    // Check if database name is missing
    const uriMatch = envContent.match(/MONGODB_URI=(.+)/);
    if (uriMatch) {
      let uri = uriMatch[1].trim();
      if (!uri.includes('/fooddelivery') && !uri.includes('localhost')) {
        const newUri = uri.replace(/\/$/, '').replace(/\?.*$/, '') + '/fooddelivery?retryWrites=true&w=majority';
        envContent = envContent.replace(/MONGODB_URI=.+/, `MONGODB_URI=${newUri}`);
        updated = true;
      }
    }
  }
  
  if (updated) {
    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log('✅ Fixed .env file (removed quotes, added database name)\n');
  }
}

// 2. Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 node_modules not found. Run: npm install\n');
} else {
  console.log('✅ node_modules exists\n');
}

// 3. Check required files
const requiredFiles = [
  'server.js',
  'models/User.js',
  'routes/auth.js',
  'config/db.js'
];

console.log('📋 Checking required files...');
let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING!`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n✅ All required files exist!\n');
} else {
  console.log('\n❌ Some files are missing. Please check your project structure.\n');
}

console.log('🎉 Setup complete!\n');
console.log('Next steps:');
console.log('1. Make sure MongoDB is running or MongoDB Atlas is accessible');
console.log('2. Update MONGODB_URI in .env if needed');
console.log('3. Run: npm start');
console.log('4. Test: http://localhost:5000/api/health\n');





