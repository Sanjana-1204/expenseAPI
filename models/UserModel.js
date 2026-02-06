
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { AppError } = require('../middleware/errorHandler');


const userSchema = new mongoose.Schema(
    {

        email: {
            type: String,
            required: [true, "Please enter an email!"],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email!']
        },
        password: {
            type: String,
            required: [true, "please enter a password"],
            minlength: [8, 'Minimum password length is 8 characters']
        }
    }, { timestamps: true });

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    const authError = "Invalid email or password";
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error(authError, 401);
    }
    throw Error(authError, 401);
};
const User = mongoose.model('User', userSchema);
module.exports = User;