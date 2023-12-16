/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart, removeFromCart, selectCartItems } from '../../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Rating } from '@mui/material';
import Comment from '../../components/comment/Comment';
import NoData from "../../components/noData/NoData";

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success("Added to cart");
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setProduct(response.data);
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
        <div className="container mx-auto py-16 px-32">
            <div className='flex flex-row'>
                <div>
                    <img src={product.productImage} alt={product.name} className="mb-4 rounded-lg" />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row gap-10'>
                        <p className="text-2xl font-bold mb-4 py-2">{product.name}</p>
                        <Rating
                            value={5}
                            size={"medium"}
                            className='p-3'
                            readOnly
                        />
                    </div>
                    <h1 className="text-xl font-semibold mb-4">Brand: {product.brand}</h1>
                    <h1 className="text-xl font-semibold mb-4">Category: {product.category}</h1>
                    <p className="text-lg font-semibold mb-4">INR: {product.price}</p>
                    <div className='flex flex-col'>
                        <h1 className="text-xl font-semibold mb-4">Description:</h1>
                        <h1 className="text-lg font-semibold mb-4"> {product.description}</h1>
                    </div>
                    <div className='flex flex-row gap-10'>
                        <button
                            onClick={handleAddToCart}
                            className="bg-grey-700 px-4 py-2 rounded-md hover:bg-grey-1000"
                        >
                            Add to Cart
                        </button>
                        <Link to="/checkout">
                            <button className="bg-grey-700 px-4 py-2 rounded-md hover:bg-grey-1000">
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <p className="text-gray-700 mb-4">{product.description}</p> */}
            <div className="w-full sm:w-4/5 mx-auto flex flex-col gap-6">
                <h3 className="font-bold text-2xl">Comments</h3>
                {product?.comments?.length ? (
                    <div className="flex flex-col gap-6">
                        {product?.comments?.map((comment) => (
                            <Comment
                                key={comment?._id}
                                comment={comment}
                                userId={product?.userId}
                            // handleDeleteComment={handleDeleteComment}
                            />
                        ))}
                    </div>
                ) : (
                    <NoData text={"Comments"} />
                )}
            </div>
        </div>
    );
};

export default SingleProduct;
