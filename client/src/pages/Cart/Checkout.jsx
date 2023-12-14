// CheckoutPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { removeFromCart } from '../../features/cart/cartSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    //   const calculateTotal = () => {
    //     return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    //   };

    return (
        <div>
            <h2>Checkout</h2>
            <div>
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} onRemove={handleRemoveFromCart} />
                ))}
            </div>
            <div>
                {/* <h3>Total: ${calculateTotal()}</h3> */}
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" required />

                    <button type="submit">Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
