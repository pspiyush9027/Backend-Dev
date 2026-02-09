import fs from "fs"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        if (!fs.existsSync("user.json")) {
            return res.status(404).send("No Users found.");
        }

        const user = JSON.parse(fs.readFileSync("user.json", "utf-8"));
        const isUser = user.find(user => user.email === email && user.password === password);

        if (!isUser) {
            return res.status(401).send("Email or Password is wrong");
        }

        res.status(200).send("Login Successful");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Intenal server error");
    }
}

export default login;