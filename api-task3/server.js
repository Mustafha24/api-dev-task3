// server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDb from './db/connectDB.js';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/posts', postRouter);

// Start the server
app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
