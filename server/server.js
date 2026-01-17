import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { PORT } from "./setup/config/env.js";
import connectDb from './config/connectDb.js';
const app = express();
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
connectDb();

const allowedOrigin = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

//API Endpoints
app.get('/', (req, res)=> {
    res.send('API is working');
})
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})
