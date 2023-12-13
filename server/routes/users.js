const express = require('express');
const userRouter = express.Router();
const { register, login, getAllUsers } = require('../controllers/users');
const auth = require('../middleware/auth');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/', getAllUsers);

module.exports = userRouter;