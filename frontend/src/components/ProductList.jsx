import { useEffect, useState } from 'react';
import { addToCart, fetchProducts } from '../api/client.js';
import { useToast } from './ToastContext.jsx';
import { formatINR } from '../utils/currency.js';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id, 1);
    show('Added to cart');
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <div className="image" role="img" aria-label={p.name}>
            <img src={placeholderImage(p.image)} alt={p.name} />
          </div>
          <div className="info">
            <h3>{p.name}</h3>
            <p className="price">{formatINR(p.price)}</p>
            <button onClick={() => handleAdd(p.id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function placeholderImage(path) {
  const map = {
    '/images/tee.jpg': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23dbeafe"/><stop offset="100%" stop-color="%23dcfce7"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g1)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%230f172a" font-family="Segoe UI, Arial">Vibe Tee</text></svg>',
    '/images/hoodie.jpg': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><defs><linearGradient id="g2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23fee2e2"/><stop offset="100%" stop-color="%23fef3c7"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g2)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%230f172a" font-family="Segoe UI, Arial">Vibe Hoodie</text></svg>',
    '/images/cap.jpg': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><defs><linearGradient id="g3" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="%23e9d5ff"/><stop offset="100%" stop-color="%23cffafe"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g3)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%230f172a" font-family="Segoe UI, Arial">Vibe Cap</text></svg>',
    '/images/sneakers.jpg': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="%23fef9c3"/><stop offset="100%" stop-color="%23e0e7ff"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g4)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%230f172a" font-family="Segoe UI, Arial">Vibe Sneakers</text></svg>',
    '/images/socks.jpg': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><defs><linearGradient id="g5" x1="1" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="%23f1f5f9"/><stop offset="100%" stop-color="%23ffe4e6"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g5)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%230f172a" font-family="Segoe UI, Arial">Vibe Socks</text></svg>',
    '/images/tote.jpg': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><defs><linearGradient id="g6" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="%23dcfce7"/><stop offset="100%" stop-color="%23f1f5f9"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g6)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30" fill="%230f172a" font-family="Segoe UI, Arial">Vibe Tote</text></svg>'
  };
  return map[path] || map['/images/tee.jpg'];
}


