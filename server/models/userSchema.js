import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "provider"],
        default: "user"
    }
},
    {timeStamps: true}
);

export const User = mongoose.model("User", userSchema);