import React from 'react';
import Footer from '../components/Footer';
import Category from '../components/Category';
import Brand from '../components/Brands';
import Banner from '../components/Banner';
import CartBox from '../components/Header/CartBox';

const Home = () => {
    return (
        <>
            <CartBox />
            <Banner />
            <Category />
            <Brand />
            <Category />
            <Footer />
        </>
    )
}

export default Home;