import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ComponentLoading from '../../components/loading/ComponentLoading';
import NoData from "../../components/noData/NoData";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllApp = async (e) => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:5000/api/product/', {
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
            const confirm = window.confirm("Are you sure you want to accept?");
            if (confirm) {
                await toast.promise(
                    axios.delete(
                        `http://localhost:5000/api/product/${userId}`,
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
                <section className="">
                    <h3 className="bg-[#f4f4f4] p-4 border-gray-200 ">All Products</h3>
                    {products.length > 0 ? (
                        <div className="">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Pic</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Brand</th>
                                        <th>Seller</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((ele, i) => {
                                        return (
                                            <tr key={ele?._id}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <img
                                                        className="h-20 w-20"
                                                        src={
                                                            ele?.productImages[0] ||
                                                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                                        }
                                                        alt={ele?._id}
                                                    />
                                                </td>
                                                <td>{ele?.name}</td>
                                                <td>{ele?.price}</td>
                                                <td>{ele?.category}</td>
                                                <td>{ele?.brand}</td>
                                                <td>{ele?.seller}</td>
                                                <td className="">
                                                    <button
                                                        className=""
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
                        </div>
                    ) : (
                        <NoData />
                    )}
                </section>
            )}
        </>
    );
};

export default AllProducts;
