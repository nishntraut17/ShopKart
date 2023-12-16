import React from 'react'
import AmazonBanner from "../static/amazonbanner.jpg";
import Flipkart3 from "../static/flipkart3.png";

const Banner = () => {
    return (
        <div>
            <div className="relative px-20 h-100 w-auto overflow-hidden rounded-lg">
                <img src={AmazonBanner} alt="" className='' />
                {/* <img src={Flipkart3} alt="" className='' /> */}
            </div>
        </div>
    )
}

export default Banner;