import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import createUser from "./src/user/createUser.js";
import login from "./src//user/login.js"
import updateUser from "./src/user/updateUser.js";
import deleteUser from "./src/user/deleteUser.js";

dotenv.config();

const app = express();
let port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
 app.get("/", (req,res)=>{
    res.send("<h1> this is movies api is ruuning</h1>")
 })
app.post("/register", createUser);
app.post("/login", login);
app.post("/updateUser/:id", updateUser);
app.post("/deleteUser/:id", deleteUser);


app.listen(port, () => {
    console.log("Server connected on port : ", port);
})