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
            { userId: emailPresent._id, name: emailPresent.name, email: emailPresent.email, profileImage: emailPresent.profileImage, role: emailPresent.role },
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

const updateUser = async (req, res) => {
    try {
        console.log(req.user);
        console.log(req.body);
        const user = await User.find({ _id: req.user });
        if (!user) {
            res.send("No such user exist");
        }
        const updatedUser = await User.findAndUpdate({ _id: user }, { email: req.body.email, name: req.body.name, password: req.body.password, profileImage: req.body.profileImage })
        if (!updateUser) {
            res.send("Problem while updating user");
        }
        res.status(201).send("User Updated");
    } catch (error) {
        res.send(error);
    }
}

const reqToBecomeSeller = async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.find({ _id: req.user });
        console.log(user);
        if (!user) {
            res.send("No such user exist");
        }
        // const updatedUser = await User.findAndUpdate({ _id: user }, { })
        user.role = 'pseudoSeller';
        await user.save();
        // const result = await User.findAndUpdate({})
        res.status(201).send("Req send successfully");
    } catch (error) {
        res.send(error);
    }
}

module.exports = { register, login, getAllUsers, updateUser, reqToBecomeSeller };