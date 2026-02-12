
import express from "express";
import dotenv from "dotenv";
import createUser from "./src/createuser.js";
import filterName from "./src/filtername.js";

dotenv.config();

let app = express();
let port = process.env.PORT;

app.use(express.json());

app.post("/register", createUser);
app.post("/filter", filterName);



app.listen(port, () => {
    console.log("Server connected on port : ", port);
})