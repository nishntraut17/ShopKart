import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoData from '../../components/NoData';
import ComponentLoading from "../../components/ComponentLoading";
import { format } from "date-fns";
import Modal from "./Modal";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${backendUrl}/order`, {
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
    }, [setSelectedOrder, orders, backendUrl]);
    const handleRatingChange = (val) => {
        setRating(val);
    };

    const handleReviewChange = (val) => {
        setReview(val);
    };

    const handleRatingReviewSubmit = async () => {

        await toast.promise(
            axios.put(`${backendUrl}/product/rate/${selectedOrder.product._id}`, {
                rating,
            }, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            axios.put(`${backendUrl}/product/comment/${selectedOrder.product._id}`, {
                comment: review,
            }, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            axios.put(`${backendUrl}/order/${selectedOrder._id}`, {
                disableReview: true,
            }, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }), {
            success: "Review Added Successfully",
            error: "Unable to add review",
            loading: "Adding review",
        }
        )


        setRating(0);
        setReview("");
        setModalOpen(false);
    };

    if (loading) {
        return <ComponentLoading />
    }

    return (

        <div className="flex flex-col px-32 py-16">
            {orders.length > 0 && <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="py-3">Image</th>
                        <th className="py-3">Name</th>
                        <th className="py-3">Price</th>
                        <th className="py-3">Quantity</th>
                        <th className="py-3">Order Placed at</th>
                        <th className="py-3">Address</th>
                        <th className='py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((item, i) => (
                        <tr key={i} className="mb-4">
                            <td className=''>
                                <Link to={`/product/${item?.product?._id}`}>
                                    <img
                                        src={item?.product?.productImages[0]}
                                        alt="order product"
                                        className="mx-auto h-20 w-20 rounded-md"
                                    />
                                </Link>
                            </td>
                            <td className="text-center">{item?.product?.name}</td>
                            <td className="text-center">{item?.product?.price}</td>
                            <td className="text-center">{item?.quantity}</td>
                            <td className="text-center">{format(item?.createdAt, 'dd/MM/yyyy')}</td>
                            <td className="text-center">{item?.address}</td>
                            <td >
                                <button disabled={item.disableReview} onClick={() => {
                                    setSelectedOrder(item);
                                    setModalOpen(true);
                                }

                                }
                                    className={`${item.disableReview ? "" : "border-gray-300 bg-slate-200 rounded-md hover:scale-105 p-2 border-2"} text-center`}>
                                    {
                                        item.disableReview ? "Product Reviewed" : "Add Rating & Review"
                                    }
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            {orders.length === 0 && <NoData text={"Orders"} />}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleRatingReviewSubmit}
                rating={rating}
                review={review}
                handleRatingChange={handleRatingChange}
                handleReviewChange={handleReviewChange}
                selectedOrder={selectedOrder}
            />
        </div>

    )
}

export default AllOrders