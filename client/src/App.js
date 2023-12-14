import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import './App.css';
import Home from './pages/Home';
import SingleProduct from './pages/product/SingleProduct';
import Checkout from './pages/Cart/Checkout';

const AddProduct = lazy(() => import("./components/AddProduct"));
const Navbar = lazy(() => import("./components/Navbar"));
const ProductList = lazy(() => import("./components/ProductList"));
const AllUsers = lazy(() => import('./pages/AllUsers'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));


function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback="...Loading">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/:id' element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
