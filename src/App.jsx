import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerImage from './assets/images/banner/city.jpg';
import { CartProvider, useCart } from './context/CartContext';
import CartSidebar from './components/CartSidebar';
import ScrollToTop from './components/ScrollToTop';

import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import DeliveryPage from './pages/DeliveryPage'; 

const Navbar = () => {
  const { toggleCart, cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  
  //"Entregas" 
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Tecnología", path: "/tecnologia" },
    { name: "Ropa", path: "/ropa" },
    { name: "Calzado", path: "/calzado" },
    { name: "Catálogos", path: "/belleza" },
    { name: "Entregas", path: "/entrega" }, 
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="text-2xl font-bold tracking-wider text-white flex-shrink-0">FREE'S<span className="text-brand-primary">.</span></Link>
          <div className="hidden lg:flex space-x-6 flex-shrink-0">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-brand-primary' : 'text-gray-300 hover:text-white'}`}>{link.name}</Link>
            ))}
          </div>
          {}
          <div className="hidden md:flex flex-1 max-w-sm relative">
             <input type="text" placeholder="Buscar productos..." className="w-full bg-zinc-800 text-white pl-4 pr-10 py-2 rounded-full text-sm border border-transparent focus:border-brand-primary outline-none transition-all"/>
             <Search size={16} className="absolute right-3 top-2.5 text-gray-400"/>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={toggleCart} className="relative p-2 text-white hover:text-brand-primary transition">
                <ShoppingCart />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white"><Menu /></button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-zinc-900 border-b border-gray-800 p-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="block py-2 text-white" onClick={() => setIsOpen(false)}>{link.name}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const HomePage = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})`, opacity: 0.5 }}></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
    <div className="relative z-10 text-center px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-2 text-white">ESTILO <span className="text-brand-primary">FREE'S</span></h1>
        <p className="text-xl text-gray-300 font-semibold tracking-widest uppercase">Tecnología • Moda • Belleza</p>
      </motion.div>
    </div>
  </section>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen font-sans text-gray-100 bg-black selection:bg-brand-primary selection:text-white">
          <Navbar />
          <CartSidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tecnologia" element={<CategoryPage category="tech" title="TECH ZONE" subtitle="Gadgets y accesorios" />} />
            <Route path="/ropa" element={<CategoryPage category="clothes" title="MODA & ESTILO" subtitle="Tendencias 2025" />} />
            <Route path="/calzado" element={<CategoryPage category="shoes" title="SNEAKERS" subtitle="Pasos firmes" />} />
            <Route path="/belleza" element={<CategoryPage category="catalog" title="CATÁLOGOS" subtitle="Tus marcas favoritas" />} />
            
            {/* NUEVA RUTA DE ENTREGAS */}
            <Route path="/entrega" element={<DeliveryPage />} />
            
            <Route path="/product/:slug" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
export default App;