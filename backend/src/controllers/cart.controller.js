import { addToCart, getCart, removeFromCart, updateCartItem } from '../models/cart.model.js';
import { getProductById } from '../models/product.model.js';

export async function addItem(req, res, next) {
  try {
    const { productId, qty } = req.body || {};
    if (!productId || !Number.isInteger(productId)) {
      return res.status(400).json({ message: 'productId is required (integer)' });
    }
    const quantity = Number(qty) || 1;
    const product = await getProductById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const id = await addToCart(productId, quantity);
    const cart = await getCart();
    res.status(201).json({ id, cart });
  } catch (e) {
    next(e);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid id' });
    await removeFromCart(id);
    const cart = await getCart();
    res.json(cart);
  } catch (e) {
    next(e);
  }
}

export async function updateItem(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { qty } = req.body || {};
    if (!id) return res.status(400).json({ message: 'Invalid id' });
    const quantity = Number(qty);
    if (!Number.isFinite(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'qty must be >= 1' });
    }
    await updateCartItem(id, quantity);
    const cart = await getCart();
    res.json(cart);
  } catch (e) {
    next(e);
  }
}

export async function getCartSummary(_req, res, next) {
  try {
    const cart = await getCart();
    res.json(cart);
  } catch (e) {
    next(e);
  }
}


