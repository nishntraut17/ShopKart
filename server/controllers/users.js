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
        console.log(req.body);

        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            res.send("No such user exist");
        }
        console.log(user);
        user.email = req.body.email;
        user.name = req.body.name;
        user.profileImage = req.body.profileImage;
        user.gender = req.body.gender;
        user.mobile = req.body.mobile;
        user.address = req.body.address;
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPass;
        await user.save();
        console.log(user);
        res.status(201).send("User Updated");
    } catch (error) {
        res.send(error);
    }
}

const reqToBecomeSeller = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        console.log(user);
        if (!user) {
            res.send("No such user exist");
        }
        user.role = 'pseudoSeller';
        await user.save();
        console.log(user);
        res.status(201).send("Req send successfully");
    } catch (error) {
        res.send(error);
    }
}

const updateApplication = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        console.log(req.params.userId);
        if (!user) {
            res.send("No such user exist");
        }
        user.role = req.body.role;
        await user.save();
        console.log(user);

        res.status(201).send("Req accepted successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found!" });
        }
        res.json({ msg: "User deleted Successfully" });

    } catch (error) {
        res.send(error);
    }
}

const getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found!" });
        }
        res.send(user);

    } catch (error) {
        res.send(error);
    }
}

module.exports = { register, login, getAllUsers, updateUser, reqToBecomeSeller, updateApplication, deleteUser, getUser };