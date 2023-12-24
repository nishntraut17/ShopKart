const express = require('express');
const userRouter = express.Router();
const { register, login, getAllUsers, updateUser, reqToBecomeSeller } = require('../controllers/users');
const auth = require('../middleware/auth');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/', getAllUsers);
userRouter.put('/', auth, updateUser);
userRouter.put('/seller', auth, reqToBecomeSeller);

module.exports = userRouter;