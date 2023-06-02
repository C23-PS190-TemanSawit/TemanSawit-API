import express from 'express';
import controller from '../controllers/index.js';
import verifyToken from '../middleware/verifyToken.js';
const route = '/api';

const router = express.Router();
router.get('/', controller.run.run);
// Auth routes
router.get(`${route}/users`, verifyToken, controller.user.getUsers);
router.get(`${route}/token`, controller.token.refreshToken);
router.get(`${route}/profile`, verifyToken, controller.user.getUserProfile);
router.post(`${route}/users`, controller.reg.Register);
router.post(`${route}/login`, controller.access.Login);
router.put(`${route}/update`, verifyToken, controller.user.updatePassword);
router.put(`${route}/profile`, verifyToken, controller.user.updateProfile);
router.put(`${route}/forgotPassword`, controller.user.forgotPassword);
router.delete(`${route}/logout`, controller.access.Logout);
// Income routes
router.post(`${route}/income`, verifyToken, controller.income.postIncome);
router.get(`${route}/income`, verifyToken, controller.income.getUserIncome);
router.get(`${route}/income/sort`, verifyToken, controller.income.sortIncomeByTime);
router.get(`${route}/income/:incomeId`, verifyToken, controller.income.getIncomeByID);
router.put(`${route}/income/update/:incomeId`, verifyToken, controller.income.updateIncome);
router.delete(`${route}/income/:incomeId`, verifyToken, controller.income.deleteIncome);
// Outcome routes
router.post(`${route}/outcome`, verifyToken, controller.outcome.postOutcome);
router.get(`${route}/outcome`, verifyToken, controller.outcome.getUserOutcome);
router.get(`${route}/outcome/sort`, verifyToken, controller.outcome.sortOutcomeByTime);
router.get(`${route}/outcome/:outcomeId`, verifyToken, controller.outcome.getOutcomeByID);
router.put(`${route}/outcome/update/:outcomeId`, verifyToken, controller.outcome.updateOutcome);
router.delete(`${route}/outcome/:outcomeId`, verifyToken, controller.outcome.deleteOutcome);
// Bucket routes
router.post(`${route}/upload`, verifyToken, controller.file.uploadFile);

export default router;
