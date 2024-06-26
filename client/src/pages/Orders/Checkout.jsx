// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import ComponentLoading from "../../components/ComponentLoading";
import { selectCurrentUser } from '../../redux/reducers/authSlice';

const CheckoutPage = () => {
    const [address, setAddress] = useState("");
    const cartItems = useSelector((state) => state.cart.items);
    const [user] = useState(useSelector(selectCurrentUser));
    const [loading, setLoading] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/user/${user.userId}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(data);
                setAddress(data.address);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            if (address === "") {
                toast.error("Please enter your address!!");
                return;
            }
            console.log(localStorage.getItem("token"));
            const body = {
                products: cartItems
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const response = await fetch(`${backendUrl}/create-checkout-session`, {
                method: "POST",
                headers: headers,
                mode: "cors",
                body: JSON.stringify(body)
            }
            )
            const session = await response.json();

            await axios.post(`${backendUrl}/order`, {
                orderItems
            },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(session);
            window.location = session.url;

        } catch (error) {
            console.log(error);
        }

    }

    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className="container mx-auto px-16 flex flex-col gap-6 lg:px-32 lg:scale-110">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="flex flex-col gap-4 p-4">
                {cartItems.map((item) => (
                    <div className=' w-52'>
                        <div className='flex flex-row border border-gray-100 hover:opacity-70 rounded-lg p-2'>
                            <div className='flex flex-col'>
                                <h1>{item.name}</h1>
                                <h1>₹ {item.price}</h1>
                            </div>
                            <img src={item.productImages[0]} alt="cart-item" className='h-20 w-20' />
                        </div>
                        <div>
                            <h1>Quantity: {item.quantity}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Total: ₹ {calculateTotal()}</h3>
            <div className='flex gap-4'>
                <label className='text-slate-800'>Enter your address for Shipment:   </label>
                <input
                    type="text"
                    name="address"
                    placeholder="Your address goes here.."
                    value={address}
                    onChange={inputChange}
                    className=' h-8 w-full'
                />
            </div>

            <div className="mt-8 flex flex-row gap-2 items-end ">
                <Link to="/product" className='p-2 border border-slate-200 hover:border-slate-300 rounded-lg'>Continue Shopping</Link>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={makePayment}
                >
                    Make Payment
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
