import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import ComponentLoading from '../loading/ComponentLoading';
import { Slider } from '@mui/material';

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

    function valuetext(value) {
        return `${value}°C`;
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
                    <Slider
                        aria-label="Temperature"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={110}
                    />
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
                            <Card name={product.name} image={product.productImages[0]} price={product.price} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList