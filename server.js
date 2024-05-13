import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'




//configure env
dotenv.config();


//database config
connectDB();

//rest Object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.use("/api/v1/auth", authRoutes);



app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server ${process.env.DEV_MODE} is running ${PORT}`.bgBlack.white);
});