import React, { useState } from "react";
// import { useAddProductMutation } from "../features/products/productApiSlice";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
    // const [addProduct] = useAddProductMutation();
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        price: "",
        brand: "",
        category: "",
        description: ""
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    const onUpload = async (element) => {
        setLoading(true);
        if (element.type === "image/jpeg" || element.type === "image/png") {
            const data = new FormData();
            data.append("file", element);
            data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
            data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => setFile(data.url.toString()));
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const formSubmit = async (e) => {
        try {
            e.preventDefault();

            if (loading) return;
            if (file === "") return;

            const { name, price, description, brand, category } = formDetails;
            console.log(formDetails);
            const response = await toast.promise(
                axios.post('http://localhost:5000/api/product', {
                    name,
                    price,
                    description,
                    brand,
                    category,
                    productImage: file,
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
        <section className="">
            <div className="">
                <h2 className="">Upload</h2>
                <form
                    onSubmit={formSubmit}

                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formDetails.name}
                        onChange={inputChange}
                    />
                    <input
                        type="text"
                        name="price"

                        placeholder="Enter price"
                        value={formDetails.price}
                        onChange={inputChange}
                    />
                    <input
                        type="text"
                        name="brand"

                        placeholder="Enter brand"
                        value={formDetails.brand}
                        onChange={inputChange}
                    />
                    <input
                        type="text"
                        name="category"

                        placeholder="Enter Category"
                        value={formDetails.category}
                        onChange={inputChange}
                    />
                    <input
                        type="text"
                        name="description"

                        placeholder="Enter description"
                        value={formDetails.description}
                        onChange={inputChange}
                    />
                    <input
                        type="file"
                        onChange={(e) => onUpload(e.target.files[0])}
                        name="profile-pic"
                        id="profile-pic"

                    />
                    <button
                        type="submit"
                        className=""
                    >
                        Upload
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddProduct;
