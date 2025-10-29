import { db } from '../config/db.js';

export async function addToCart(productId, qty) {
  const existing = await db.get('SELECT id, qty FROM cart_items WHERE productId = ?', productId);
  if (existing) {
    await db.run('UPDATE cart_items SET qty = ? WHERE id = ?', existing.qty + qty, existing.id);
    return existing.id;
  }
  const result = await db.run('INSERT INTO cart_items (productId, qty) VALUES (?, ?)', productId, qty);
  return result.lastID;
}

export async function removeFromCart(id) {
  await db.run('DELETE FROM cart_items WHERE id = ?', id);
}

export async function updateCartItem(id, qty) {
  await db.run('UPDATE cart_items SET qty = ? WHERE id = ?', qty, id);
}

export async function getCart() {
  const items = await db.all(
    `SELECT c.id, c.productId, c.qty, p.name, p.price, p.image,
            (p.price * c.qty) as subtotal
     FROM cart_items c
     JOIN products p ON p.id = c.productId
     ORDER BY c.id`
  );
  const totalRow = await db.get('SELECT SUM(p.price * c.qty) as total FROM cart_items c JOIN products p ON p.id = c.productId');
  const total = totalRow?.total || 0;
  return { items, total };
}

export async function clearCart() {
  await db.run('DELETE FROM cart_items');
}


