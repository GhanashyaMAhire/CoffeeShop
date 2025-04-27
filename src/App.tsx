import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Auth from './pages/Auth';
import Account from './pages/Account';
import AccountOrders from './pages/AccountOrders';
import AccountSettings from './pages/AccountSettings';
import AccountPayment from './pages/AccountPayment';
import AccountWishlist from './pages/AccountWishlist';
import About from './pages/About';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<AccountOrders />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/account/payment" element={<AccountPayment />} />
          <Route path="/account/wishlist" element={<AccountWishlist />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;