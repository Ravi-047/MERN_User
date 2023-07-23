const User = require("../models/user.model");
const generateToken = require("../utils/generateToken.utils");

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


// get all users 
const getUser = async (req, res) => {
    const { page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc', search } = req.query;
    try {
        //convert page and limit to integers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber

        // create the search query based n the search parameters
        const searchQuery = search ? {
            $or: [
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: 'i' } },
                { state: { $regex: search, $options: 'i' } }
            ]
        } : {}

        // Creating the sorting criteria
        const sortOrderValue = sortOrder === "asc" ? 1 : -1;
        const sortOption = { [sortField]: sortOrderValue };

        // Retrive users based on pagination, sorting, and search criteria
        const users = await User.find(searchQuery).sort(sortOption).skip(skip).limit(limitNumber);

        //count the tota number of users 
        const totalUser = await User.countDocuments(searchQuery);

        res.status(200).json({
            totalUser,
            totalPages: Math.ceil(totalUser / limitNumber),
            currentPage: pageNumber,
            users
        })
    } catch (error) {

    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "email and password required" })
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User does not exits" });
    }

    if (password !== user.password) {
        return res.status(400).json({ message: `Wrong password` })
    }

    if (user.isAdmin === true) {
        try {
            const token = generateToken({
                userId: user._id,
                username: user.username,
                email: user.email
            })

            res.status(200).json({
                message: "Login successful",
                isAdmin: user.isAdmin,
                token,
                user
            })
        } catch (error) {
            res.status(500).send({ message: "Internel server error", error: `${error}` })
        }
    }
    else {
        res.status(400).json({ message: "You are not Admin" })
    }
}

module.exports = { createUser, getUser, loginUser };