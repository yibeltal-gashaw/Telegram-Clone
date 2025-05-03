import http from 'http'
import express from 'express'
import  { Server } from 'socket.io'

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // this allow frontend domain
        methods: ['GET', 'POST']
    }
});
    //send online user socket id
    export function getReceiverSocketId(userId){
        return userSocketMap[userId];
    }
    
    // use to hold online users
    const userSocketMap = {} // {userId: socketId}

    io.on('connection', (socket) => {
        console.log('🔌 User connected:', socket.id);
        const userId = socket.handshake.query.userId;
        if(userId) userSocketMap[userId] = socket.id;
        console.log("📦 userSocketMap:", userSocketMap);
        console.log("📨 Received userId:", socket.handshake.query.userId);

         // Notify all clients of new online users list
        io.emit('get-online-users', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log('❌  User disconnected:', socket.id);
            if (userId) delete userSocketMap[userId];
            io.emit('get-online-users', Object.keys(userSocketMap));
        });
    });

export { io, server, app };