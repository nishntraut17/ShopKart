import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "../../components/Card"
import ComponentLoading from '../../components/ComponentLoading';
import { Slider } from '@mui/material';
import NoData from '../../components/NoData';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [value, setValue] = useState([0, 150000]);
    const [selectedSorting, setSelectedSorting] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const sortingFilters = ["Price- High to Low", "Price- Low to High", "Product Name- A to Z", "Product Name- Z to A"]

    const categoryOptions = [
        'Mobile',
        'Laptop',
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
                const response = await axios.get(`${backendUrl}/product/`);
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
    }, [backendUrl]);

    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                <div className='flex flex-col gap-2 md:flex-row items-center md:gap-8 justify-center'>
                    <div className="rounded-xl w-96 p-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="custom-input-outline focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-full"
                            placeholder={`Search Products...`}
                        />
                    </div>
                    <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange} className='h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-56'>
                        <option value="">All Categories</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>

                        ))}
                    </select>
                    <div className='flex flex-row p-1 gap-4'>
                        <p className='flex flex-row '>Price Range:</p>
                        <div className='w-40'>
                            <Slider
                                aria-label='Price'
                                value={value}
                                valueLabelDisplay='auto'
                                min={0}
                                max={150000}
                                onChange={handlePrice}
                            />
                        </div>
                    </div>
                    <label>Sort data: </label>
                    <select id='sortingFilter' value={selectedSorting} onChange={handleSortingChange} className='h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-auto'>
                        <option value=''>Default</option>
                        {sortingFilters.map((sortingFilter, index) => (
                            <option key={index} value={sortingFilter}>
                                {sortingFilter}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {filteredData.length ? filteredData.map((product, id) => (
                        <Link to={`/product/${product._id}`} id={id}>
                            <Card name={product.name} image={product.productImages[0]} price={product.price} />
                        </Link>
                    )) : <NoData text='Items' />}
                </div>
            </div>
        </div>
    )
}

export default ProductsPage