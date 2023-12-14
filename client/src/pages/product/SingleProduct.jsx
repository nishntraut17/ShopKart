import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useGetProductQuery } from '../../features/products/productApiSlice';
import axios from 'axios';

const SingleProduct = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
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
        </div>
    )
}

export default SingleProduct