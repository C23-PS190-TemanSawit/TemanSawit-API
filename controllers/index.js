import access from './allControllers/LoginControllers.js';
import register from './allControllers/RegisterControllers.js';
import user from './allControllers/UsersControllers.js';
import token from './allControllers/refreshTokenControllers.js';
import income from './allControllers/IncomeControllers.js';
import outcome from './allControllers/OutcomeControllers.js';
import file from './allControllers/FileControllers.js';
const controller = {};

controller.access = access;
controller.reg = register;
controller.user = user;
controller.token = token;
controller.income = income;
controller.outcome = outcome;
controller.file = file;
export default controller;
