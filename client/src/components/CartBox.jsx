import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import { setOpen, selectCartOpen, addToCart, removeFromCart, removeSingleItem, emptyCart } from '../redux/reducers/cartSlice';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import CartBoxItem from './CartBoxItem';

export default function CartBox() {
    const dispatch = useDispatch();
    const open = useSelector(selectCartOpen);

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
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => dispatch(setOpen(false))}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <p role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cartItems.map((product) => (
                                                            <CartBoxItem item={product} id={product._id} name={product.name} brand={product.brand} quantity={product.quantity} price={product.price} image={product.productImages[0]} onRemove={handleRemoveFromCart} onRemoveOneQuantity={handleRemoveSingleItem} onAddOneQuantity={handleAddSingleQuantity} />
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p> ₹ {calculateTotal()}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <div
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-grey-600 px-6 py-3 text-base font-medium shadow-sm hover:bg-grey-700 cursor-pointer"
                                                    onClick={handleEmptyCart}
                                                >
                                                    Empty Cart
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <Link
                                                    to="/orders/checkout"
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    onClick={() => dispatch(setOpen(false))}
                                                >
                                                    Checkout
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => dispatch(setOpen(false))}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
