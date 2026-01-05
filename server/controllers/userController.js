import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
    const { name, email, phone, password } = req.body;

    if(!name || !email || !phone || !password ){
        return res.status(400).json({message: "All fields are required"});
    };

    const existingUser = await User.findOne({phone});
    if(existingUser){
        return res.status(400).json({message:"User with this phone number already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword
    });

    
    return res.status(201).json({
        message: "User created successfully",
        data: {
            newUser
        }
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
};

export const loginUser = async (req, res) => {
    const {phone, password} = req.body;
    if(!phone || !password){
        return res.status(400).json({messaeg: "All fields are required"})
    }

    const user = await User.findOne({phone});
    if(!user){
        return res.status(404).json({message: "User with this phone number does not exist"});
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword){
       return res.status(403).json({message: "Invailed credentials"});
    }

    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

   return res.status(200).json({
        success: true,
        message: "Logged In Successfully",
        data: {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        }
    });
}