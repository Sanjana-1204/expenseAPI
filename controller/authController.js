const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const maxAge = 2 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC, {
        expiresIn: maxAge
    });
};

const userSignup = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    next();


})

const userLogin = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    next();
});

const userLogout = (req, res,) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: 1
    });
    res.status(200).json({ message: "Logged out successfully" });
}




module.exports = {
    userSignup,
    userLogin,
    userLogout
}