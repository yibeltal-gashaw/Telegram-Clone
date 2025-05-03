import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';
import {app, server} from '../src/lib/socketIO.js';
import express from 'express';

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// This middleware parses incoming JSON requests and makes the parsed data available on req.body.
app.use(express.json());
app.use(cookieParser());

// Routes here
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})