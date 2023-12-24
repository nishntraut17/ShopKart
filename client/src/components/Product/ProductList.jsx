import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import ComponentLoading from '../loading/ComponentLoading';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categoryOptions = [
        'Mobile',
        'Television',
        'Laptop',
        'Desktop',
        'Tablets',
        'Headphones',
        'Smart Watches',
    ];

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    useEffect(() => {
        const newFilteredData = products?.filter((element) =>
            element.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const categoriesFilter = newFilteredData?.filter((element) => {
            return selectedCategory === "" || element.category === selectedCategory;
        })
        setFilteredData(categoriesFilter);
    }, [searchTerm, products, selectedCategory]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/api/product/');
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setProducts(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                <div className='flex flex-row items-center gap-8 justify-center'>
                    <div className="rounded-xl ">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="focus:outline-none w-full py-2"
                            placeholder={`Search Products...`}
                        />
                    </div>
                    <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange} className='h-10 '>
                        <option value="">All Categories</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>

                        ))}
                    </select>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {filteredData.map((product, id) => (
                        <Link to={`/product/${product._id}`} id={id}>
                            <Card name={product.name} image={product.productImage} price={product.price} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList