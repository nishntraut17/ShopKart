import React from 'react';
import SmallCard from '../../components/Card/SmallCard';
import Banner from '../../components/Home/Banner';

const Home = () => {
    return (
        <>
            <Banner />
            <div className='px-20'>
                <SmallCard category={"Mobile"} />
            </div>
            <div className='px-20'>
                <SmallCard category={"Tablet"} />
            </div>
            <div className='px-20'>
                <SmallCard category={"Television"} />
            </div>
            <div className='px-20'>
                <SmallCard category={"Smart watch"} />
            </div>
        </>
    )
}

export default Home;