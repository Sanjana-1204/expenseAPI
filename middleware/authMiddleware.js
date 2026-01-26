const jwt = require('jsonwebtoken');
require('dotenv').config()

const requireAuth = (req, res, next) => {
    // Step 1: Check for the Authorization Header (Standard for APIs)
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // Step 2: Extract the token (Format is usually "Bearer <token>")
    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);

        // Check what the token actually holds
        console.log("Decoded Token:", decoded);

        // Extract the ID safely (checking for 'id' OR '_id')
        const userId = decoded.id || decoded._id;

        req.user = { _id: userId };
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = {
    requireAuth
};