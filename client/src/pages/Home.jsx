import React from 'react';
import ProductList from '../components/ProductList';
import Navbar from '../components/Navbar';
import Temp from './Temp';

const Home = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Temp />
            <ProductList />
        </>
    )
}

export default Home;