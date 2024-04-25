import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AmazonBanner from "../assets/amazonbanner.jpg";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/banner3_.jpg"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
//
const Banner = () => {
    return (
        <div className="relative px-20 md:block lg:h-96 hidden w-auto overflow-hidden rounded-lg">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}

                modules={[Autoplay, Pagination, Navigation]}
                className="relative px-20 h-96 w-full overflow-hidden rounded-lg"
            >
                <SwiperSlide><img src={AmazonBanner} alt='amazon banner' className='w-full h-full' /></SwiperSlide>
                <SwiperSlide><img src={Banner2} alt='banner 2' className='w-full h-full' /></SwiperSlide>
                <SwiperSlide><img src={Banner3} alt='banner 2' className='w-full h-full' /></SwiperSlide>
            </Swiper>
        </div>
    );
}


export default Banner;
