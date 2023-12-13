import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import './App.css';

const AddProduct = lazy(() => import("./components/AddProduct"));
const Navbar = lazy(() => import("./components/Navbar"));
const ProductList = lazy(() => import("./components/ProductList"));
const AllUsers = lazy(() => import('./pages/AllUsers'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));


function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback="...Loading">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
