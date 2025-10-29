import { db } from '../config/db.js';

export async function createOrder({ name, email, total, createdAt }) {
  const result = await db.run(
    'INSERT INTO orders (name, email, total, createdAt) VALUES (?, ?, ?, ?)',
    name,
    email,
    total,
    createdAt
  );
  return { id: result.lastID };
}


