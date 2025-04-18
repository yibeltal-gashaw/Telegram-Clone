import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected at '+conn.connection.host);
    } catch (error) {
        console.log('Failed to connect with MonogoDB '+error);
        process.exit(1);
    }
}