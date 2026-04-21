import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.listen(port, () => {
    console.log(`Server up at http://localhost:${port}`);
})