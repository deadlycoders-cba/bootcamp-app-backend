import { Router } from 'express';
import { login, logout, refresh } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // 5 attempts per window per IP
  message: { error: 'Too many login attempts, try again later' },
});


const router = Router();

//router.post('/login', login);

router.post('/login', loginLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);


export default router;