import { Schema, model } from "mongoose";

export const gender = {
    male: "male",
    female: "female"
}
export const roles = {
    user: "user",
    admin: "admin"
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        lowercase: true,
        match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(gender),
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.user
    },
    changedAt: { type: Date },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

const User = model("User", userSchema);
export default User;

