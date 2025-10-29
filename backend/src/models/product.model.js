import { db } from '../config/db.js';

export async function getAllProducts() {
  return db.all('SELECT id, name, price, image FROM products ORDER BY id');
}

export async function getProductById(id) {
  return db.get('SELECT id, name, price, image FROM products WHERE id = ?', id);
}


