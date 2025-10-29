import ProductList from '../components/ProductList.jsx';

export default function HomePage() {
  return (
    <section>
      <div className="hero">
        <h1>Vibe Commerce</h1>
        <p>Discover mock products, add to cart, and try a full checkout flow.</p>
      </div>
      <h2>Products</h2>
      <ProductList />
    </section>
  );
}


