import React from 'react';

const Card = ({ name, image, price }) => {
    return (

        <div className="group relative hover:rounded-md hover:scale-105 hover:z-10 hover:shadow">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 ">
                <img
                    src={image}
                    alt="imageAlternative"
                    className="h-3/4 w-3/4 object-cover object-center"
                />
            </div>
            <h3 className="mt-6 text-sm text-gray-500 p-1">
                {name}
            </h3>
            <p className="text-base font-semibold text-gray-900 p-1">₹ {price}</p>
        </div>
    )
}

export default Card