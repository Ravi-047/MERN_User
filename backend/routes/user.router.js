const express = require('express');
const { createUser, getUser, loginUser } = require('../controllers/user.controller');
const validateUser = require('../middlewares/userInput.validator.middleware');


const userRouter = express.Router();

userRouter.get("/", getUser)
userRouter.post("/login", loginUser)
userRouter.post("/", validateUser, createUser)



module.exports = userRouter;