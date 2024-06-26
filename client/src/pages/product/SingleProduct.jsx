/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart, setOpen } from '../../redux/reducers/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Rating, IconButton, Menu, MenuItem } from "@mui/material";
import ComponentLoading from "../../components/ComponentLoading";
import SameCategory from '../../components/SameCategory';
import { Avatar as MuiAvatar } from '@mui/material';
import ProductFeature from '../../assets/productFeature.png';
import Brand from "../../assets/brand.png";
import TopBrand from '../../assets/topbrand.png';
import { MoreVert } from "@mui/icons-material";
import { selectCurrentUser } from "../../redux/reducers/authSlice";

const SingleProduct = () => {
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const sumOfRatings = product.ratings ? product?.ratings?.reduce(
        (sum, item) => sum + item.rating, 0
    ) : 0;
    const averageRating = sumOfRatings === 0 ? 0 : sumOfRatings / product?.ratings.length;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async (req, res) => {
        await toast.promise(
            axios.delete(
                `${backendUrl}/product/${id}`,
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            ),
            axios.delete(
                `${backendUrl}/order/${id}`,
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            ),
            {
                success: "Product Deleted Successfully",
                error: "Unable to Delete",
                loading: "please wait...",
            }
        );
    }

    const handleMenuDelete = () => {
        if (window.confirm("Are you sure you want to delete?")) {
            handleDelete();
            navigate("/");
        }
        setAnchorEl(null);
    };


    const handleAddToCart = () => {
        dispatch(addToCart(product));
        dispatch(setOpen(true));
        toast.success("Added to cart");
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${backendUrl}/product/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response.data);
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
        <div className="p-4 flex flex-col gap-4">
            <div className='flex flex-col md:flex-row gap-4 px-4 lg:px-8 xl:px-20'>

                <div className='flex flex-row sm:flex-col gap-1'>
                    {
                        product?.productImages?.map((productImage, i) => (
                            <div key={i} className='h-16 sm:h-20 w-16 sm:w-20'>
                                <img
                                    src={productImage}
                                    alt='product'
                                    onClick={() => { setActiveImgIndex(i) }}
                                    className={`h-full w-full object-cover rounded-lg shadow-md cursor-pointer z-10 ${activeImgIndex === i ? 'border border-primary' : ''}`}
                                />
                            </div>
                        ))
                    }
                </div>

                <div className='h-auto sm:h-1/4 w-full sm:w-3/4 md:h-2/4 md:w-3/4'>
                    <img
                        src={product.productImages[activeImgIndex]}
                        alt={product.name}
                        className='w-full max-w-lg border-2 rounded lg:h-[30rem] lg:w-[30rem]'
                    />
                </div>

                <div className='flex flex-col gap-5'>

                    <div className='flex flex-row items-center justify-between'>
                        <p className="flex items-center text-lg font-semibold">{product.name}</p>
                        <div className='flex flex-row gap-2'>
                            <Rating
                                value={averageRating}
                                size={"small"}
                                className='p-3'
                                readOnly
                            />
                            <p className='text-gray-500 flex justify-center items-center'>{product.ratings.length} ratings</p>
                        </div>

                        {product?.seller?._id === user?.userId && (
                            <>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? "long-menu" : undefined}
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    size="small"
                                    onClick={handleMenu}
                                >
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem>
                                        <Link to={`/product/updateproduct/${id}`}>Edit</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>

                    <h1 className="">Category: {product.category}</h1>
                    <p className="">₹ {product.price}</p>
                    <h1 className=""> {product.description}</h1>

                    <div className='h-12 sm:h-16 w-auto'>
                        <img src={ProductFeature} alt="features" className='h-full' />
                    </div>

                    <div className='flex flex-row'>
                        <img src={TopBrand} alt='top brand' className='h-4 w-auto' />
                        <h1 className="text-bold">{product.brand}</h1>
                    </div>
                    <img src={Brand} alt='brand' className='h-16 sm:h-20 w-auto' />

                    <hr />

                    <div className='flex flex-row gap-4'>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 text-gray-50 hover:border-slate-200"
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>

            <div className="flex flex-col gap-4 p-4 lg:p-8 xl:p-20">
                <hr />
                <div className='text-bold text-xl p-4'>All Reviews</div>
                {product?.comments?.map((comment, i) => (
                    <div className='flex flex-col sm:flex-row border-2 border-gray-200 rounded-xl gap-4 p-2 lg:ml-24 items-center'>
                        <MuiAvatar
                            alt={comment?.user?.name ? comment?.user?.name : "Unknown User"}
                            src={comment?.user?.profileImage ? comment?.user?.productImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                            sx={{ width: 30, height: 30 }}
                            className="border-2"
                        />
                        <div>
                            <p>{comment?.user?.name ? comment?.user?.name : "Unknown User"}</p>
                            <Rating
                                size={"small"}
                                precision={0.25}
                                readOnly
                                value={product.ratings[i].rating}
                            />
                        </div>
                        <p>{comment?.comment}</p>
                    </div>
                ))}
            </div>
            <div className='lg:px-20'>
                <SameCategory category={product.category} prod={product} />
            </div>
        </div>
    );

};

export default SingleProduct;
