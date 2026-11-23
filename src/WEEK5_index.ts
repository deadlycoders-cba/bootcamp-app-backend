import express from 'express';
import participantsRouter from './routes/participants.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';
import 'temporal-polyfill/full/global';


const app = express();
const PORT = 3001;

app.use(express.json());
//app.use(cors());

app.use(cors({
 origin: 'http://localhost:3000',
 methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
 allowedHeaders: ['Content-Type', 'Authorization'],
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

// For testing error handling
app.get('/test-error', (req, res) => {
  throw new Error('Database connection failed');
});

app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});

