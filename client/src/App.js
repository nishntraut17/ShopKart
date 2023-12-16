import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import SingleProduct from './pages/product/SingleProduct';
import Checkout from './pages/Orders/Checkout';
import AllOrders from './pages/Orders/AllOrders';
import ProductsPage from './pages/product/ProductsPage';

const AddProduct = lazy(() => import("./components/Product/AddProduct"));
const Navbar = lazy(() => import("./components/Header/Navbar"));
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback="...Loading">
        <Navbar />
        <Routes>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/product/addproduct' element={<AddProduct />} />
          <Route path='/:id' element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path='/orders' element={<AllOrders />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
