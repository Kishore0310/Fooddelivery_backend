import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

try {
  let envContent = fs.readFileSync(envPath, 'utf-8');
  
  // Fix MongoDB URI - remove quotes and add database name
  const oldUri = envContent.match(/MONGODB_URI=['"]([^'"]+)['"]/);
  if (oldUri) {
    let newUri = oldUri[1];
    
    // Remove appName parameter and add database name
    if (newUri.includes('?appName=')) {
      newUri = newUri.split('?')[0];
    }
    
    // Add database name if not present
    if (!newUri.includes('/fooddelivery')) {
      newUri = newUri.replace(/\/$/, '') + '/fooddelivery?retryWrites=true&w=majority';
    }
    
    envContent = envContent.replace(
      /MONGODB_URI=['"]([^'"]+)['"]/,
      `MONGODB_URI=${newUri}`
    );
    
    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log('✅ Fixed .env file!');
    console.log(`   Old: MONGODB_URI='${oldUri[1]}'`);
    console.log(`   New: MONGODB_URI=${newUri}`);
  } else {
    console.log('⚠️  Could not find MONGODB_URI with quotes, checking format...');
    const uriMatch = envContent.match(/MONGODB_URI=(.+)/);
    if (uriMatch) {
      let uri = uriMatch[1].trim();
      if (!uri.includes('/fooddelivery')) {
        uri = uri.replace(/\/$/, '').replace(/\?.*$/, '') + '/fooddelivery?retryWrites=true&w=majority';
        envContent = envContent.replace(/MONGODB_URI=.+/, `MONGODB_URI=${uri}`);
        fs.writeFileSync(envPath, envContent, 'utf-8');
        console.log('✅ Added database name to MONGODB_URI');
        console.log(`   New: MONGODB_URI=${uri}`);
      } else {
        console.log('✅ MONGODB_URI looks correct');
      }
    }
  }
} catch (error) {
  console.error('❌ Error fixing .env file:', error.message);
  console.log('\nPlease manually fix your .env file:');
  console.log('Change:');
  console.log("MONGODB_URI='mongodb+srv://...'");
  console.log('To:');
  console.log('MONGODB_URI=mongodb+srv://.../fooddelivery?retryWrites=true&w=majority');
}

