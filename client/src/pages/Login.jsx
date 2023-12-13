import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails, [name]: value,
        });
    }

    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            const { email, password } = formDetails;
            const { data } = await axios.post("/user/login", {
                email,
                password
            })
            localStorage.setItem("token", data.token);
        }
        catch (error) {
            return error;
        }
    }
    return (
        <div>
            <form onSubmit={formSubmit}>
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
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login