
const jwt = require('jsonwebtoken')


const verifyJwt = async (req, res, next) => {
    try {
        console.log(req.headers, ">>>>>>><<<<header");

        // Get the token from Authorization header
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1]; // Extract the token part
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        // Verify the token
        const secretKey = process.env.JWT_SECRET || "mySecretCode"; // Replace with your secret key
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err);
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            req.user = decoded; // Attach decoded user data to the request object
            next(); // Pass to the next middleware or route handler
        });





    } catch (error) {
        console.error("Error in verifyJwt:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = verifyJwt;
