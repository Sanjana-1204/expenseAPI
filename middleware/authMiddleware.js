const jwt = require('jsonwebtoken');
require('dotenv').config()
const asyncHandler = require('express-async-handler');
const { AppError } = require('./errorHandler');

const requireAuth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new AppError('Authorization token required!', 401);
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        throw new AppError('Invalid token. Please log in again!', 401)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);

        console.log("Decoded Token:", decoded);
        const userId = decoded.id || decoded._id;
        req.user = { _id: userId };
        next();

    } catch (error) {
        throw new AppError('Invalid or expired token. Please log in again.', 401);
    }
});


module.exports = {
    requireAuth
};