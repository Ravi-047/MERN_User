const User = require("../models/user.model");

// create a new user  

const createUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const newUser = new User(userDetail);
        const savedUser = await newUser.save();

        res.status(201).json({ message: "User created successfully", user: savedUser })
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error: error.message });
    }
}


module.exports = { createUser };