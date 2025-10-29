import { getCart, clearCart } from '../models/cart.model.js';
import { createOrder } from '../models/order.model.js';

export async function checkout(req, res, next) {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required' });
    }

    const { items, total } = await getCart();
    if (!items.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const timestamp = new Date().toISOString();
    const order = await createOrder({ name, email, total, createdAt: timestamp });

    await clearCart();

    res.status(201).json({
      receipt: {
        orderId: order.id,
        name,
        email,
        items,
        total,
        timestamp,
      },
    });
  } catch (e) {
    next(e);
  }
}


