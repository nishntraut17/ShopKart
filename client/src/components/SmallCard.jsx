import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ComponentLoading from "./ComponentLoading";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SmallCard({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

    function getItemsToShow() {
        if (window.innerWidth >= 1024) {
            return 6; // Large screen: Show 6 items
        } else if (window.innerWidth >= 640) {
            return 4; // Medium screen: Show 4 items
        } else {
            return 2; // Small screen: Show 2 items
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/category/${category}`);
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

    useEffect(() => {
        function handleResize() {
            setItemsToShow(getItemsToShow());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className="">
            <div className="my-16 flex gap-4 flex-col p-8 border-2 border-gray-100 bg-[#fbfbfb] rounded">
                <h2 className="text-2xl font-bold text-gray-700 ">Top {category} ...</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {products.slice(0, itemsToShow).map((item, i) => (
                        <Link to={`/product/${item._id}`} key={i}>
                            <div className="group relative hover:rounded-md hover:scale-105 hover:z-10 hover:shadow">
                                <div className="relative overflow-hidden rounded-lg bg-white aspect-w-1 aspect-h-1">
                                    <img
                                        src={item.productImages[0]}
                                        alt="imageAlternative"
                                        className="object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500 p-1">
                                    {item.name}
                                </h3>
                                <p className="text-base font-semibold text-gray-900 p-1">₹ {item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
