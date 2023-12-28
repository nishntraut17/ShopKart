/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart, setOpen } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Rating } from '@mui/material';
import NoData from "../../components/noData/NoData";
import ComponentLoading from "../../components/loading/ComponentLoading";
import SameCategory from '../../components/Product/SameCategory';
import { Avatar as MuiAvatar } from '@mui/material';
import ProductFeature from '../../static/productFeature.png';
import Brand from "../../static/brand.png";
import TopBrand from '../../static/topbrand.png';

const SingleProduct = () => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    const sumOfRatings = product.ratings ? product?.ratings?.reduce(
        (sum, item) => sum + item.rating, 0
    ) : 0;
    const averageRating = sumOfRatings === 0 ? 0 : sumOfRatings / product?.ratings.length;


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
        <div className="p- flex flex-col gap-4">
            <div className='flex flex-col md:flex-row gap-4 lg:px-24'>
                <div className='flex flex-row sm:flex-col gap-1'>
                    {
                        product?.productImages?.map((productImage, i) => {
                            return (
                                <div className='h-20 w-20'>
                                    <img key={i} src={productImage} alt='product'
                                        onClick={() => { setActiveImgIndex(i) }}
                                        className={`h-full w-full object-cover rounded-lg shadow-md cursor-pointer z-10 ${activeImgIndex === i
                                            ? 'border border-primary' : ''}`} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='h-1/4 w-3/4'>
                    <img src={product.productImages[activeImgIndex]} alt={product.name} className='max-w-lg border-2 rounded' />
                </div>
                <div className='flex flex-col gap-5 '>
                    <div className='flex flex-row items-center'>
                        <p className="flex items-center text-lg font-semibold">{product.name}</p>
                        <Rating
                            value={averageRating}
                            size={"small"}
                            className='p-3'
                            readOnly
                        />
                        <p className='text-gray-500'>{product.ratings.length} ratings</p>
                    </div>

                    <h1 className="">Category: {product.category}</h1>
                    <p className="">₹ {product.price}</p>
                    <h1 className=""> {product.description}</h1>
                    <div className='h-16 w-auto'>
                        <img src={ProductFeature} alt="features" className='h-full' />
                    </div>
                    <div className=''>
                        <div className='flex flex-row'>
                            <img src={TopBrand} alt='top brand' className='h-4 w-auto' />
                            <h1 className="text-bold">{product.brand}</h1>
                        </div>
                        <img src={Brand} alt='brand' className='h-20 w-auto' />
                    </div>
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
            <div className="flex flex-col gap-1 p-12 lg:px-20">
                <hr />
                <div className='text-bold text-xl p-4'>All Reviews</div>
                {product?.comments?.map((comment, i) => (
                    <div className='flex flex-row border-2 border-gray-200 rounded-xl gap-4 p-2 lg:ml-24 items-center'>
                        <MuiAvatar
                            alt={comment?.user?.name}
                            src={comment?.user?.profileImage}
                            sx={{ width: 30, height: 30 }}
                            className="border-2"
                        />
                        <p>{comment?.user?.name}</p>
                        <Rating
                            size={"small"}
                            precision={0.25}
                            readOnly
                            value={product.ratings[i].rating}
                        />
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
