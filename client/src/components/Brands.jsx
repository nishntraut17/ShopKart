import React from 'react';

const brands = ['Samsung', 'Oppo', 'Redmi', 'Realme', 'Vivo', 'Google', 'LG', 'Apple'];

const Brand = () => {
    return (
        <div className="container mx-auto px-40 my-20">
            <h1 className="text-2xl font-bold text-gray-900 py-11"> Featured Brands </h1>
            <div className="grid grid-cols-4 gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {brands.map((brand, index) => (
                    <div key={index} className="bg-white px-0 py-2 text-center rounded-md shadow-md transition-transform hover:opacity-25">
                        <p className="text-lg font-semibold">{brand}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brand;
