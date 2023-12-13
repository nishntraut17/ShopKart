import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        price: "",
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

            const { name, price } = formDetails;
            const response = await axios.post("http://localhost:5000/api/product", {
                name,
                price,
                productImage: file,
            })
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
                        placeholder="Enter your first name"
                        value={formDetails.name}
                        onChange={inputChange}
                    />
                    <input
                        type="text"
                        name="price"

                        placeholder="Enter your last name"
                        value={formDetails.price}
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
