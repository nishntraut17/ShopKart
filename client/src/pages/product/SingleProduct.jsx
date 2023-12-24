/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart, setOpen } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Rating } from '@mui/material';
import Comment from '../../components/comment/Comment';
import NoData from "../../components/noData/NoData";
// import Input from "../../components/input/Input";
// import ShareButton from "../../components/shareButton/ShareButton";
import ComponentLoading from "../../components/loading/ComponentLoading";
// import { selectCurrentUser } from "../../features/auth/authSlice";

// import { FaRegPaperPlane } from "react-icons/fa";
// import { LuChefHat } from "react-icons/lu";
// import { BsStopwatch } from "react-icons/bs";
// import { LiaWeightSolid } from "react-icons/lia";
// import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from "react-icons/ai";
// import {
//     useGetProductQuery,
//     useRateProductMutation,
//     useCommentProductMutation,
//     useDeleteCommentProductMutation,
// } from "../../features/products/productApiSlice";
// import Category from '../../components/Home/Category';
import SameCategory from '../../components/Product/SameCategory';

const SingleProduct = () => {
    // const [rating, setRating] = useState(0);
    // const [similarCategory, setSimilarCategory] = useState([]);
    // const [similarBrand, setSimilarBrand] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    // const [rateProduct] = useRateProductMutation();
    // const [commentProduct, { isLoading }] = useCommentProductMutation();
    // const [deleteComment] = useDeleteCommentProductMutation();
    // const [toggleFavorite] = useToggleFavoriteMutation();

    // const user = useSelector(selectCurrentUser);
    // const [message, setMessage] = useState("");

    // const sumOfRatings = product.rating ? product?.ratings?.reduce(
    //     (sum, item) => sum + item.rating, 0
    // ) : 0;
    // const averageRating = sumOfRatings === 0 ? 0 : sumOfRatings / product?.ratings.length;

    // const handleChange = (e) => {
    //     setMessage(e.target.value);
    // }

    // const handleRating = async (event, newValue) => {
    //     try {
    //         if (!user) {
    //             toast.error("You must sign in first");
    //             return navigate("/auth/signin");
    //         }
    //         setRating(newValue);
    //         await toast.promise(
    //             rateProduct({ rating: newValue, recipeId: id }).unwrap(),
    //             {
    //                 loading: "Please wait...",
    //                 success: "Rating added successfully",
    //                 error: "You have already rating this recipe",
    //             }
    //         );
    //     } catch (error) {
    //         toast.error(error.data);
    //         console.error(error);
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await toast.promise(
    //             commentProduct({ productId: id, comment: message }).unwrap(),
    //             {
    //                 loading: "Please wait...",
    //                 success: "Comment added",
    //                 error: "Could not add comment",
    //             }
    //         );
    //         setMessage("");
    //     } catch (error) {
    //         toast.error(error.data);
    //         console.error(error);
    //     }
    // };

    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // }
    // const handleMenuClose = () => { setAnchorEl(null) };


    const handleAddToCart = () => {
        dispatch(addToCart(product));
        dispatch(setOpen(true));
        toast.success("Added to cart");
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
    }, [id]);

    if (loading) {
        return <ComponentLoading />;
    }

    return (
        <div className="p-8 flex flex-col gap-4">
            <div className='flex flex-col md:flex-row gap-4'>
                <img src={product.productImage} alt={product.name} className='max-w-lg' />
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row'>
                        <p className="flex items-center text-lg font-semibold">{product.name}</p>
                        <Rating
                            value={5}
                            size={"medium"}
                            className='p-3'
                            readOnly
                        />
                    </div>
                    <div className=''>
                        <p className=''>Brand</p>
                        <h1 className="">{product.brand}</h1>
                    </div>
                    <h1 className=""> {product.category}</h1>
                    <p className="">₹ {product.price}</p>
                    <h1 className=""> {product.description}</h1>
                    <div className='flex flex-row gap-4'>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 text-gray-50 hover:border-slate-200"
                        >
                            Add to Cart
                        </button>

                    </div>
                    {/* {!product?.ratings?.some((obj) => obj.user === user?.userId) && (
                        <>
                            <div className="my-4 w-full mx-auto flex justify-start gap-6">
                                <p className="text-sm font-semibold mb-3">Rate the Product</p>
                                <Rating
                                    size={"large"}
                                    precision={0.25}
                                    value={rating}
                                    onChange={handleRating}
                                />
                            </div>

                        </>
                    )} */}
                    {/* <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-row relative gap-10 my-10">
                            <label
                                htmlFor="message"
                                className="text-sm font-semibold mb-3"
                            >
                                Leave a Review
                            </label>
                            <input type="text"
                                onChange={handleChange}
                                value={message}
                                id="message"
                                aria-required="true"
                                placeholder="Leave a comment..."
                                className="py-2 px-4 border bg-gray-100 rounded-lg focus:outline outline-primary"
                            />
                            <button className='bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300'>Post Review</button>
                        </div>
                    </form> */}
                </div>

            </div>
            {/* Recipe comment form */}
            <div className="w-full sm:w-4/5 mx-auto flex flex-col gap-1 border-2 border-gray-100 bg-gray-100 rounded-md p-2 md:scale-100">
                <h3 className="font-semibold text-lg m-6">All Reviews</h3>
                {product?.comments?.length ? (
                    <div className="flex flex-col gap-2">
                        {product?.comments?.map((comment) => (
                            <Comment
                                key={comment?._id}
                                comment={comment}
                                userId={product?.userId}
                            />
                        ))}
                    </div>
                ) : (
                    <NoData text={"Comments"} />
                )}
            </div>
            <SameCategory category={product.category} />
        </div>
    );
};

export default SingleProduct;
