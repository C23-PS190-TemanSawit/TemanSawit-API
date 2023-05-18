import express from 'express';
import controller from '../controllers/index.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/users', verifyToken, controller.user.getUsers);
router.post('/users', controller.reg.Register);
router.post('/login', controller.access.Login);
router.get('/token', controller.token.refreshToken);
router.delete('/logout', controller.access.Logout);

export default router;
