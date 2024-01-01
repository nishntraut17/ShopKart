import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ComponentLoading from "./ComponentLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SmallCard({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://shopkart-backend-ko76.onrender.com/api/product/category/${category}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [category]);

    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className="">
            <div className=" my-16 flex gap-4 flex-col p-8 border-2 border-gray-100 bg-[#fbfbfb] rounded">
                <h2 className="text-2xl font-bold text-gray-700 ">Top {category} ...</h2>

                <Slider {...settings}>
                    {products.map((item, i) => (
                        <Link to={`/product/${item._id}`}>
                            <div key={i} className="group relative hover:rounded-md hover:scale-105 hover:z-10 hover:shadow">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 ">
                                    <img
                                        src={item.productImages[0]}
                                        alt="imageAlternative"
                                        className="h-3/4 w-3/4 object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500 p-1">
                                    {item.name}
                                </h3>
                                <p className="text-base font-semibold text-gray-900 p-1">₹ {item.price}</p>
                            </div>
                        </Link>

                    ))}
                </Slider>
            </div>
        </div>
    )
}
