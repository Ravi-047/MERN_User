const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

// PORT
const PORT = process.env.PORT || 8080;

// express app 
const app = express();

// necessary middleware
app.use(express.json());

// cors origin for all browsers
app.use(cors({
    origin: "*"
}))

//home route
app.get("/", (req, res) => {
    res.send("Welcme to MERN User backend")
})


//listening the backend server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})