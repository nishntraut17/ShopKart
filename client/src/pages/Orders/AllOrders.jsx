import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await toast.promise(
                    axios.get("http://localhost:5000/api/order", {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }),
                    {
                        success: "Login successfully",
                        error: "Unable to login user",
                        loading: "Logging user...",
                    }
                );
                setOrders(response.data);
                console.log(orders);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (

        <div className="flex flex-col px-32 py-16">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="py-3">Image</th>
                        <th className="py-3">Name</th>
                        <th className="py-3">Price</th>
                        <th className="py-3">Quantity</th>
                        <th className="py-3">Order Placed at</th>
                        <th className="py-3">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, i) => (
                        <tr key={i} className="mb-4">
                            <td className=''>
                                <img
                                    src={item.product.productImage}
                                    alt="order product"
                                    className="mx-auto h-20 w-20"
                                />
                            </td>
                            <td className="text-center">{item.product.name}</td>
                            <td className="text-center">{item.product.price}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{item.createdAt}</td>
                            <td className="text-center">{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default AllOrders