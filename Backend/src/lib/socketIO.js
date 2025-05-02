import {server} from 'socket.io'
import http from 'http'
import app from '../app.js';

const server = http.createServer(app);
const io = new server(server, {
    cors: {
        origin:'*', // this allow frontend domain
        methods:['GET','POST']
    }
});

io.on('connection',  )