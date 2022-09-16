import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/notfound/NotFound';
import Navigation from './navigation/Navigation';
import Products from './pages/Products/Products';
import Product from './pages/Products/Product';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
