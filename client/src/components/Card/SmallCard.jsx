import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ComponentLoading from "../../components/loading/ComponentLoading"

export default function SmallCard({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/category/${category}`);
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
        <div >
            <div className=" bg-slate-100 rounded-xl my-16 flex gap-4 flex-col p-8">
                <h2 className="text-2xl font-bold text-gray-700 ">Top {category} ...</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 h-auto">
                    {products.map((item, i) => (
                        <Link to={`/product/${item._id}`}>
                            <div key={i} className="bg-white rounded-lg flex flex-col items-center justify-center gap-1 p-1 hover:shadow-md hover:z-10">
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
            </div>
        </div>
    )
}
