import app from './app';
import { Server as WebsocketServer } from 'socket.io';
import http from 'http';
//import { connectDB } from './db';
import sockets from './sockets';

//connectDB();
const server = http.createServer(app);
const httpServer = server.listen(4000);
console.log("Server running in port 4000");

const io = new WebsocketServer(httpServer);
sockets(io);