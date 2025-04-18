import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';

dotenv.config();

const app = express();
app.use(cors());

// This middleware parses incoming JSON requests and makes the parsed data available on req.body.
app.use(express.json());
app.use(cookieParser());

// Routes here
app.get('/', (req, res) => {
    res.send('<h1>Chatty Realtime Chat App</h1>');
});
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})