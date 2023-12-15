// CheckoutPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { addToCart, removeFromCart, removeSingleItem, emptyCart } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        toast.success("Item Removed From cart");
    };

    const handleAddSingleQuantity = (product) => {
        dispatch(addToCart(product));
        toast.success("Item quantity Increased");
    }

    const handleRemoveSingleItem = (product) => {
        dispatch(removeSingleItem(product));
        toast.success("Item quantity reduced");
    }

    const handleEmptyCart = () => {
        dispatch(emptyCart());
        toast.success("Your cart is empty");
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };


    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} onRemove={handleRemoveFromCart} onRemoveOneQuantity={handleRemoveSingleItem} onAddOneQuantity={handleAddSingleQuantity} />
                ))}
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Total: ${calculateTotal()}</h3>
                <button onClick={handleEmptyCart} className="px-6 py-2 text-white bg-red-500 rounded hover: transition duration-300 ease-in-out">Empty Cart</button>
                <form>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />

                    <label htmlFor="address" className="block mt-4 text-sm font-medium text-gray-600">
                        Address:
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
