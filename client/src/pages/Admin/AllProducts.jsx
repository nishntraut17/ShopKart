import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ComponentLoading from '../../components/ComponentLoading';
import NoData from "../../components/NoData";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllApp = async (e) => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://shopkart-backend-ko76.onrender.com/api/product/', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })

            setProducts(data);
            setLoading(false)
        } catch (error) { console.log(error) }
    };

    const deleteUser = async (userId) => {
        try {
            const confirm = window.confirm("Are you sure you want to Delete?");
            if (confirm) {
                await toast.promise(
                    axios.delete(
                        `https://shopkart-backend-ko76.onrender.com/api/product/${userId}`,
                        {
                            headers: {
                                'authorization': `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    ),
                    axios.delete(
                        `https://shopkart-backend-ko76.onrender.com/api/order/${userId}`,
                        {
                            headers: {
                                'authorization': `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    ),
                    {
                        success: "Product Deleted Successfully",
                        error: "Unable to Delete",
                        loading: "please wait...",
                    }
                );
                getAllApp();
            }
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        getAllApp();
    }, []);

    return (
        <>
            {loading ? (
                <ComponentLoading />
            ) : (
                <section className="overflow-auto scrollbar-hide max-h-[800px]">
                    <h3 className="bg-[#f4f4f4] p-4 border-gray-200 ">All Products</h3>
                    {products.length > 0 ? (
                        <table className="text-gray-600 border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">S.No</th>
                                    <th className="px-4 py-2">Pic</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Brand</th>
                                    <th className="px-4 py-2">Seller</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((ele, i) => {
                                    return (
                                        <tr key={ele?._id} className="">
                                            <td className="px-4 py-2">{i + 1}</td>
                                            <td className="px-4 py-2">
                                                <Link to={`/product/${ele?._id}`}>
                                                    <img
                                                        className="h-20 w-20"
                                                        src={
                                                            ele?.productImages[0] ||
                                                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                                        }
                                                        alt={ele?._id}
                                                    />
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2">{ele?.name}</td>
                                            <td className="px-4 py-2">{ele?.price}</td>
                                            <td className="px-4 py-2">{ele?.category}</td>
                                            <td className="px-4 py-2">{ele?.brand}</td>
                                            <td className="px-4 py-2">{ele?.seller?.name}</td>
                                            {console.log(ele)}
                                            <td className="px-4 py-2">
                                                <Link to={`/product/updateproduct/${ele?._id}`} className="border-3 border-gray-400 bg-gray-200 rounded p-1 mx-1"> Edit</Link>
                                                <button
                                                    className="border-3 border-gray-400 bg-gray-200 rounded p-1"
                                                    onClick={() => {
                                                        deleteUser(ele?._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <NoData text={"Products"} />
                    )}
                </section>
            )}
        </>
    );
};

export default AllProducts;
