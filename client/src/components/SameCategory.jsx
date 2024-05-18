import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SameCategory({ category, prod }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${backendUrl}/product/category/${category}`);
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
    }, [backendUrl, category, prod]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div >
            <div className=" bg-[#f4f4f4] border-r-2 border-gray-200 rounded-xl my-16 flex flex-col gap-4 p-8 mx-2">
                <h2 className="text-2xl font-bold text-gray-700 ">Similar Products ...</h2>

                {
                    <div className="flex flex-col md:flex-row">
                        {products.map((item, i) => (
                            <Link to={`/product/${item._id}`} key={i}>
                                <div className="bg-white rounded-lg border-2 flex flex-col min-w-max items-center justify-center gap-1 p-1 hover:scale-105" onClick={handleClick}>
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
                    </div>
                }
            </div>
        </div>
    )
}