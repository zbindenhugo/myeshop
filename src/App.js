import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/notfound/NotFound';
import Navigation from './navigation/Navigation';
import Products from './pages/Products/Products';
import Product from './pages/Products/Product';
import ProductsCategory from './pages/Products/ProductsCategory';
import { CartProvider } from './contexts/Contexts';

function App() {
  return (
    <CartProvider>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/category/:id' element={<ProductsCategory />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
