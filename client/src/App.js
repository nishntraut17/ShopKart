import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './redux/reducers/authSlice';
import { jwtDecode } from 'jwt-decode';
import { Admin, Seller, Public, Protected } from './middleware/route';

const Home = lazy(() => import('./pages/Home/Home'));
const SingleProduct = lazy(() => import('./pages/product/SingleProduct'));
const Checkout = lazy(() => import('./pages/Orders/Checkout'));
const AllOrders = lazy(() => import('./pages/Orders/AllOrders'));
const ProductsPage = lazy(() => import('./pages/product/ProductsPage'));
const RootLayout = lazy(() => import('./pages/RootLayout'));
const Success = lazy(() => import('./pages/Orders/Success'));
const PageLoading = lazy(() => import('./components/PageLoading'));
const Profile = lazy(() => import('./pages/Users/Profile'));
const UpdateProfile = lazy(() => import('./pages/Users/UpdateProfile'));
const BecomeASeller = lazy(() => import('./pages/Users/BecomeASeller'));
const Error = lazy(() => import('./pages/Error'));  // Changed to ErrorPage to avoid conflicts with the built-in Error object
const UpdateProduct = lazy(() => import('./pages/product/UpdateProduct'));
const MyItems = lazy(() => import('./pages/product/MyItems'));

const AdminApplications = lazy(() => import('./pages/Admin/AdminApplications'));
const AllUsers = lazy(() => import('./pages/Admin/AllUsers'));
const AllProducts = lazy(() => import('./pages/Admin/AllProducts'));
const DashboardLayout = lazy(() => import('./pages/Admin/DashboardLayout'));


const AddProduct = lazy(() => import("./pages/product/AddProduct"));
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));


function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setUserInfo(jwtDecode(token)));
  }
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
            <Route path='/product/updateproduct/:id' element={<Seller><UpdateProduct /></Seller>} />
            <Route path='/product/:id' element={<Public><SingleProduct /></Public>} />
            <Route path="/orders/checkout" element={<Protected><Checkout /></Protected>} />
            <Route path="/product" element={<Public><ProductsPage /></Public>} />
            <Route path='/orders' element={<Protected><AllOrders /></Protected>} />
            <Route path='/success' element={<Protected><Success /></Protected>} />
            <Route path="/profile/:id" element={<Protected><Profile /></Protected>} />
            <Route path='/profile/updateprofile/:id' element={<Protected><UpdateProfile /></Protected>} />
            <Route path='/seller' element={<Protected><BecomeASeller /></Protected>} />
            <Route path='/product/my-items' element={<Seller><MyItems /></Seller>} />
            <Route path='/*' element={<Public><Error /></Public>} />
          </Route>
          <Route
            path="/admin"
            element={<Admin><DashboardLayout /></Admin>}
          >
            <Route
              path="/admin/allusers"
              element={<Admin><AllUsers /></Admin>}
            />
            <Route
              path="/admin/allproducts"
              element={<Admin><AllProducts /></Admin>}
            />
            <Route
              path="/admin/applications"
              element={<Admin><AdminApplications /></Admin>}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
