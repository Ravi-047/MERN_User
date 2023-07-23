const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers?.token;

    if (!token) {
        return res.status(400).json({ message: "Authorization token not found" })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodeToken) {
            next();
        }
        else {
            res.status(401).json({ message: "Invaid token or token NOT FOUND" });
        }
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        else {
            return res.status(500).json({ message: "server Error" });
        }
    }
}