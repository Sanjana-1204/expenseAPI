const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



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



// hash the password before it is saved to the database
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password or email!');
    }
    throw Error('Incorrect password or email!');
};
const User = mongoose.model('User', userSchema);
module.exports = User;