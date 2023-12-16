/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart, removeFromCart, selectCartItems } from '../../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

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
        <div className="container mx-auto p-8">
            <div className='flex flex-row'>
                <div>
                    <img src={product.productImage} alt={product.name} className="mb-4 rounded-lg" />
                </div>
                <div className='flex flex-col'>
                    <p className="text-2xl font-bold mb-4">{product.name}</p>
                    <h1>Brand: {product.brand}</h1>
                    <h1>Category: {product.category}</h1>
                    <p className="text-lg font-semibold mb-4">INR: {product.price}</p>
                    <div className='flex flex-col'>
                        <h1>Description:</h1>
                        <h1> {product.description}</h1>
                    </div>
                </div>
            </div>
            {/* <p className="text-gray-700 mb-4">{product.description}</p> */}

            <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Add to Cart
            </button>
            <Link to="/checkout">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Checkout
                </button>
            </Link>
        </div>
    );
};

export default SingleProduct;
