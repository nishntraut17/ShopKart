import React from 'react';

const Card = ({ name, image, brand }) => {
    return (

        <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                    src={image}
                    alt="imageAlternative"
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
                <span className="absolute inset-0" />
                {name}
            </h3>
            <p className="text-base font-semibold text-gray-900">{brand}</p>
        </div>
    )
}

export default Card