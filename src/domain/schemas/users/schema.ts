import { Schema } from "mongoose"
import * as bcrypt from "bcryptjs"
const jwt = require("jsonwebtoken");
import { config } from "dotenv";
config()

export const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please add an username"],
        trim: true,
        maxLength: [20, "Username can not be more than 20 characters"]
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Please add an email"],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: 6,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

});

UserSchema.methods.getJwtToken = function () {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    return token
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};
