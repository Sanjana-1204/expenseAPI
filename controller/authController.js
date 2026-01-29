const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    // create an errors object
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === 'incorrect email!') {
        errors.email = 'that email is not registered, please try again'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect, please try again'
    }

    // duplicate error code
    if (err.code == 11000) {
        errors.email = "Email is already registered";
        return errors;
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;

        });
    }

    return errors;
}

// maxAge for a cookie to be held up by the browser 
const maxAge = 2 * 24 * 60 * 60; // 2 days-> in seconds


// createToken function to create a token for a user everytime 
// a new user signs up
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC, {
        expiresIn: maxAge
    });
};
// controller logic for signing in

const userSignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Value of User is:", User);
        // 1. Create the user
        const user = await User.create({ email, password });

        // 2. Create token using the lowercase 'user' ID
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

const userLogout = (req, res) => {
    // 1. Clear the cookie
    // IMPORTANT: You must pass the SAME options used when you created the cookie
    // (except maxAge/expires). If you don't, it won't be deleted.
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: 1
    });

    // 2. Send JSON, not a Redirect
    res.status(200).json({ message: "Logged out successfully" });
}

const expenses = (req, res) => {
    res.send('Hi this is just to check authentication');
}



module.exports = {
    userSignup,
    userLogin,
    userLogout
}