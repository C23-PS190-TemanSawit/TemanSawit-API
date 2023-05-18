import express from 'express';
import { getUsers } from '../controllers/Users.js';
import { Register } from '../controllers/Register.js';
import { Login, Logout } from '../controllers/Login.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../controllers/refreshToken.js';

const router = express.Router();
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
