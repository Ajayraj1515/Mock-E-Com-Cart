import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartItem } from '../api/client.js';
import { useToast } from './ToastContext.jsx';
import { formatINR } from '../utils/currency.js';

export default function CartView() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const load = async () => {
    setLoading(true);
    const data = await getCart();
    setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onQtyChange = async (id, qty) => {
    await updateCartItem(id, qty);
    show('Cart updated');
    await load();
  };

  const onRemove = async (id) => {
    await removeFromCart(id);
    show('Removed from cart', 'warning');
    await load();
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="thumb"><img src={item.image} alt={item.name} /></div>
                <div className="meta">
                  <div className="name">{item.name}</div>
                  <div className="price">{formatINR(item.price)}</div>
                </div>
                <div className="qty">
                  <button onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}>-</button>
                  <input value={item.qty} onChange={(e) => onQtyChange(item.id, Math.max(1, Number(e.target.value)||1))} />
                  <button onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                </div>
                <div className="subtotal">{formatINR(item.subtotal)}</div>
                <button className="remove" onClick={() => onRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: {formatINR(cart.total)}</div>
        </>
      )}
    </div>
  );
}


