import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "../../components/Card/Card"
import ComponentLoading from '../../components/loading/ComponentLoading';
import { Slider } from '@mui/material';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [value, setValue] = useState([1000, 150000]);
    const [selectedSorting, setSelectedSorting] = useState('');

    const sortingFilters = ["Price- High to Low", "Price- Low to High", "Product Name- A to Z", "Product Name- Z to A"]

    const categoryOptions = [
        'Mobile',
        'Television',
        'Laptop',
        'Desktop',
        'Tablets',
        'Headphones',
        'Smart Watches',
    ];

    const handleSortingChange = (event) => {
        setSelectedSorting(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handlePrice = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let sortedData = [...filteredData];

        if (selectedSorting === 'Price- High to Low') {
            sortedData.sort((a, b) => b.price - a.price);
        } else if (selectedSorting === 'Price- Low to High') {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (selectedSorting === 'Product Name- A to Z') {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedSorting === 'Product Name- Z to A') {
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredData(sortedData);
    }, [selectedSorting, filteredData]);

    useEffect(() => {
        const newFilteredData = products?.filter((element) =>
            element.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const categoriesFilter = newFilteredData?.filter(
            (element) => selectedCategory === '' || element.category === selectedCategory
        );
        const priceFilter = categoriesFilter?.filter(
            (element) => element.price >= value[0] && element.price <= value[1]
        );
        setFilteredData(priceFilter);
    }, [searchTerm, products, selectedCategory, value]);

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
    useEffect(() => {

    })

    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                <div className='flex flex-row items-center gap-8 justify-center'>
                    <div className="rounded-xl w-96">
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
                    <p className='flex flex-row'>Price Range:</p>
                    <Slider
                        aria-label='Price'
                        value={value}
                        valueLabelDisplay='auto'
                        min={0}
                        max={150000}
                        onChange={handlePrice}
                    />
                    <select id='sortingFilter' value={selectedSorting} onChange={handleSortingChange} className='h-10 '>
                        <option value=''>Default</option>
                        {sortingFilters.map((sortingFilter, index) => (
                            <option key={index} value={sortingFilter}>
                                {sortingFilter}
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

export default ProductsPage