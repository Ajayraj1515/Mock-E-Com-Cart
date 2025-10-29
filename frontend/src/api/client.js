import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export async function fetchProducts() {
  const { data } = await api.get('/products');
  return data;
}

export async function getCart() {
  const { data } = await api.get('/cart');
  return data;
}

export async function addToCart(productId, qty = 1) {
  const { data } = await api.post('/cart', { productId, qty });
  return data;
}

export async function updateCartItem(id, qty) {
  const { data } = await api.put(`/cart/${id}`, { qty });
  return data;
}

export async function removeFromCart(id) {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
}

export async function checkout(form) {
  const { data } = await api.post('/checkout', form);
  return data;
}


