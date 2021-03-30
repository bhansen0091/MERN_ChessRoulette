const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Required Field"],
    },
    lastName: {
        type: String,
        required: [true, "Required Field"],
    },
    userName: {
        type: String,
        required: [true, "Required Field"],
        minlength: [5, "Must be at least 5 characters long."]
    },
    email: {
        type: String,
        required: [true, "Required Field"],
        minlength: [5, "Must be at least 5 characters long."]
    },
    password: {
        type: String,
        required: [true, "Required Field"],
        minlength: [8, "Must be at least 8 characters long."]
    }
}, {timestamps:true})

const User = new mongoose.model("User", UserSchema);

module.exports.User = User;
module.exports.UserSchema = UserSchema;