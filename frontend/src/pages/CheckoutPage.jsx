import { useState } from 'react';
import { checkout, getCart } from '../api/client.js';
import { useToast } from '../components/ToastContext.jsx';
import ReceiptModal from '../components/ReceiptModal.jsx';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const { show } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Ensure cart isn't empty before checkout
      const cart = await getCart();
      if (!cart.items.length) {
        show('Your cart is empty', 'warning');
        return;
      }
      const { receipt } = await checkout({ name, email, cartItems: cart.items });
      setReceipt(receipt);
      show('Checkout successful');
      setName('');
      setEmail('');
    } catch (e) {
      show('Checkout failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={onSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit" disabled={submitting}>{submitting ? 'Processing...' : 'Place Order'}</button>
      </form>
      <ReceiptModal open={!!receipt} receipt={receipt || { items: [] }} onClose={() => setReceipt(null)} />
    </section>
  );
}


