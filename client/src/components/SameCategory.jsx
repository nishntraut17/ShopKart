import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SameCategory({ category, prod }) {
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
                let data = response.data.filter((ele) => {
                    return ele._id !== prod._id;
                }).slice(0, 6);

                setProducts(data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [category, prod]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div >
            <div className=" bg-[#f4f4f4] border-r-2 border-gray-200 rounded-xl my-16 flex gap-4 flex-col p-8 mx-2">
                <h2 className="text-2xl font-bold text-gray-700 ">Similar Products ...</h2>

                <Slider {...settings}>
                    {products.map((item, i) => (
                        <Link to={`/product/${item._id}`}>
                            <div key={i} className="bg-white rounded-lg border-2 flex flex-col items-center justify-center gap-1 p-1 hover:scale-105">
                                <div className="overflow-hidden border rounded-lg hover:opacity-75 w-48 h-48">
                                    <img
                                        src={item.productImages[0]}
                                        alt="item"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500 p-2">
                                    {item.name}
                                </h3>
                                <p className="font-semibold text-gray-900 p-2">₹ {item.price}</p>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
