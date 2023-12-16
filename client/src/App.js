import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import './App.css';
import Home from './pages/Home';
import SingleProduct from './pages/product/SingleProduct';
import Checkout from './pages/Cart/Checkout';
import AllOrders from './components/AllOrders';
import Cart from './pages/Cart/Cart';
import ProductsPage from './pages/product/ProductsPage';

const AddProduct = lazy(() => import("./components/AddProduct"));
const Navbar = lazy(() => import("./components/Header/Navbar"));
const ProductList = lazy(() => import("./components/ProductList"));
const AllUsers = lazy(() => import('./pages/AllUsers'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback="...Loading">
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/:id' element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/allproduct" element={<ProductsPage />} />
          <Route path='/orders' element={<AllOrders />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
