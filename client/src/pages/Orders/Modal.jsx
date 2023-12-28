// Modal.jsx
import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { Rating } from '@mui/material';

const Modal = ({ isOpen, onClose, onSubmit, rating, review, handleRatingChange, handleReviewChange, selectedOrder }) => {
    if (!selectedOrder) {
        return null; // Don't render the modal if no order is selected
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-hidden z-50"
                onClose={onClose}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="translate-y-0 sm:scale-100"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-y-0 sm:scale-100"
                        leaveTo="translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="fixed inset-0 overflow-hidden z-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
                                {/* Your Modal Content Here */}
                                <h2 className="text-lg font-medium text-gray-900 px-6 py-4 bg-gray-100 border-b">Rating & Review for {selectedOrder.product.name}</h2>
                                <div className="p-6">
                                    {/* Order details, Rating and Review inputs, and buttons */}
                                    <p>Price: {selectedOrder.product.price}</p>
                                    <p>Quantity: {selectedOrder.quantity}</p>
                                    {/* ... (other order details) */}
                                    <label>
                                        Rating:
                                        {/* <select value={rating} onChange={(e) => handleRatingChange(parseInt(e.target.value, 10))}>
                                            <option value={0}>Select Rating</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select> */}
                                        <Rating
                                            size={"medium"}
                                            precision={0.25}
                                            value={rating}
                                            onChange={(e) => handleRatingChange(parseInt(e.target.value))}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Review:
                                        <textarea value={review} onChange={(e) => handleReviewChange(e.target.value)}></textarea>
                                    </label>
                                    <br />
                                    <button onClick={onSubmit}>Submit Rating & Review</button>
                                    <button onClick={onClose}>Close</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
