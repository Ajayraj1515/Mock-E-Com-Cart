import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export let db;

export async function initDb() {
  const dbDir = path.join(__dirname, '../../data');
  // Ensure the data directory exists to avoid SQLITE_CANTOPEN
  await fs.promises.mkdir(dbDir, { recursive: true });

  db = await open({
    filename: path.join(dbDir, 'app.db'),
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      total REAL NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  await seedProductsIfEmpty();
}

async function seedProductsIfEmpty() {
  const row = await db.get('SELECT COUNT(1) as cnt FROM products');
  if (row && row.cnt > 0) return;

  const mockProducts = [
    { id: 1, name: 'Vibe Tee', price: 19.99, image: '/images/tee.jpg' },
    { id: 2, name: 'Vibe Hoodie', price: 39.99, image: '/images/hoodie.jpg' },
    { id: 3, name: 'Vibe Cap', price: 14.99, image: '/images/cap.jpg' },
    { id: 4, name: 'Vibe Sneakers', price: 69.99, image: '/images/sneakers.jpg' },
    { id: 5, name: 'Vibe Socks', price: 9.99, image: '/images/socks.jpg' },
    { id: 6, name: 'Vibe Tote', price: 24.99, image: '/images/tote.jpg' }
  ];

  const insert = await db.prepare('INSERT INTO products (id, name, price, image) VALUES (?, ?, ?, ?)');
  try {
    for (const p of mockProducts) {
      await insert.run(p.id, p.name, p.price, p.image);
    }
  } finally {
    await insert.finalize();
  }
}


