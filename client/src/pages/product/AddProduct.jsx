import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image } from "@mui/icons-material";

function AddProduct() {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        price: "",
        brand: "",
        description: ""
    });
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const categoryOptions = [
        'Mobile',
        'Laptop',
        'Tablets',
        'Headphones',
        'Smart Watches',
    ];

    const handleImageChange = (elements) => {
        const newPreviews = Array.from(elements).map(element => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(element);
            });
        });

        Promise.all(newPreviews).then((previews) => {
            setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
        });
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    const onUpload = async (elements) => {
        setLoading(true);
        handleImageChange(elements);

        const uploadPromises = Array.from(elements).map((element) => {
            if (element.type === "image/jpeg" || element.type === "image/png") {
                const data = new FormData();
                data.append("file", element);
                data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
                data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
                return fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
                    method: "POST",
                    body: data,
                })
                    .then((res) => res.json())
                    .then((data) => data.url.toString());
            } else {
                return Promise.resolve(null);
            }
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles.filter(file => file !== null)]);
        setLoading(false);
    };

    const formSubmit = async (e) => {
        try {
            e.preventDefault();

            if (loading) return;
            if (files.length === 0) return;

            const { name, price, description, brand } = formDetails;
            console.log(formDetails);
            const response = await toast.promise(
                axios.post(`${backendUrl}/product`, {
                    name,
                    price,
                    description,
                    brand,
                    category: selectedCategory,
                    productImages: files,
                }, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }),
                {
                    loading: "loading...",
                    success: "successful",
                    error: "failed",
                }
            );
            navigate('/');
            console.log(response);
        } catch (error) { }
    };

    return (
        <div className="">
            <h2 className="px-10 text-bold text-2xl">Add New Product</h2>
            <form
                onSubmit={formSubmit}
                className="flex flex-col p-10 gap-4 justify-center"
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    <label>Enter Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formDetails.name}
                        onChange={inputChange}
                        className="h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-auto"
                    />
                    <label>Enter Price:</label>
                    <input
                        type="text"
                        name="price"

                        placeholder="Enter price"
                        value={formDetails.price}
                        onChange={inputChange}
                        className="h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-auto"
                    />
                    <label>Enter Brand:</label>
                    <input
                        type="text"
                        name="brand"

                        placeholder="Enter brand"
                        value={formDetails.brand}
                        onChange={inputChange}
                        className="h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-auto"
                    />
                    <label>Select Category:</label>
                    <select id="categoryFilter" value={formDetails.category} onChange={handleCategoryChange} className='h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-56'>
                        <option value={"Electronic"}>Electronic</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-96">

                    <label>Enter Description:</label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={formDetails.description}
                        onChange={inputChange}
                        className="h-72 w-3/4 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2"
                    />
                </div>
                <div className="flex">
                    <input
                        type="file"
                        onChange={(e) => onUpload(e.target.files)}
                        name="profile-pic"
                        id="profile-pic"
                        className="hidden"
                    />
                    <label htmlFor="profile-pic" className='block font-medium mb-2 hover:cursor-pointer' for='profile-pic'>Upload Image: <Image /></label>
                    {imagePreviews.map((preview, index) => (
                        <div key={index}>
                            <img
                                src={preview}
                                alt={`Preview ${index}`}
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        </div>
                    ))}
                </div>


                <button
                    type="submit"
                    className="bg-slate-200 border-2 rounded-lg p-2 w-24 hover:border-3 hover:bg-slate-300"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
