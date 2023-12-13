import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formDetails, setFormDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails,
            [name]: value
        });
    };
    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post("http://localhost:5000/", {
                formDetails
            })
        } catch (error) {
            console.log('Error', error);
        }
    }
    return (
        <div>
            <form onSubmit={formSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formDetails.name}
                    onChange={inputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formDetails.email}
                    onChange={inputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formDetails.password}
                    onChange={inputChange}
                />
                <button
                    type="submit"
                >
                    sign up
                </button>
            </form>
        </div>
    )
}

export default Signup;