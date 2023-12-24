import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import SingleProduct from './pages/product/SingleProduct';
import Checkout from './pages/Orders/Checkout';
import AllOrders from './pages/Orders/AllOrders';
import ProductsPage from './pages/product/ProductsPage';
import RootLayout from './pages/RootLayout';
import Success from './pages/Orders/Success';
import PageLoading from "./components/loading/PageLoading";
import Profile from './pages/Users/Profile';
import UpdateProfile from './pages/Users/UpdateProfile';
import BecomeASeller from './pages/BecomeASeller';
import Error from './pages/Error';
import ItemsSold from './pages/product/ItemsSold';
import { Admin, Seller, Public, Protected } from "./middleware/route";

const AddProduct = lazy(() => import("./components/Product/AddProduct"));
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Public><Signup /></Public>} />
          <Route path="/" element={<RootLayout />}>
            <Route path='/' element={<Public><Home /></Public>} />
            <Route path='/product/addproduct' element={<Seller><AddProduct /></Seller>} />
            <Route path='/product/:id' element={<Public><SingleProduct /></Public>} />
            <Route path="/orders/checkout" element={<Protected><Checkout /></Protected>} />
            <Route path="/product" element={<Public><ProductsPage /></Public>} />
            <Route path='/orders' element={<Protected><AllOrders /></Protected>} />
            <Route path='/orders/success' element={<Protected><Success /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path='/profile/updateprofile' element={<Protected><UpdateProfile /></Protected>} />
            <Route path='/seller' element={<Protected><BecomeASeller /></Protected>} />
            <Route path='/product/items-sold' element={<Seller><ItemsSold /></Seller>} />
            <Route path='/*' element={<Public><Error /></Public>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
