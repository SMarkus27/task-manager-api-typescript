import { Schema } from "mongoose"
import * as bcrypt from "bcryptjs"

export const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please add an username"],
        trim: true,
        maxLength: [20, "Username can not be more than 20 characters"]
    },

    email: {
        type: String,
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

})
