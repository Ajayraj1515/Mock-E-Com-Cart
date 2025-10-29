import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import Navbar from './components/Navbar.jsx';
import { ToastProvider } from './components/ToastContext.jsx';

export default function App() {
  return (
    <ToastProvider>
      <div className="app-container">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  );
}


