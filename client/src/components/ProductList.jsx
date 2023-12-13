import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/api/product/');
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setUsers(response.data);
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
            {
                users.map((n, i) => (
                    <>
                        <p key={i}>{n.name}</p>
                        <p>{n.price}</p>
                        <img src={n.productImage} alt='mmm'></img>
                    </>
                ))
            }
        </div>
    )
}

export default ProductList