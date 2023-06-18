// express and config
import express, {Request, Response} from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cookieParser from 'cookie-parser';

//Socket
import http from 'http';
import { Server } from 'socket.io';

//Security
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

//Static
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js';
import codeBlocksRoutes from './routes/codeBlocksRoutes.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';

const url: string = import.meta.url;

const __dirname = dirname(fileURLToPath(url));
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(mongoSanitize());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive_message', {message: data.message});
  });
  
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    socket.emit('room_joined', roomId);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  })
});

app.use('/api/auth', authRoutes);
app.use('/api/codeblocks', codeBlocksRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
