import React from 'react';
import SmallCard from '../../components/SmallCard';
import Banner from '../../components/Banner';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <div className='px-20'>
                <SmallCard category={"Mobile"} />
            </div>
            <div className='px-20'>
                <SmallCard category={"Laptop"} />
            </div>
            <div className='px-20'>
                <SmallCard category={"Headphones"} />
            </div>
            <div className='px-20'>
                <SmallCard category={"Smart Watches"} />
            </div>
        </div>
    )
}

export default Home;