import User from '../models/user.js'

import bcrypt from 'bcrypt';

import generateToken from '../utils/generateToken.js';

export const registerUser = async(req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            res.status(400)
            .json({
                message: "All fields required."
            });
        }

        const exists = await User.findOne({email});

        if(exists) {
            return res.status(400)
            .json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashed
        });

        res.status(201)
        .json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const loginUser = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email || !password) {
            res.status(400)
            .json({
                message: "All fields required."
            });
        }

        const existingUser = await User.findOne({email}).select("+password");

        if(existingUser && await bcrypt.compare(password, existingUser.password)) {
            res.json({
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                token: generateToken(existingUser._id)
            });
        }

        else {
            res.status(401)
            .json({
                message: "Invalid Credentials"
            });
        }
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};