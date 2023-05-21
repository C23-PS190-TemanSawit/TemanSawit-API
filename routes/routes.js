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
// Income routes
router.post(`${route}/income`, controller.income.postIncome);
router.get(`${route}/income`, controller.income.getUserIncome);
// router.get(`${route}/income/sort`, controller.income.sortIncomeByTime);
// router.get(`${route}/income/:incomeId`, controller.income.getAllIncomeByID);

export default router;
