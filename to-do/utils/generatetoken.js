import jwt from 'jsonwebtoken';
import { error } from 'node:console';

const generateToken = (id) => {

    if (!process.env.JWT_Token) {
        throw new Error(
            "JWT_Token not found."
        );
    }

    return jwt.sign(
        {id},
        process.env.JWT_Token,
        {
            expiresIn: '7d'
        }
    );
};

export default generateToken;