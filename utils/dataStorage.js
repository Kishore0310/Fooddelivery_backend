import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../data');


async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Read data from JSON file
export async function readData(filename) {
  await ensureDataDir();
  const filePath = path.join(dataDir, `${filename}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return empty array if file doesn't exist
    return [];
  }
}

// Write data to JSON file
export async function writeData(filename, data) {
  await ensureDataDir();
  const filePath = path.join(dataDir, `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Get next ID
export async function getNextId(filename) {
  const data = await readData(filename);
  if (data.length === 0) return 1;
  return Math.max(...data.map(item => item.id || 0)) + 1;
}








