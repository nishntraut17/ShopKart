// CheckoutPage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
    const [address, setAddress] = useState("");
    const cartItems = useSelector((state) => state.cart.items);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const cartItemIdQuantity = cartItems.map(({ _id, quantity }) => ({ _id, quantity }));
    const orderItems = cartItemIdQuantity.map((item) => ({ ...item, address }));

    const inputChange = (e) => {
        const { value } = e.target;
        return setAddress(value);
    }



    //payment integration
    const makePayment = async () => {
        try {
            console.log("ok");
            console.log(localStorage.getItem("token"));
            console.log(orderItems);
            const body = {
                products: cartItems
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const response = await fetch("http://localhost:5000/api/create-checkout-session", {
                method: "POST",
                headers: headers,
                mode: "cors",
                body: JSON.stringify(body)
            }
            )
            const session = await response.json();

            await toast.promise(
                axios.post("http://localhost:5000/api/order", {
                    orderItems
                },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ),
                {
                    success: "Order Placed",
                    error: "Error while Placed Order",
                    loading: "Loading...",
                }
            );
            console.log(session);
            window.location = session.url;

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.map((item) => (
                    <div>
                        <h1>{item.name}</h1>
                        <h1>{item.price}</h1>
                        <img src={item.productImage} alt="cart-item" />
                    </div>
                ))}
            </div>

            <div>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={inputChange}
                />
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Total: ${calculateTotal()}</h3>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={makePayment}
                >
                    Make Payment
                </button>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
};

export default CheckoutPage;
