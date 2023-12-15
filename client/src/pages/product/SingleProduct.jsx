/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { addToCart, removeFromCart, selectCartItems } from '../../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const handleAddToCart = () => {

        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    const cartItems = useSelector(selectCartItems);
    const isInCart = cartItems.some(item => item.id === product.id);

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
        <div>
            <img src={product.productImage} alt="" />
            <p>{product.price}</p>
            <p>{product.name}</p>
            {isInCart ? (
                <>
                    <button onClick={handleRemoveFromCart}>Remove from Cart</button>
                    <Link to="/checkout">
                        <p>checkout</p>
                    </Link>
                </>
            ) : (
                <button onClick={handleAddToCart}>Add to Cart</button>
            )}
        </div>
    )
}

export default SingleProduct