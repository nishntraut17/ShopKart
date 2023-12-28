const express = require('express');
const userRouter = express.Router();
const { register, login, getAllUsers, updateUser, reqToBecomeSeller, getPseudoSeller, updateApplication, deleteUser, getUser } = require('../controllers/users');
const auth = require('../middleware/auth');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:userId', deleteUser);
userRouter.put('/:id', auth, updateUser);
userRouter.put('/seller', auth, reqToBecomeSeller);
userRouter.get('/pseudoseller', auth, getPseudoSeller);
userRouter.put('/applicationupdate/:userId', auth, updateApplication);

module.exports = userRouter;