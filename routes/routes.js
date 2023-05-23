import express from 'express';
import controller from '../controllers/index.js';
import verifyToken from '../middleware/verifyToken.js';

const route = '/api';

const router = express.Router();
// Login routes
router.get(`${route}/users`, verifyToken, controller.user.getUsers);
router.get(`${route}/token`, controller.token.refreshToken);
router.post(`${route}/users`, controller.reg.Register);
router.post(`${route}/login`, controller.access.Login);
router.delete(`${route}/logout`, controller.access.Logout);
router.put(`${route}/users/password`, controller.user.updatePassword);

// Income routes
router.post(`${route}/income`, verifyToken, controller.income.postIncome);
router.get(`${route}/income`, verifyToken, controller.income.getUserIncome);
router.get(`${route}/income/sort`, verifyToken, controller.income.sortIncomeByTime);
router.get(`${route}/income/:incomeId`, verifyToken, controller.income.getIncomeByID);

export default router;
