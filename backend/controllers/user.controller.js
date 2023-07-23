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
                { name: { $regex: search, $options: 'i' } }
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

module.exports = { createUser, getUser };