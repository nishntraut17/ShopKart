import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoData from '../../components/noData/NoData';
import ComponentLoading from "../../components/loading/ComponentLoading";
import { format } from "date-fns";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:5000/api/order", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setOrders(response.data);
                console.log(orders);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [orders]);

    if (loading) {
        return <ComponentLoading />
    }

    return (

        <div className="flex flex-col px-32 py-16">
            {orders.length && <table className="min-w-full divide-y divide-gray-200">
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
                    {orders.length && orders.map((item, i) => (
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
                            <td className="text-center">{format(item.createdAt, 'dd/MM/yyyy')}</td>
                            <td className="text-center">{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            {!orders.length && <NoData text={"Orders"} />}
        </div>

    )
}

export default AllOrders