import { getAllProducts } from '../models/product.model.js';

export async function listProducts(_req, res, next) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
}


