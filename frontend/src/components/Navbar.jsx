import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Vibe Commerce</Link>
      </div>
      <div className="nav-links">
        <NavLink to="/" end>
          Products
        </NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </div>
    </nav>
  );
}


