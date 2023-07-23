const express = require('express');
const { createUser } = require('../controllers/user.controller');
const validateUser = require('../middlewares/userInput.validator.middleware');


const userRouter = express.Router();


userRouter.post("/", validateUser, createUser)


module.exports = userRouter;