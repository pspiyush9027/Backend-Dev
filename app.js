import express from "express"
import dotenv from "dotenv"
import createBook from "./src/createBook.js";
import filterBook from "./src/filterBook.js";

dotenv.config();

const app = express();
let port = process.env.PORT;

app.use(express.json());

app.post("/addBook", createBook);
app.get("/find", filterBook);

app.listen(port, () => {
    console.log("Server running on : ", port);
})
