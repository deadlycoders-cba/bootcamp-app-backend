
import express from 'express';
import participantsRouter from './routes/participants.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';
import 'temporal-polyfill/full/global';
import cookieParser from 'cookie-parser';


import helmet from 'helmet';

const app = express();
app.use(cookieParser());

app.use(helmet());
app.use(express.json());
//app.use(cors());

app.use(cors({
 origin: 'http://localhost:3000',
 methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
 allowedHeaders: ['Content-Type', 'Authorization'],
 credentials: true,
}));


// Logging middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path}`
  );
  next();
});


app.use('/api/participants', participantsRouter);
app.use('/auth', authRouter);

app.get('/health', (req, res) => {
 res.status(200).json({ status: 'ok', message: 'API is running' });
});


app.use(errorHandler);


export default app;

