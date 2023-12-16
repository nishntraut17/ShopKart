import React from 'react';
import Footer from '../../components/Footer/Footer';
import Category from '../../components/Home/Category';
import Brand from '../../components/Home/Brands';
import Banner from '../../components/Home/Banner';

const Home = () => {
    return (
        <>
            <Banner />
            <Category />
            <Brand />
            <Category />
            <Footer />
        </>
    )
}

export default Home;