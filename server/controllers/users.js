const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");
        return res.send(users);
    } catch (error) {
        res.status(500).send("Unable to get all users");
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const emailPresent = await User.findOne({ email: req.body.email });
        if (emailPresent) {
            return res.status(400).send("Email already exists");
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await User({ ...req.body, password: hashedPass });
        const result = await user.save();

        if (!result) {
            return res.status(500).send("Unable to register user 1");
        }
        return res.status(201).send("User registered successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Unable to register user");
    }
};

const login = async (req, res) => {
    try {
        const emailPresent = await User.findOne({ email: req.body.email });
        if (!emailPresent) {
            return res.status(400).send("Incorrect credentials");
        }
        const verifyPass = await bcrypt.compare(
            req.body.password,
            emailPresent.password
        );
        if (!verifyPass) {
            return res.status(400).send("Incorrect credentials");
        }
        const token = jwt.sign(
            { userInfo: { userId: emailPresent._id, name: emailPresent.name, email: emailPresent.email, profileImage: emailPresent.profileImage } },
            process.env.JWT_TOKEN,
            {
                expiresIn: "2 days",
            }
        );
        return res.status(201).send({ msg: "User logged in successfully", token });
    } catch (error) {
        res.status(500).send("Unable to login user");
    }
};

module.exports = { register, login, getAllUsers };